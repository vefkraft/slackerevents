// -----------------------------
// Imports
// -----------------------------
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">
        Welcome to SlackerEvent 🎟️
      </h1>

      {session?.user ? (
        <p className="text-lg mt-4">Hej {session.user.name} 👋</p>
      ) : (
        <p className="text-lg mt-4 text-gray-500">Du er ikke logget ind</p>
      )}
    </div>
  );
}
