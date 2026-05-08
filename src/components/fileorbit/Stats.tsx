import { motion } from "framer-motion";
import { FileCheck2, Users, Globe2, Zap } from "lucide-react";

const stats = [
  { icon: FileCheck2, value: "2.4M+", label: "Fichiers traités" },
  { icon: Users, value: "180k", label: "Utilisateurs actifs" },
  { icon: Globe2, value: "42", label: "Langues supportées" },
  { icon: Zap, value: "<3s", label: "Conversion moyenne" },
];

export function Stats() {
  return (
    <section className="relative py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
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
