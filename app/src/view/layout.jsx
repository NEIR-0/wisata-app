import { Outlet, useLocation, matchPath, Navigate } from "react-router-dom";
import WildCard from "../view/wildCard";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function Layout() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  if (isRootPath) {
    return <Navigate to="/diary" replace />;
  }

  const validPaths = [
    "/diary",
  ];
  
  const isValidPath = validPaths.includes(location.pathname) || matchPath("/diary/:id", location.pathname);
  
  if (!isValidPath) {
    return (
      <div className="w-full flex relative">
        <WildCard />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
