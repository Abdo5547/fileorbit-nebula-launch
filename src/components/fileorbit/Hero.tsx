import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Image as ImageIcon, Layers, Minimize2, Maximize2 } from "lucide-react";

const orbitTools = [
  { icon: FileText, label: "PDF to Word", angle: 0, color: "from-violet-400 to-fuchsia-500" },
  { icon: Minimize2, label: "Compress PDF", angle: 72, color: "from-cyan-400 to-blue-500" },
  { icon: Layers, label: "Merge PDF", angle: 144, color: "from-blue-400 to-violet-500" },
  { icon: ImageIcon, label: "JPG to PDF", angle: 216, color: "from-fuchsia-400 to-pink-500" },
  { icon: Maximize2, label: "Resize Image", angle: 288, color: "from-cyan-300 to-teal-400" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative pt-36 pb-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-aurora pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: titleY }} className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cosmic animate-pulse" />
            New · OCR & background removal in orbit
          </motion.span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Tous vos fichiers <br />
            dans une seule <span className="text-gradient">orbite</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Convertissez, compressez, fusionnez et optimisez vos PDF, images et documents
            en quelques secondes — depuis une station spatiale moderne et sécurisée.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#convert"
              className="bg-cosmic text-primary-foreground font-medium px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition"
            >
              Commencer maintenant
            </a>
            <a
              href="#tools"
              className="glass text-foreground font-medium px-6 py-3 rounded-xl hover:bg-white/5 transition"
            >
              Explorer les outils
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-xs text-muted-foreground">
            <div><span className="text-foreground font-semibold">2.4M</span> fichiers traités</div>
            <div><span className="text-foreground font-semibold">99.9%</span> uptime</div>
            <div><span className="text-foreground font-semibold">256-bit</span> chiffrement</div>
          </div>
        </motion.div>

        <motion.div style={{ scale: planetScale, y: planetY }} className="relative aspect-square max-w-[520px] mx-auto w-full">
          {/* orbit rings */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-6 rounded-full border border-white/5" />
          <div className="absolute inset-12 rounded-full border border-white/5" />

          {/* planet */}
          <div className="absolute inset-[22%] rounded-full planet animate-pulse-glow" />

          {/* rotating tool cards */}
          <div className="absolute inset-0 animate-orbit">
            {orbitTools.map((t) => {
              const rad = (t.angle * Math.PI) / 180;
              const r = 46; // % radius
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse"
                  style={{ top: `${y}%`, left: `${x}%` }}
                >
                  <div className="glass rounded-2xl px-3 py-2 flex items-center gap-2 animate-float shadow-card">
                    <span className={`h-7 w-7 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-xs font-medium whitespace-nowrap">{t.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}