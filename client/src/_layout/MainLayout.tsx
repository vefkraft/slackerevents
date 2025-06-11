import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/navigation";

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Hide others if necessary
  const hideNav = /^\/events\/[^\/]+$/.test(location.pathname);

  return (
    <>
      {!hideNav && <Navigation />}

      <main className="margin-0 padding-0">
        <Outlet />
      </main>

      {/* Footer */}
    </>
  );
};

export default MainLayout;
