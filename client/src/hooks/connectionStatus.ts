import { useEffect, useState } from "react";

export function useConnectionStatus(apiUrl: string) {
	const [status, setStatus] = useState<"connected" | "disconnected" | "checking">("checking");

	useEffect(() => {
		const checkConnection = async () => {
			try {
				const res = await fetch(`${apiUrl}/server/ping`);
				if (!res.ok) throw new Error("Server not OK");
				setStatus("connected");
			} catch (err) {
				setStatus("disconnected");
			}
		};

		checkConnection();
	}, [apiUrl]);

	return status;
}
