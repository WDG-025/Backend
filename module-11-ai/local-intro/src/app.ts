import type { ChatCompletion, Responses } from 'openai/resources.js';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';

export async function openaiChatRest(prompt: string) {
	const res = await fetch('http://127.0.0.1:11434/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'llama3.2:3b',
			messages: [
				{ role: 'system', content: 'you are a helpful assistant' },
				{ role: 'user', content: prompt },
			],
		}),
	});
	const data = (await res.json()) as ChatCompletion;
	console.log(data);
	console.log(data.choices[0]?.message);
}

// openaiChatRest('write a 5 line poem about coding in german');

export async function openaiResponseRest(prompt: string) {
	const res = await fetch(`http://127.0.0.1:11434/v1/responses`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({
			model: 'llama3.2:3b',
			input: prompt,

			//
		}),
	});

	const response = (await res.json()) as Responses.Response;
	console.log(response);
	console.log(response?.output[0]?.content);
}

// openaiResponseRest('write a 5 line poem');

export async function openaiSdkStructured(prompt: string) {
	const client = new OpenAI({
		baseURL: process.env.OLLAMA_URL,
		apiKey: '',
	});

	const CustomSchema = z.object({
		originalPrompt: z.string(),
		generatedResponse: z.string(),
	});

	const response = await client.responses.parse({
		input: prompt,
		model: process.env.OLLAMA_MODEL,
		text: {
			format: zodTextFormat(CustomSchema, 'CustomResponse'),
		},
		temperature: 0.3,
	});
	console.log(response);
	console.log(response.output_parsed);
	// console.log(response.output[0].content);
	return response.output;
}

openaiSdkStructured('write a 5 line poem about ai in german');
