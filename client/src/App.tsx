// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./_layout/MainLayout";

import { useConnectionStatus } from "./hooks/connectionStatus";

import Home from "./pages/Home.page/Home";
import NotFound from "./pages/NotFound.page/PageNotFound";

const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const status = useConnectionStatus(apiUrl);

  if (status === "checking") return <p>🔄 Checking backend connection...</p>;
  if (status === "disconnected")
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <h2>❌ No connection to backend</h2>
        <p>Check your Directus server or VITE_API_URL</p>
      </div>
    );

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
