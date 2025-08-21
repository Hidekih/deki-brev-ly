import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const shortUrls = pgTable(
  'short_urls',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    name: text('name').notNull().unique(),
    originalUrl: text('original_url').notNull(),
    accessCount: integer('access_count').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  table => [uniqueIndex('short_urls_name_idx').on(table.name)]
);
