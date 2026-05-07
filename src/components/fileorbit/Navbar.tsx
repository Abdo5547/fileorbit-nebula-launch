import { motion } from "framer-motion";
import { Orbit } from "lucide-react";

const links = [
  { label: "PDF Tools", href: "#pdf" },
  { label: "Image Tools", href: "#images" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "#login" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
        <nav className="glass rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3">
          <a href="#" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-cosmic shadow-glow">
              <Orbit className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              File<span className="text-gradient">Orbit</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#convert"
            className="bg-cosmic text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl shadow-glow hover:opacity-90 transition"
          >
            Start converting
          </a>
        </nav>
      </div>
    </motion.header>
  );
}