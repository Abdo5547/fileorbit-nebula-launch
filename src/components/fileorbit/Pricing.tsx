import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Pour découvrir l'essentiel",
    features: ["10 conversions / jour", "Fichiers jusqu'à 25 MB", "Outils PDF & image de base", "Sans inscription"],
    cta: "Démarrer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9",
    desc: "Pour les pros exigeants",
    features: ["Conversions illimitées", "Fichiers jusqu'à 5 GB", "OCR & détourage IA", "Stockage cloud 100 GB", "Support prioritaire"],
    cta: "Passer Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "29",
    desc: "Pour les équipes",
    features: ["Tout Pro inclus", "Jusqu'à 10 utilisateurs", "Espace partagé 1 TB", "Audit & SSO", "API dédiée"],
    cta: "Contacter",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-gradient">Tarifs transparents</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Choisissez votre orbite</h2>
          <p className="mt-4 text-muted-foreground">Annulez à tout moment. Sans frais cachés.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-3xl p-6 flex flex-col ${
                p.highlighted
                  ? "bg-cosmic shadow-glow border border-secondary/40"
                  : "glass"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Populaire
                </span>
              )}
              <div className={p.highlighted ? "text-primary-foreground" : ""}>
                <div className="text-sm font-semibold opacity-80">{p.name}</div>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold">{p.price}€</span>
                  <span className="text-sm opacity-70 mb-1">/mois</span>
                </div>
                <p className="text-sm opacity-80 mt-2">{p.desc}</p>
              </div>
              <ul className={`mt-6 space-y-3 text-sm flex-1 ${p.highlighted ? "text-primary-foreground" : ""}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.highlighted ? "text-secondary" : "text-secondary"}`} />
                    <span className="opacity-90">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 rounded-xl py-2.5 font-medium transition ${
                  p.highlighted
                    ? "bg-secondary text-secondary-foreground hover:opacity-90"
                    : "glass hover:bg-white/5"
                }`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
