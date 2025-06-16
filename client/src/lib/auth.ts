// -----------------------------
// Imports
// -----------------------------
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// -----------------------------
// Directus API base URL
// -----------------------------
const directusUrl = process.env.DIRECTUS_URL!;

// -----------------------------
// NextAuth configuration
// -----------------------------
export const {
  handlers,  // GET & POST handlers for [...nextauth]/route.ts
  auth,      // Helper for server-side authentication
} = NextAuth({
  providers: [
    // --- Credentials provider for Directus email/password login ---
    Credentials({
      name: "Directus Login",
      credentials: {
        email:    { label: "Email",    type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authenticate user against Directus API
        const res = await fetch(`${directusUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (!res.ok) return null;

        const { data } = await res.json();
        // Return user object for session/JWT
        return {
          id:    data.user.id,
          email: data.user.email,
          name:  data.user.first_name ?? data.user.email,
          directusToken: data.access_token, // Custom field for JWT
        } as any;
      },
    }),

    // --- Google OAuth provider ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Custom sign-in page
  pages: { signIn: "/login" },

  // -----------------------------
  // Callbacks
  // -----------------------------
  callbacks: {
    /**
     * signIn
     * Runs every time a user logs in.
     * For OAuth users, ensure user exists in Directus (create if not).
     */
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        try {
          // 1. Check if user already exists in Directus
          const existsRes = await fetch(
            `${directusUrl}/users?filter[email][_eq]=${encodeURIComponent(user.email!)}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.DIRECTUS_SERVICE_TOKEN}`,
              },
            }
          );
          const existsData = await existsRes.json();
          const userExists = existsData.data.length > 0;

          // 2. Create user if not found
          if (!userExists) {
            const res = await fetch(`${directusUrl}/users`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.DIRECTUS_SERVICE_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                first_name: user.name,
                role: "1be42d82-1674-48bb-80c0-0df3fa0ab692", // Default role
                status: "active",
              }),
            });

            if (!res.ok && res.status !== 409) {
              console.error("Directus user create error", await res.text());
              return false;
            }
          }
        } catch (err) {
          console.error("signIn callback error:", err);
          return false;
        }
      }
      return true;
    },

    /**
     * jwt
     * Store Directus token in JWT after login.
     */
    async jwt({ token, user }) {
      if (user && "directusToken" in user) {
        token.directusToken = (user as any).directusToken;
      }
      return token;
    },

    /**
     * session
     * Expose Directus token on the client session.
     */
    async session({ session, token }) {
      if (token.directusToken) {
        session.directusToken = token.directusToken as string;
      }
      return session;
    },
  },
});
