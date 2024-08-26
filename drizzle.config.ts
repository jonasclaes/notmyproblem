import type { Config } from 'drizzle-kit';

export default {
	dialect: 'sqlite',
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations'
} satisfies Config;
