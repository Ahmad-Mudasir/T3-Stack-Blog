"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deletePost } from "~/actions/delete-post"; // Corrected import path for the action

interface DeletePostButtonProps {
  postId: string;
  currentUserId: string;
  postUserId: string;
}

export function DeletePostButton({
  postId,
  currentUserId,
  postUserId,
}: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Only show delete button if current user is the post author
  if (currentUserId !== postUserId) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deletePost(postId);

      if (!result.success) {
        alert(result.error || "Failed to delete post");
      }
      // The revalidatePath in the server action will handle the UI refresh
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="group/delete flex cursor-pointer items-center space-x-2 text-gray-500 transition-colors duration-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="h-5 w-5 transition-transform duration-200 group-hover/delete:scale-110" />
      <span className="text-sm font-medium">
        {isDeleting ? "Deleting..." : "Delete"}
      </span>
    </button>
  );
}
