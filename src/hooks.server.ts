import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';

export const handle = (async ({ event, resolve }) => {
	if (event.platform && event.platform.env.DATABASE) {
		event.locals.db = drizzle(event.platform.env.DATABASE);
	}

	return await resolve(event);
}) satisfies Handle;
