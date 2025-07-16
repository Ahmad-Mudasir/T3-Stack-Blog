# Social Department

A modern social media application built with the T3 Stack, featuring user authentication, post creation, and a beautiful, responsive UI.

## ✨ Features

- **User Authentication:** Secure sign-in and sign-up powered by Clerk.
- **Post Feed:** Display all community posts in an attractive, card-based layout.
- **Post Creation:** A sleek form to create new posts with titles and content.
- **Post Deletion:** Users can delete their own posts with confirmation.
- **Responsive Design:** Optimized for various screen sizes using Tailwind CSS and shadcn/ui.
- **Server Actions:** Utilizes Next.js Server Actions for secure and efficient data mutations.
- **Type-Safe API:** Built with tRPC for end-to-end type safety.

## 🚀 Technologies Used

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Database:** PostgreSQL (via Prisma)
- **ORM:** Prisma
- **Type-Safe API:** tRPC
- **Server Actions Utility:** `next-safe-action`
- **Icons:** Lucide React

## 🛠️ Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd social-department
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install

# or

yarn install

# or

pnpm install
\`\`\`

### 3. Set up Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

\`\`\`env

# Clerk

NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test*..."
CLERK*SECRET_KEY="sk_test*..."

# Database (PostgreSQL)

DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# tRPC (if you have a specific URL for production, otherwise it defaults)

NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

- **Clerk:** Get your keys from your Clerk dashboard.
- **DATABASE_URL:** This is your PostgreSQL connection string.

### 4. Database Setup

Apply Prisma migrations to set up your database schema:

\`\`\`bash
npx prisma db push
\`\`\`

### 5. Run the Development Server

\`\`\`bash
npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 Usage

1.  **Sign In/Sign Up:** Use the navigation bar to sign in or create a new account.
2.  **View Posts:** Once signed in, you'll see a feed of all community posts on the homepage.
3.  **Create Post:** Navigate to the "Create Post" section (or click the button in the navbar) to add a new post.
4.  **Delete Post:** If you are the author of a post, a delete button will appear, allowing you to remove your post.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request.

## 📄 License

This project is open-sourced under the MIT License.
