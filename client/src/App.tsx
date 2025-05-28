// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./_layout/MainLayout";
import Home from "./pages/Home.page/Home";
import NotFound from "./pages/PageNotFound.page/PageNotFound";

const App = () => {
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
