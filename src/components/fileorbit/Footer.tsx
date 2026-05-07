import { Orbit } from "lucide-react";

const cols = [
  { title: "Product", links: ["PDF Tools", "Image Tools", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-cosmic flex items-center justify-center shadow-glow">
              <Orbit className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold">
              File<span className="text-gradient">Orbit</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Fast, secure and beautiful file conversion — directement depuis votre orbite.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold mb-3">{c.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FileOrbit. All rights reserved.
      </div>
    </footer>
  );
}