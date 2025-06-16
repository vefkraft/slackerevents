// src/app/(admin)/layout.tsx
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="p-4 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
