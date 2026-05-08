import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    quote: "FileOrbit a remplacé 4 outils différents dans mon workflow. La compression PDF garde une qualité bluffante.",
    name: "Léa Marchand",
    role: "Directrice artistique, Studio Nova",
    avatar: "LM",
  },
  {
    quote: "L'OCR est incroyablement précis sur nos archives scannées. Un gain de temps énorme pour toute l'équipe juridique.",
    name: "Karim Bensalem",
    role: "Avocat associé, Cabinet Lumen",
    avatar: "KB",
  },
  {
    quote: "Interface clean, conversions instantanées, et zéro pub. C'est devenu mon outil quotidien.",
    name: "Sofia Ricci",
    role: "Designer freelance",
    avatar: "SR",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-gradient">Ils nous font confiance</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Aimé par des milliers de pros</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-cosmic flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
