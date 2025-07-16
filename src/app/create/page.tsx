"use client";

import { useAction } from "next-safe-action/hooks";
import { createPost } from "~/actions/createPost"; // Assuming this action exists
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label"; // Ensure you have this component or install it
import { Loader2, PenSquare } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { execute, status, result } = useAction(createPost, {
    onSuccess: () => {
      setTitle("");
      setContent("");
      router.push("/");
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-transparent p-6">
      <Card className="mx-auto w-full max-w-md shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex items-center justify-center">
            <PenSquare className="mr-2 h-8 w-8 text-blue-600" />
            <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Create New Post
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Share your thoughts with the community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              execute({ title, content });
            }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] w-full rounded-md border border-gray-300 px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
              disabled={
                status === "executing" || !title.trim() || !content.trim()
              }
            >
              {status === "executing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
            {result?.serverError && (
              <p className="mt-2 text-center text-sm text-red-600" role="alert">
                {result.serverError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
