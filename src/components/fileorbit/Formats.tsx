import { motion } from "framer-motion";

const formats = ["PDF", "DOCX", "XLSX", "PPTX", "JPG", "PNG", "WEBP", "HEIC", "SVG", "TXT", "EPUB", "MD", "CSV", "ZIP"];

export function Formats() {
  return (
    <section className="relative py-20 px-4 sm:px-6 border-y border-border">
      <div className="mx-auto max-w-6xl text-center">
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
