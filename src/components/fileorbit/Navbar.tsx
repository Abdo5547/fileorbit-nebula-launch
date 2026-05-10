import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Orbit } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { label: "PDF Tools", to: "/tools/$toolSlug", params: { toolSlug: "pdf-merge" } },
  { label: "Image Tools", to: "/tools/$toolSlug", params: { toolSlug: "image-convert" } },
  { label: "Pricing", to: "/" as const, hash: "pricing" },
];

export function Navbar() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
        <nav className="glass rounded-2xl flex items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-cosmic shadow-glow">
              <Orbit className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              File<span className="text-gradient">Orbit</span>
            </span>
          </Link>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.label}>
                {"hash" in link ? (
                  <a href={`/#${link.hash}`} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    params={link.params}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link to={user ? "/dashboard" : "/login"} className="hover:text-foreground transition-colors">
                {user ? "Dashboard" : "Login"}
              </Link>
            </li>
          </ul>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="bg-cosmic text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl shadow-glow hover:opacity-90 transition"
          >
            {user ? "Open dashboard" : "Get started"}
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
