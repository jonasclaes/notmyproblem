PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notmyproblems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`status` text NOT NULL,
	`reason` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_notmyproblems`("id", "created_at", "status", "reason") SELECT "id", "created_at", "status", "reason" FROM `notmyproblems`;--> statement-breakpoint
DROP TABLE `notmyproblems`;--> statement-breakpoint
ALTER TABLE `__new_notmyproblems` RENAME TO `notmyproblems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;