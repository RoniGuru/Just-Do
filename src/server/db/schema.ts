// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";

import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `just-do_${name}`);

export const goals = createTable(
  "goal",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    isCompleted: boolean("is_completed").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const tasks = createTable("task", {
  id: serial("id").primaryKey(),
  goalId: integer("goal_id")
    .references(() => goals.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
