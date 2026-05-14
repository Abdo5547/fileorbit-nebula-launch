import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-cosmic p-10 sm:p-16 text-center shadow-glow"
        >
          <img
            src={ctaBg}
            alt=""
            aria-hidden
            loading="lazy"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-background/20 backdrop-blur rounded-full px-3 py-1 text-xs text-primary-foreground">
              <Sparkles className="h-3 w-3 text-secondary" /> Essai gratuit · sans carte
            </span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-primary-foreground leading-tight">
              Prêt à libérer vos fichiers ?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
              Rejoignez 180 000 utilisateurs qui simplifient leurs documents chaque jour avec FileOrbit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#convert"
                className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                Commencer gratuitement <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#pricing"
                className="bg-background/20 backdrop-blur text-primary-foreground font-medium px-6 py-3 rounded-xl hover:bg-background/30 transition"
              >
                Voir les tarifs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
