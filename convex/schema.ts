import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  
  // ✅ New `todos` table
  todos: defineTable({
    userId: v.string(), // User who owns the task
    task: v.string(), // Task text
    completed: v.boolean(), // Is task done?
    createdAt: v.number(), // Timestamp for sorting
  }).index("by_user", ["userId"]),
});
