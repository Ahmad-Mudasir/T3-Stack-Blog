import type { UserResource } from "@clerk/types";
import type { Session } from "@clerk/clerk-sdk-node";

export const authOptions = {
  callbacks: {
    session({ session, user }: { session: Session; user: UserResource }) {
      if (user?.id) {
        // If your session object should have a user id, you can add it directly to session
        (session as { user?: { id?: string } }).user = { id: user.id };
      }
      return session;
    },
  },
};
