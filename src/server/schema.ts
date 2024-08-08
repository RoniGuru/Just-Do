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

export const tasksTable = createTable(
  "task",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    isCompleted: boolean("is_completed").default(false).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
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

export const stepsTable = createTable("step", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id")
    .references(() => tasksTable.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  userId: varchar("userId", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
