CREATE TABLE "short_urls" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"original_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "short_urls_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "short_urls_name_idx" ON "short_urls" USING btree ("name");