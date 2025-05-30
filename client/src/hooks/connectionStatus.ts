// src/hooks/useConnectionStatus.ts
import { useEffect, useState } from "react";
import type { ConnectionStatus } from "../types";

export const useConnectionStatus = (apiUrl: string): ConnectionStatus => {
  const [status, setStatus] = useState<ConnectionStatus>("checking");

  useEffect(() => {
    if (!apiUrl) {
      console.error("❌ Missing VITE_API_URL in .env file");
      setStatus("error");
      return;
    }

    const checkConnection = async () => {
      try {
        const res = await fetch(`${apiUrl}/server/ping`);
        if (!res.ok) throw new Error("Ping failed");
        setStatus("connected");
      } catch (err) {
        console.error("🚫 Connection to backend failed:", err);
        setStatus("disconnected");
      }
    };

    checkConnection();
  }, [apiUrl]);

  return status;
};
