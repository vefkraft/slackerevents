// src/_layout/MainLayout.tsx
import { Outlet } from "react-router-dom";


const MainLayout: React.FC = () => {
  return (
  <>
    {/* Navigation */}

    <main className="min-h-screen px-4 py-6">
      <Outlet />
    </main>

    {/* Footer */}
  </>
  );
};

export default MainLayout;
