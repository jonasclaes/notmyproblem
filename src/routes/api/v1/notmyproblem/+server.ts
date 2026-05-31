import { type RoleScopedChatInput } from '@cloudflare/workers-types';
import type { RequestHandler } from './$types';
import { notMyProblemsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ platform, url, locals: { db } }) => {
	if (!platform) return Response.json({ error: 'Platform is missing.' }, { status: 500 });

	const messages: RoleScopedChatInput[] = [
		{
			role: 'system',
			content:
				'Always respond with "Not my problem: <reason>", where <reason> is filled in with a bullshit excuse. You are an unhelpful, passive-agressive, snarky assistant working in the tech sector.'
		},
		{
			role: 'user',
			content: 'Respond'
		}
	];

	const modelResponse = await platform.env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
		messages
	});

	if (!modelResponse)
		return Response.json({ error: 'AI model returned empty response.' }, { status: 500 });

	const status = 'Not my problem';
	const reason = modelResponse.response?.split(':')[1].trim() ?? '';

	await db.insert(notMyProblemsTable).values({
		status,
		reason
	});

	return Response.json(
		{
			data: {
				message: modelResponse,
				status,
				reason
			},
			_links: {
				base: url.origin,
				self: url.href
			}
		},
		{ status: 201 }
	);
};
