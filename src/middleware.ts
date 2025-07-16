// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

// Optionally restrict paths:
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', // match everything except static files
    '/',                          // homepage
    '/(api|trpc)(.*)',            // your API routes
  ],
}
