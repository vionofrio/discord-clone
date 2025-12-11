import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import type z from "zod";
import { generateSnowflakeId } from "../snowflake";

export const directMessageTypeEnum = pgEnum("direct_message_type", [
  "ONE_ON_ONE",
  "GROUP",
]);

export const user = pgTable("user", {
  id: text("id")
    .$default(() => generateSnowflakeId())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
});

export const session = pgTable("session", {
  id: text("id")
    .$default(() => generateSnowflakeId())
    .primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
});

export const account = pgTable("account", {
  id: text("id")
    .$default(() => generateSnowflakeId())
    .primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id")
    .$default(() => generateSnowflakeId())
    .primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const directMessage = pgTable("direct_message", {
  id: text("id")
    .$default(() => generateSnowflakeId())
    .primaryKey(),
  ownerId: text("owner_id").references(() => user.id, {
    onDelete: "set null",
  }),
  type: directMessageTypeEnum("type").default("ONE_ON_ONE").notNull(),
  name: text("name"),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const directMessageParticipant = pgTable(
  "dm_participant",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    directMessageId: text("dm_id")
      .notNull()
      .references(() => directMessage.id, {
        onDelete: "cascade",
      }),
    isOpen: boolean("is_open").default(true).notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
    lastReadAt: timestamp("last_read_at"),
  },
  (t) => [
    primaryKey({
      columns: [t.userId, t.directMessageId],
    }),
    index("dm_participant_user_idx").on(t.userId),
    index("dm_participant_dm_idx").on(t.directMessageId),
  ],
);

export const directMessageRelations = relations(directMessage, ({ many }) => ({
  participants: many(directMessageParticipant),
}));

export const directMessageParticipantRelations = relations(
  directMessageParticipant,
  ({ one }) => ({
    user: one(user, {
      fields: [directMessageParticipant.userId],
      references: [user.id],
    }),
    directMessage: one(directMessage, {
      fields: [directMessageParticipant.directMessageId],
      references: [directMessage.id],
    }),
  }),
);

export const directMessageSelectSchema = createSelectSchema(directMessage);
export type DirectMessage = z.infer<typeof directMessageSelectSchema>;

export const directMessageParticipantSelectSchema = createSelectSchema(
  directMessageParticipant,
);
export type DirectMessageParticipant = z.infer<
  typeof directMessageParticipantSelectSchema
>;
