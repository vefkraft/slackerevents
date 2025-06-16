// -----------------------------
// Imports
// -----------------------------
import type { ReactNode } from "react";
import "@/styles/globals.css";
import "@/styles/variables.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Squada+One&display=swap" rel="stylesheet" />
      </head>
      <body
       className="">{children}
      </body>
    </html>
  );
}
