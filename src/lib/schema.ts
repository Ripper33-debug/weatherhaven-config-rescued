import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable('leads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: text('created_at').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  organization: text('organization'),
  country: text('country'),
  sector: text('sector'),
  timeline: text('timeline'),
  message: text('message'),
  source: text('source'),
  metadata: text('metadata'),
});
