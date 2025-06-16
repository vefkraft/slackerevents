// -----------------------------
// Imports
// -----------------------------
import type { ReactNode } from "react";
import "@/styles/globals.css";
import "@/styles/variables.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
