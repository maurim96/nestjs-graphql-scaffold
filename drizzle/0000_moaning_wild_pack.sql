CREATE TABLE IF NOT EXISTS "user_deletion_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"reason" varchar,
	"deleted_at" date DEFAULT 'now()' NOT NULL,
	CONSTRAINT "user_deletion_logs_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"updated_at" date DEFAULT 'now()' NOT NULL,
	"device_token" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_idx" ON "user_deletion_logs" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");