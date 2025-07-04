// -----------------------------
// Imports
// -----------------------------
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className=" font-bold text-4xl mb-6 text-blue-600">
        Welcome to SlackerEvent 🎟️
      </h1>


      {session?.user ? (
        <p className="text-lg mt-4">Hi {session.user.name} 👋</p>
      ) : (
        <p className="text-lg mt-4 text-gray-500">You are not logged in</p>
      )}
    </div>
  );
}
