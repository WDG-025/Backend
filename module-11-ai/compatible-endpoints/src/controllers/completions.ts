import type { promptBodySchema } from '#schemas';
import { createOpenAICompletion } from '#utils';
import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources.js';
import { Messages } from 'openai/resources/chat/completions.mjs';
import { z } from 'zod';

type IncomingPrompt = z.infer<typeof promptBodySchema>;
type ResponseCompletion = { completion: string };

export const createOllamaComletion: RequestHandler<
  unknown,
  ResponseCompletion,
  IncomingPrompt
> = async (req, res) => {
  const { prompt } = req.body;

  const client = new OpenAI({
    apiKey:
      process.env.NODE_ENV === 'development'
        ? process.env.OLLAMA_API_KEY
        : process.env.OPENAI_API_KEY,
    baseURL: process.env.NODE_ENV === 'development' ? process.env.OLLAMA_URL : undefined
  });

  const completion = await client.chat.completions.create({
    model:
      process.env.NODE_ENV === 'development'
        ? process.env.OLLAMA_MODEL!
        : process.env.OPENAI_MODEL!,
    messages: [
      { role: 'system', content: 'you are a helpful assisstant' },
      { role: 'user', content: prompt }
    ]
  });

  res
    .status(200)
    .json({ completion: completion.choices[0]?.message.content || 'No completion generated' });
};

export const createLMSCompletion: RequestHandler<
  unknown,
  ResponseCompletion,
  IncomingPrompt
> = async (req, res) => {
  const { prompt, stream } = req.body;

  const client = new OpenAI({
    apiKey:
      process.env.NODE_ENV === 'development' ? process.env.LMS_API_KEY : process.env.OPENAI_API_KEY,
    baseURL: process.env.NODE_ENV === 'development' ? process.env.LMS_URL : undefined
  });

  const baseRequest: ChatCompletionCreateParamsNonStreaming = {
    model:
      process.env.NODE_ENV === 'development' ? process.env.LMS_MODEL! : process.env.OPENAI_MODEL!,
    messages: [
      { role: 'system', content: 'you are a helpful assisstant' },
      { role: 'user', content: prompt }
    ]
  };

  await createOpenAICompletion(client, res, baseRequest, stream);
};
