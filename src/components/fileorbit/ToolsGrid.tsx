import { motion } from "framer-motion";
import {
  Layers, Scissors, Minimize2, FileText, FileType2, FileImage, Lock, ScanText,
  Image as ImageIcon, Maximize2, Repeat, Eraser, Crop, FilePlus2,
  type LucideIcon,
} from "lucide-react";

type Tool = { icon: LucideIcon; title: string; desc: string };

const pdfTools: Tool[] = [
  { icon: Layers, title: "Merge PDF", desc: "Combinez plusieurs PDF en un seul document." },
  { icon: Scissors, title: "Split PDF", desc: "Séparez les pages d'un PDF en fichiers distincts." },
  { icon: Minimize2, title: "Compress PDF", desc: "Réduisez le poids sans perte visible." },
  { icon: FileType2, title: "PDF to Word", desc: "Convertissez en .docx éditable." },
  { icon: FileText, title: "Word to PDF", desc: "Exportez Word en PDF universel." },
  { icon: FileImage, title: "PDF to JPG", desc: "Extrayez chaque page en image." },
  { icon: Lock, title: "Protect PDF", desc: "Ajoutez un mot de passe sécurisé." },
  { icon: ScanText, title: "OCR PDF", desc: "Rendez vos scans recherchables." },
];

const imageTools: Tool[] = [
  { icon: Minimize2, title: "Compress Image", desc: "Optimisez JPG, PNG et WebP." },
  { icon: Maximize2, title: "Resize Image", desc: "Redimensionnez en quelques clics." },
  { icon: Repeat, title: "Convert JPG/PNG/WebP", desc: "Changez de format en un instant." },
  { icon: Eraser, title: "Remove Background", desc: "Détourage IA en un clic." },
  { icon: Crop, title: "Crop Image", desc: "Recadrez avec précision." },
  { icon: FilePlus2, title: "Image to PDF", desc: "Assemblez vos images en PDF." },
];

export function ToolsGrid() {
  return (
    <section id="tools" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="absolute inset-0 bg-aurora opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-gradient">Stations d'outils</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Toute votre boîte à outils, en orbite</h2>
          <p className="mt-4 text-muted-foreground">
            Des outils PDF et image rapides, sécurisés et accessibles depuis n'importe quel appareil.
          </p>
        </div>

        <Category id="pdf" title="PDF Tools" tools={pdfTools} />
        <Category id="images" title="Image Tools" tools={imageTools} />
      </div>
    </section>
  );
}

function Category({ id, title, tools }: { id: string; title: string; tools: Tool[] }) {
  return (
    <div id={id} className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">{tools.length} outils</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 group hover:border-white/30 transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-cosmic flex items-center justify-center shadow-glow group-hover:scale-110 transition">
              <t.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-4 font-semibold">{t.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
            <button className="mt-4 text-sm font-medium text-foreground/90 hover:text-gradient inline-flex items-center gap-1">
              Use tool →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}