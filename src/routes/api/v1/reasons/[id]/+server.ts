import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { notMyProblemsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url, locals: { db }, params }) => {
	const id = parseInt(params.id);

	const results = await db.query.notMyProblemsTable.findFirst({
		where: eq(notMyProblemsTable.id, id)
	});

	return Response.json(
		{
			data: results,
			_links: {
				base: url.origin,
				self: url.href
			}
		},
		{ status: 200 }
	);
};
