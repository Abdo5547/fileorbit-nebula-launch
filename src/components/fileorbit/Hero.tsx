import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, Layers, Minimize2, Maximize2, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroDoc from "@/assets/hero-doc.png";

const floatingTools = [
  { icon: FileText, label: "PDF to Word", x: "-12%", y: "8%", delay: 0 },
  { icon: Minimize2, label: "Compress", x: "82%", y: "12%", delay: 0.1 },
  { icon: Layers, label: "Merge PDF", x: "-8%", y: "62%", delay: 0.2 },
  { icon: ImageIcon, label: "JPG to PDF", x: "85%", y: "58%", delay: 0.3 },
  { icon: Maximize2, label: "Resize", x: "40%", y: "92%", delay: 0.4 },
];

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        width={1536}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-secondary" />
            Sécurisé · Privé · Sans inscription
          </span>
          <h1 className="mt-5 text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Tous vos fichiers, <br />
            une seule <span className="text-gradient">plateforme</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Convertissez, compressez, fusionnez et optimisez vos PDF, images et documents
            en quelques secondes — simple, rapide et confidentiel.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#convert"
              className="bg-cosmic text-primary-foreground font-medium px-5 sm:px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition w-full sm:w-auto text-center"
            >
              Commencer maintenant
            </a>
            <a
              href="#tools"
              className="glass text-foreground font-medium px-5 sm:px-6 py-3 rounded-xl hover:bg-white/5 transition w-full sm:w-auto text-center"
            >
              Explorer les outils
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start text-xs text-muted-foreground">
            <div><span className="text-foreground font-semibold">2.4M</span> fichiers traités</div>
            <div><span className="text-foreground font-semibold">99.9%</span> uptime</div>
            <div><span className="text-foreground font-semibold">256-bit</span> chiffrement</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square max-w-[360px] sm:max-w-[520px] mx-auto w-full"
        >
          <div className="absolute inset-[15%] rounded-3xl bg-primary/20 blur-3xl" />
          <motion.img
            src={heroDoc}
            alt="Document"
            width={1024}
            height={1024}
            className="absolute inset-[18%] object-contain drop-shadow-[0_0_40px_oklch(0.62_0.18_320/0.6)]"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {floatingTools.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + t.delay }}
                style={{ left: t.x, top: t.y }}
                className="absolute"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + t.delay * 2, repeat: Infinity, ease: "easeInOut", delay: t.delay }}
                  className="glass rounded-xl sm:rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-card"
                >
                  <span className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-cosmic flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{t.label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
