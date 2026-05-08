import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Layers,
  Scissors,
  Minimize2,
  FileImage,
  Image as ImageIcon,
  Maximize2,
  Repeat,
  RotateCw,
  FilePlus2,
  type LucideIcon,
} from "lucide-react";

type Tool = {
  icon: LucideIcon;
  title: string;
  desc: string;
  slug: string;
};

const pdfTools: Tool[] = [
  { icon: Layers, title: "Merge PDF", desc: "Combinez plusieurs PDF en un seul document.", slug: "pdf-merge" },
  { icon: Scissors, title: "Split PDF", desc: "Séparez un PDF selon vos pages ou vos plages.", slug: "pdf-split" },
  { icon: RotateCw, title: "Rotate PDF", desc: "Faites pivoter vos pages PDF.", slug: "pdf-rotate" },
  { icon: FileImage, title: "PDF to Images", desc: "Extrayez chaque page en image.", slug: "pdf-to-images" },
  { icon: FilePlus2, title: "Images to PDF", desc: "Assemblez vos images en PDF.", slug: "images-to-pdf" },
];

const imageTools: Tool[] = [
  { icon: Repeat, title: "Convert Image", desc: "Changez de format en un instant.", slug: "image-convert" },
  { icon: Maximize2, title: "Resize Image", desc: "Redimensionnez en quelques clics.", slug: "image-resize" },
  { icon: Minimize2, title: "Compress Image", desc: "Optimisez JPG, PNG et WebP.", slug: "image-compress" },
  { icon: ImageIcon, title: "Rotate or Flip", desc: "Pivotez ou retournez vos images.", slug: "image-rotate-flip" },
];

export function ToolsGrid() {
  return (
    <section id="tools" className="relative py-32 px-4 sm:px-6">
      <div className="absolute inset-0 bg-aurora opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-gradient">Stations d'outils</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Toute votre boîte à outils, en orbite</h2>
          <p className="mt-4 text-muted-foreground">
            Le catalogue ci-dessous est maintenant aligné avec les endpoints Django réellement disponibles.
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
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 group hover:border-white/30 transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-cosmic flex items-center justify-center shadow-glow group-hover:scale-110 transition">
              <tool.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-4 font-semibold">{tool.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{tool.desc}</div>
            <Link
              to="/tools/$toolSlug"
              params={{ toolSlug: tool.slug }}
              className="mt-4 text-sm font-medium text-foreground/90 hover:text-gradient inline-flex items-center gap-1"
            >
              Use tool →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
