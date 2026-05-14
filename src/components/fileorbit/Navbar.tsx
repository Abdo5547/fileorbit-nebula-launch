import { motion } from "framer-motion";
import { Menu, Orbit, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "PDF Tools", href: "#pdf" },
  { label: "Image Tools", href: "#images" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "#login" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto mt-3 sm:mt-4 max-w-7xl px-3 sm:px-6">
        <nav className="glass rounded-2xl flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
          <a href="#" className="flex items-center gap-2 group">
            <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-cosmic shadow-glow">
              <Orbit className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </span>
            <span className="text-base sm:text-lg font-semibold tracking-tight">
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
          <div className="flex items-center gap-2">
            <a
              href="#convert"
              className="hidden sm:inline-flex bg-cosmic text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl shadow-glow hover:opacity-90 transition"
            >
              Start converting
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden h-9 w-9 rounded-xl glass flex items-center justify-center"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#convert"
              onClick={() => setOpen(false)}
              className="mt-1 bg-cosmic text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-xl text-center shadow-glow"
            >
              Start converting
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
}