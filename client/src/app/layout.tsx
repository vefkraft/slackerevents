// ------------ Imports ---------------
import type { ReactNode } from "react";
import "@/styles/global.css";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
       className="">{children}
      </body>
    </html>
  );
}

