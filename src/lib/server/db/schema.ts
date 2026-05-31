import { sqliteTable as table, integer, text, index } from 'drizzle-orm/sqlite-core';

export const notMyProblemsTable = table('notmyproblems', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: integer('created_at')
		.notNull()
		.default(0)
		.$default(() => Date.now()),
	status: text('status').notNull(),
	reason: text('reason').notNull()
});

export type InsertNotMyProblem = typeof notMyProblemsTable.$inferInsert;
export type SelectNotMyProblem = typeof notMyProblemsTable.$inferSelect;
