import { motion } from "framer-motion";
import { FileCheck2, Users, Globe2, Zap } from "lucide-react";
import statsBg from "@/assets/stats-bg.jpg";

const stats = [
  { icon: FileCheck2, value: "2.4M+", label: "Fichiers traités" },
  { icon: Users, value: "180k", label: "Utilisateurs actifs" },
  { icon: Globe2, value: "42", label: "Langues supportées" },
  { icon: Zap, value: "<3s", label: "Conversion moyenne" },
];

export function Stats() {
  return (
    <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
      <img
        src={statsBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="glass rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-2xl bg-cosmic flex items-center justify-center shadow-glow shrink-0">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold leading-none">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
