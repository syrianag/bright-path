import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="min-h-screen bg-background">
    <Header />
    
    <Outlet />

    <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} BrightPath
    </footer>
  </div>
);

export default Layout;