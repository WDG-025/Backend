import type { ChatCompletion, Responses } from 'openai/resources.js';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';

export async function openaiChatRest(prompt: string) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
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
	const res = await fetch(`https://api.openai.com/v1/responses`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},

		body: JSON.stringify({
			model: 'gpt-4o-mini',
			input: prompt,
			//
		}),
	});

	const response = (await res.json()) as Responses.Response;
	console.log(response);
	console.log(response.output[0].content);
}

// openaiResponseRest('write a 5 line poem');

export async function openaiSdkStructured(prompt: string) {
	const client = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

	const CustomSchema = z.object({
		originalPrompt: z.string(),
		generatedResponse: z.string(),
	});

	const response = await client.responses.parse({
		model: 'gpt-4o-mini',
		input: prompt,
		text: {
			format: zodTextFormat(CustomSchema, 'CustomSchema'),
		},
	});

	console.log(response.output_parsed);
}

openaiSdkStructured('write a 5 line poem about ai in german');
