import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Upload, ScanLine, ShieldCheck, Download, FileText, FileType2 } from "lucide-react";

const steps = [
  { icon: Upload, title: "Déposez votre fichier", desc: "Glissez-déposez ou importez depuis le cloud. Tous formats acceptés." },
  { icon: ScanLine, title: "Analyse intelligente", desc: "Notre moteur identifie le contenu et choisit la meilleure orbite." },
  { icon: ShieldCheck, title: "Conversion sécurisée", desc: "Chiffrement AES-256 de bout en bout. Vos fichiers ne sont jamais stockés." },
  { icon: Download, title: "Téléchargement instantané", desc: "Récupérez votre fichier transformé en quelques secondes." },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const fileX = useTransform(scrollYProgress, [0, 0.5, 1], ["-40%", "0%", "40%"]);
  const fileRotate = useTransform(scrollYProgress, [0, 1], [-15, 360]);
  const fileOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [1, 1, 0, 0]);
  const docxOpacity = useTransform(scrollYProgress, [0.45, 0.6, 1], [0, 1, 1]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 0.9]);
  const ringGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.4]);

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          {/* steps */}
          <div className="space-y-5">
            <p className="text-sm font-medium text-gradient">Le parcours d'un fichier</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              De votre disque à l'orbite, <br /> en 4 étapes lumineuses.
            </h2>
            <div className="mt-8 space-y-4">
              {steps.map((s, i) => {
                const start = i / steps.length;
                const end = (i + 1) / steps.length;
                return <Step key={s.title} step={s} progress={scrollYProgress} start={start} end={end} index={i} />;
              })}
            </div>
          </div>

          {/* visual */}
          <div className="relative aspect-square max-w-[520px] mx-auto w-full">
            <Starlines />
            {/* glowing ring */}
            <motion.div
              style={{ scale: ringScale, opacity: ringGlow }}
              className="absolute inset-[18%] rounded-full border-2 border-cyan-300/40"
            >
              <div className="absolute inset-0 rounded-full bg-cosmic blur-2xl opacity-30" />
            </motion.div>
            <motion.div
              style={{ scale: ringScale }}
              className="absolute inset-[26%] rounded-full border border-violet-400/30"
            />

            {/* PDF file */}
            <motion.div
              style={{ x: fileX, rotate: fileRotate, opacity: fileOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="glass rounded-2xl p-5 shadow-glow flex flex-col items-center gap-2">
                <FileText className="h-12 w-12 text-cyan-300" />
                <span className="text-xs font-mono text-muted-foreground">document.pdf</span>
              </div>
            </motion.div>

            {/* DOCX result */}
            <motion.div
              style={{ x: fileX, opacity: docxOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="glass rounded-2xl p-5 shadow-glow flex flex-col items-center gap-2">
                <FileType2 className="h-12 w-12 text-violet-300" />
                <span className="text-xs font-mono text-muted-foreground">document.docx</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  progress,
  start,
  end,
  index,
}: {
  step: (typeof steps)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  index: number;
}) {
  const opacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0.3, 1, 1, 0.3]);
  const x = useTransform(progress, [start, start + 0.1], [-20, 0]);
  const Icon = step.icon;
  return (
    <motion.div style={{ opacity, x }} className="glass rounded-2xl p-4 flex gap-4 items-start">
      <div className="h-11 w-11 rounded-xl bg-cosmic flex items-center justify-center shrink-0 shadow-glow">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Étape {index + 1}</div>
        <div className="font-semibold">{step.title}</div>
        <div className="text-sm text-muted-foreground mt-1">{step.desc}</div>
      </div>
    </motion.div>
  );
}

function Starlines() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 h-px w-1/2 bg-gradient-to-r from-cyan-400/0 via-cyan-300/50 to-violet-500/0"
          style={{ transform: `rotate(${i * 30}deg) translateX(-50%)`, transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}