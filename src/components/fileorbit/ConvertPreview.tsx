import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Download, Loader2 } from "lucide-react";

const stages = ["Uploading", "Processing", "Optimizing", "Ready"] as const;

const files = [
  { name: "rapport-annuel.pdf", size: "4.2 MB" },
  { name: "presentation.pptx", size: "8.1 MB" },
  { name: "photo-couverture.jpg", size: "2.7 MB" },
];

export function ConvertPreview() {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.2;
        if (next >= 100) {
          setStageIdx(0);
          return 0;
        }
        setStageIdx(Math.min(stages.length - 1, Math.floor((next / 100) * stages.length)));
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="convert" className="relative py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-gradient">Station de conversion</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Une interface claire, un résultat instantané</h2>
          <p className="mt-4 text-muted-foreground">
            Glissez vos fichiers dans la station, suivez chaque étape, récupérez le résultat.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 sm:p-8 shadow-glow"
        >
          <div className="grid lg:grid-cols-5 gap-6">
            {/* dropzone */}
            <div className="lg:col-span-2">
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full bg-white/[0.02]">
                <div className="h-14 w-14 rounded-2xl bg-cosmic flex items-center justify-center shadow-glow animate-pulse-glow">
                  <UploadCloud className="h-7 w-7 text-white" />
                </div>
                <div className="mt-4 font-semibold">Déposez vos fichiers ici</div>
                <div className="text-sm text-muted-foreground mt-1">ou cliquez pour parcourir</div>
                <div className="mt-4 text-xs text-muted-foreground">PDF · DOCX · JPG · PNG · WEBP</div>
              </div>
            </div>

            {/* file list */}
            <div className="lg:col-span-3 space-y-3">
              {files.map((f, i) => (
                <div key={f.name} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.size}</div>
                  </div>
                  {i === 0 ? (
                    <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  )}
                </div>
              ))}

              {/* progress */}
              <div className="glass rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="font-medium">{stages[stageIdx]}…</span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-cosmic rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                  {stages.map((s, i) => (
                    <div
                      key={s}
                      className={`text-center py-1 rounded-lg ${
                        i <= stageIdx ? "bg-white/10 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-cosmic text-primary-foreground font-medium py-2.5 rounded-xl shadow-glow inline-flex items-center justify-center gap-2 hover:opacity-90 transition">
                  <Download className="h-4 w-4" />
                  Download result
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}