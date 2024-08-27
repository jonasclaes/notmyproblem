import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { notMyProblemsTable } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url, locals: { db }, params }) => {
	const id = parseInt(params.id);

	const result = await db.query.notMyProblemsTable.findFirst({
		where: eq(notMyProblemsTable.id, id)
	});

	if (!result) {
		return Response.json(
			{
				error: {
					message: 'Reason not found'
				}
			},
			{ status: 404 }
		);
	}

	return Response.json(
		{
			data: result,
			_links: {
				base: url.origin,
				self: url.href
			}
		},
		{ status: 200 }
	);
};
