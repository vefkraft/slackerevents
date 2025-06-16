"use client";
// -----------------------------
// Imports
// -----------------------------
import { signIn } from "next-auth/react";

/**
 * SignInButton
 * ------------
 * Button that triggers Google OAuth login using NextAuth.
 * Redirects user to the homepage after successful login.
 */
export default function SignInButton() {
  return (
    <button
      // On click, start Google sign-in flow and redirect to "/"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Log ind med Google
    </button>
  );
}
