import { desc, lt } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { notMyProblemsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url, locals: { db } }) => {
	const cursorSearchParam = url.searchParams.get('cursor');
	const limitSearchParam = url.searchParams.get('limit');

	const cursor = cursorSearchParam ? parseInt(cursorSearchParam) : undefined;
	const limit = limitSearchParam ? parseInt(limitSearchParam) : 25;

	const results = await db.query.notMyProblemsTable.findMany({
		where: cursor ? lt(notMyProblemsTable.id, cursor) : undefined,
		limit: limit > 100 ? 100 : limit,
		orderBy: desc(notMyProblemsTable.id)
	});

	let nextPageUrl = undefined;
	if (results.length >= limit) {
		nextPageUrl = new URL(url);
		nextPageUrl.searchParams.set('cursor', results[limit - 1].id.toString());
	}

	return Response.json(
		{
			data: results,
			limit,
			size: results.length,
			_links: {
				base: url.origin,
				self: url.href,
				next: nextPageUrl
			}
		},
		{ status: 200 }
	);
};
