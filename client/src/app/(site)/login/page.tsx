// src/app/(site)/login/page.tsx
"use client";
// ------------ Imports ---------------
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SignInButton from "@/components/SigninButton/signinButton";

/**
 * LoginPage
 * ---------
 * Handles both credentials and Google OAuth login.
 * Redirects user to callbackUrl (or home) after successful login.
 */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // State for form fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * Handles credentials login form submit.
   * Calls NextAuth signIn with credentials and redirects on success.
   */
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setErrorMsg("Incorrect email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-6">
      <h1 className="text-3xl font-bold mb-6">Log in</h1>

      {/* Credentials login form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Log in
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 text-center text-gray-500">or</div>

      {/* Google OAuth login */}
      <SignInButton />
    </div>
  );
}
