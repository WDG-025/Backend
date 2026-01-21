import type { RequestHandler } from "express";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
} from "openai/resources";
import Pokedex from "pokedex-promise-v2";
import type { z } from "zod";
import { FinalResponse, Intent, type PromptBodySchema } from "#schemas";
import { createOpenAICompletion } from "#utils";

type IncomingPrompt = z.infer<typeof PromptBodySchema>;
type ResponseCompletionDTO = z.infer<typeof FinalResponse> | { completion: string };

export const createCompletion: RequestHandler<
  unknown,
  ResponseCompletionDTO,
  IncomingPrompt
> = async (req, res) => {
  const { prompt, stream } = req.body;

  const client = new OpenAI({
    apiKey:
      process.env.NODE_ENV === "development" ? process.env.LOCAL_LLM_KEY : process.env.AI_API_KEY,
    baseURL:
      process.env.NODE_ENV === "development" ? process.env.LOCAL_LLM_URL : process.env?.AI_BASE_URL,
  });
  const model =
    process.env.NODE_ENV === "development" ? process.env.LOCAL_LLM_MODEL! : process.env?.AI_MODEL!;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `Du bestimmst, ob eine Frage über Pokémon ist.
        Du darfst nur Fragen über ein einzelnes Pokémon beantworten
        und keine offenen Fragen.`,
    },
    { role: "user", content: prompt },
  ];

  // # Step 1: Check if the prompt is about Pokémon
  const checkIntentCompletion = await client.chat.completions.parse({
    model,
    messages,
    temperature: 0,
    response_format: zodResponseFormat(Intent, "Intent"),
  });

  // console.log("checkIntentCompletion: ", checkIntentCompletion);

  const intent = checkIntentCompletion.choices[0]?.message.parsed;

  if (!intent?.isPokemon) {
    res.status(400).json({
      completion:
        intent?.reason ||
        "Ich kann diese Frage nicht beantworten, versuch nach einem Pokémon zu fragen.",
    });
    return;
  }

  // console.log("intent:", intent);

  console.log(`\x1b[34mIntent erkannt. Frage erhalten über: ${intent.pokemonName}\x1b[0m`);

  messages.push({
    role: "assistant",
    content: JSON.stringify(intent, null, 2),
  });

  // # Step 2: Fetch the Pokemon data from the PokeAPI
  const P = new Pokedex();

  const pokemonData = await P.getPokemonByName(intent.pokemonName.toLowerCase());

  if (!pokemonData) {
    res.status(400).json({
      completion: `Pokémon ${intent.pokemonName} nicht gefunden.`,
    });
    return;
  }

  // let pokemonData;

  // try {
  //   pokemonData = await P.getPokemonByName(intent.pokemonName.toLowerCase());
  // } catch (error) {
  //   res.status(404).json({
  //     completion: `Pokémon ${intent.pokemonName} nicht gefunden oder API-Fehler.`,
  //   });
  //   return;
  // }

  console.log(`\x1b[32mDaten geholt für Pokémon: ${pokemonData.name}\x1b[0m`);
  // console.log(pokemonData);

  // # Step 3: Add the Pokemon data to the messages and generate a final response
  messages.push({
    role: "assistant",
    content: `Das sind alle relevanten Daten über das Pokémon: ${
      intent.pokemonName
    }: ${JSON.stringify(pokemonData, null, 2)}
      Kombiniere das mit dem, was du darüber weißt, um dem User eine vollständige Antwort zu geben.`,
  });

  console.log(`\x1b[33mPokémon-Daten zu messages hinzugefügt für weitere Verarbeitung.\x1b[0m`);

  const finalCompletion = await client.chat.completions.parse({
    model,
    messages,
    temperature: 0,
    response_format: zodResponseFormat(FinalResponse, "FinalResponse"),
  });

  const finalResponse = finalCompletion.choices[0]?.message.parsed;

  if (!finalResponse) {
    res.status(500).json({
      completion: "Finale Response konnte nicht generiert werden.",
    });
    return;
  }

  res.json(finalResponse);
};
