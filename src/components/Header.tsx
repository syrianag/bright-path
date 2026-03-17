import { BookOpen, Activity, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "System Status", icon: Activity },
    { to: "/troubleshoot", label: "Troubleshoot", icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight text-foreground">
              BrightPath
            </h1>
            <p className="text-xs font-medium text-muted-foreground">Support Center</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 rounded-2xl bg-secondary p-1">
          {links.map((link) => {
            const active = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-card shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <Icon className="h-4 w-4" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
