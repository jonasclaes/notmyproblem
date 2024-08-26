import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/server/db/schema';

export const handle = (async ({ event, resolve }) => {
	if (event.platform && event.platform.env.DATABASE) {
		event.locals.db = drizzle(event.platform.env.DATABASE, { schema });
	}

	return await resolve(event);
}) satisfies Handle;
