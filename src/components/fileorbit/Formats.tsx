import { motion } from "framer-motion";
import formatsBg from "@/assets/formats-bg.jpg";

const formats = ["PDF", "DOCX", "XLSX", "PPTX", "JPG", "PNG", "WEBP", "HEIC", "SVG", "TXT", "EPUB", "MD", "CSV", "ZIP"];

export function Formats() {
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 border-y border-border overflow-hidden">
      <img
        src={formatsBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Plus de <span className="text-secondary font-semibold">40 formats</span> supportés
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {formats.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="glass rounded-xl px-4 py-2 text-sm font-mono font-medium"
            >
              .{f.toLowerCase()}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
