// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./_layout/MainLayout";

// Hooks
import { useConnectionStatus } from "./hooks/connectionStatus";

// Pages
import Home from "./pages/Home.page/Home";
import Login from "./pages/LogIn.page/LogIn";
import Gallery from "./pages/Gallery.page/Gallery";
import EventList from "./components/EventDetails/event.detail";
import EventDetails from "./pages/EventDetails.page/EventDetails";
import NotFound from "./pages/NotFound.page/PageNotFound";
import Contact from "./pages/Contact.page/Contact";


// Constants
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
      // Main Layout
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      // Admin Layout (comming soon)
      //........
    </Routes>
  );
};

export default App;
