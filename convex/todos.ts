import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Get all tasks for the user
export const getTodos = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    return await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

// ✅ Add a new task
export const addTodo = mutation({
  args: { task: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    await ctx.db.insert("todos", {
      userId: identity.subject,
      task: args.task,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

// ✅ Toggle task completion
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== identity.subject) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// ✅ Delete a task
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== identity.subject) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
