import { motion } from "framer-motion";
import { Upload, ScanLine, ShieldCheck, Download } from "lucide-react";
import toolsBg from "@/assets/tools-bg.jpg";

const steps = [
  { icon: Upload, title: "Déposez votre fichier", desc: "Glissez-déposez ou importez depuis le cloud. Tous formats acceptés." },
  { icon: ScanLine, title: "Analyse intelligente", desc: "Notre moteur identifie le contenu et choisit la meilleure transformation." },
  { icon: ShieldCheck, title: "Conversion sécurisée", desc: "Chiffrement AES-256 de bout en bout. Vos fichiers ne sont jamais stockés." },
  { icon: Download, title: "Téléchargement instantané", desc: "Récupérez votre fichier transformé en quelques secondes." },
];

export function ScrollStory() {
  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <img
        src={toolsBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-gradient">Le parcours d'un fichier</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
            De votre disque au résultat, en 4 étapes
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-2xl p-5 relative"
              >
                <div className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="h-11 w-11 rounded-xl bg-cosmic flex items-center justify-center shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="mt-4 font-semibold">{s.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
