"use server";

import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "You must be signed in to delete posts" };
    }

    // Check if the post exists and belongs to the current user
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    if (post.userId !== user.id) {
      return { success: false, error: "You can only delete your own posts" };
    }

    // Delete the post
    await db.post.delete({
      where: { id: postId },
    });

    // Revalidate the page to show updated data
    revalidatePath("/");

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
