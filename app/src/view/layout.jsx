import { Outlet, useLocation, matchPath } from "react-router-dom";
import WildCard from "../view/wildCard";

function Layout() {
  const location = useLocation();
  const validPaths = [
    "/",
  ];
  
  const isValidPath = validPaths.includes(location.pathname) || matchPath("/detail/:id", location.pathname);

  if (!isValidPath) {
    return (
      <div className="w-full flex relative">
        <WildCard />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
