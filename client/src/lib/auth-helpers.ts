import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth(callbackUrl: string = "/") {
  const session = await auth();

  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return session;
}
