import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Cloud, Cpu, Lock, Infinity as InfinityIcon } from "lucide-react";
import featuresBg from "@/assets/features-bg.jpg";

const features = [
  { icon: ShieldCheck, title: "Confidentialité totale", desc: "Aucun fichier conservé après traitement. Tout est chiffré en transit et au repos." },
  { icon: Sparkles, title: "IA intégrée", desc: "Détourage, OCR et compression intelligente alimentés par nos modèles propriétaires." },
  { icon: Cloud, title: "Cloud & local", desc: "Importez depuis Drive, Dropbox ou votre disque. Travaillez où vous voulez." },
  { icon: Cpu, title: "Pipeline GPU", desc: "Conversions massives parallélisées sur GPU pour une vitesse imbattable." },
  { icon: Lock, title: "Conformité RGPD", desc: "Hébergement européen, audit indépendant, contrôle complet de vos données." },
  { icon: InfinityIcon, title: "Sans limite", desc: "Plan gratuit généreux. Premium pour les pros et équipes exigeantes." },
];

export function Features() {
  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <img
        src={featuresBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="absolute right-10 bottom-10 h-60 w-60 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-gradient">Pourquoi FileOrbit</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Conçu pour la vitesse, la confiance et la simplicité</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition group"
            >
              <div className="h-11 w-11 rounded-xl bg-cosmic flex items-center justify-center shadow-glow group-hover:scale-105 transition">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
