'use server'

import { z } from 'zod'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '~/server/db'
import { action } from '~/lib/safe-action'
import type { Prisma } from '@prisma/client'


// Client-side input validation schema
const createPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character"),
  content: z.string().min(1, "Content must be at least 1 character")
})

export const createPost = action
  .inputSchema(createPostSchema)
  .action(async ({ parsedInput }) => {
    // Authentication check
    const user = await currentUser()
    if (!user) {
      throw new Error('You must be logged in to create a post')
    }

    // Create post with proper typing
    const postData: Prisma.PostCreateInput = {
      title: parsedInput.title,
      content: parsedInput.content,
      userId: user.id // Matches exactly with your Prisma schema
    }

    // Database operation
    try {
      const newPost = await db.post.create({
        data: postData
      })
      return newPost
    } catch (error) {
      console.error('Failed to create post:', error)
      throw new Error('Failed to create post')
    }
  })