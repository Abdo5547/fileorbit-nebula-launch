import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, FileType2, HardDrive, Zap, Clock } from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

const recent = [
  { icon: FileText, name: "contrat-2026.pdf", time: "il y a 2 min", status: "Done", color: "text-green-400" },
  { icon: ImageIcon, name: "hero-banner.webp", time: "il y a 14 min", status: "Done", color: "text-green-400" },
  { icon: FileType2, name: "rapport.docx", time: "il y a 1 h", status: "Processing", color: "text-secondary" },
  { icon: FileText, name: "facture-mai.pdf", time: "il y a 3 h", status: "Done", color: "text-green-400" },
];

const history = [
  { tool: "Compress PDF", count: 12 },
  { tool: "PDF to Word", count: 8 },
  { tool: "Resize Image", count: 5 },
  { tool: "Remove Background", count: 3 },
];

const actions = [
  { icon: Zap, label: "Compress" },
  { icon: FileType2, label: "Convert" },
  { icon: ImageIcon, label: "Resize" },
  { icon: FileText, label: "Merge" },
];

export function DashboardPreview() {
  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <img
        src={dashboardBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-gradient">Tableau de bord</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Pilotez votre orbite</h2>
          <p className="mt-4 text-muted-foreground">
            Tous vos fichiers, conversions et statistiques au même endroit.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8 grid lg:grid-cols-3 gap-6"
        >
          {/* recent */}
          <div className="lg:col-span-2 glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent files</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              {recent.map((r) => (
                <div key={r.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                  <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <r.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.time}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-white/5 ${r.color}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* right column */}
          <div className="space-y-6">
            {/* storage */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <HardDrive className="h-4 w-4 text-secondary" />
                <h3 className="font-semibold text-sm">Storage used</h3>
              </div>
              <div className="text-2xl font-bold">6.4 <span className="text-sm text-muted-foreground">/ 20 GB</span></div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-cosmic rounded-full" style={{ width: "32%" }} />
              </div>
            </div>

            {/* history */}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-semibold text-sm mb-3">Conversion history</h3>
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h.tool} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{h.tool}</span>
                    <span className="font-medium">{h.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* actions */}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-semibold text-sm mb-3">Quick actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {actions.map((a) => (
                  <button
                    key={a.label}
                    className="glass rounded-xl py-3 flex flex-col items-center gap-1 hover:bg-white/10 transition"
                  >
                    <a.icon className="h-4 w-4 text-secondary" />
                    <span className="text-xs">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}