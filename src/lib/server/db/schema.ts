import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notMyProblemsTable = sqliteTable('notmyproblems', {
	id: integer('id').primaryKey(),
	status: text('status').notNull(),
	reason: text('reason').notNull()
});

export type InsertNotMyProblem = typeof notMyProblemsTable.$inferInsert;
export type SelectNotMyProblem = typeof notMyProblemsTable.$inferSelect;
