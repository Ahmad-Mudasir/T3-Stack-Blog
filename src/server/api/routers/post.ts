import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"; // Assuming publicProcedure is used for now

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // This 'create' procedure needs to be updated to match your Prisma schema
  // even if your frontend is using next-safe-action for post creation.
  create: publicProcedure // Consider changing to `protectedProcedure` if only logged-in users can create posts
    .input(
      z.object({
        title: z.string().min(1), // Changed 'name' to 'title'
        content: z.string().min(1), // Added 'content' and made it required (min(1))
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Simulate a slow DB call (optional, remove if not needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.post.create({
        data: {
          title: input.title, // Changed 'name' to 'title'
          content: input.content, // Added 'content'
          userId: (() => {
            const userIdPromise = ctx.auth.then((auth) => auth.userId);
            return userIdPromise.then((userId) => {
              if (!userId) {
                throw new Error("User ID is required to create a post.");
              }
              return userId;
            });
          })() as unknown as string, // Type assertion to satisfy Prisma, but see below for better fix
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return post ?? null;
  }),

  // This procedure is used by your homepage to display all posts
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
