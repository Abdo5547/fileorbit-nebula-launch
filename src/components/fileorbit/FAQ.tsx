import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Mes fichiers sont-ils stockés sur vos serveurs ?", a: "Non. Tous les fichiers sont automatiquement supprimés après le traitement. Vos données ne quittent jamais nos serveurs européens chiffrés." },
  { q: "Quels formats sont supportés ?", a: "Plus de 40 formats : PDF, DOCX, XLSX, PPTX, JPG, PNG, WEBP, HEIC, SVG, EPUB, et bien d'autres encore." },
  { q: "Y a-t-il une limite de taille ?", a: "25 MB en version gratuite, jusqu'à 5 GB par fichier en plan Pro, et 10 GB en plan Team." },
  { q: "Puis-je utiliser FileOrbit sans inscription ?", a: "Oui, la majorité des outils sont accessibles instantanément sans compte. La création d'un compte permet d'historiser vos conversions." },
  { q: "Proposez-vous une API ?", a: "Oui, une API REST est incluse dans le plan Team avec quotas généreux et SDK Node, Python, Go." },
];

export function FAQ() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-gradient">Questions fréquentes</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Tout ce que vous voulez savoir</h2>
        </motion.div>
        <Accordion type="single" collapsible className="glass rounded-2xl px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
