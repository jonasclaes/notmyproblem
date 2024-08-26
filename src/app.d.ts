import type { D1Database, Ai } from '@cloudflare/workers-types/2023-07-01';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DrizzleD1Database;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DATABASE: D1Database;
				AI: Ai;
			};
		}
	}
}

export {};
