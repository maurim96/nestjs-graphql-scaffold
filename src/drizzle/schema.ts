import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import {
  date,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: varchar('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    createdAt: date('created_at').notNull().default('now()'),
    updatedAt: date('updated_at').notNull().default('now()'),
    deviceToken: varchar('device_token'),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex('email_idx').on(users.email),
    };
  },
);

export const posts = pgTable('posts', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  title: varchar('title'),
  content: varchar('body'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const userDeletionLogs = pgTable(
  'user_deletion_logs',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: varchar('user_id').notNull().unique(),
    reason: varchar('reason'),
    deletedAt: date('deleted_at').notNull().default('now()'),
  },
  (userDeletionLogs) => {
    return {
      userIdIndex: uniqueIndex('user_idx').on(userDeletionLogs.userId),
    };
  },
);
