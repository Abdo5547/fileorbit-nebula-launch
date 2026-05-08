import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useProcessingJob } from "@/hooks/useProcessingJob";
import { getToolBySlug } from "@/services/processing.service";

export const Route = createFileRoute("/tools/$toolSlug")({
  component: ToolRoute,
  head: ({ params }) => ({
    meta: [{ title: `${params.toolSlug} | FileOrbit` }],
  }),
});

function ToolRoute() {
  const { toolSlug } = Route.useParams();
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold">Outil introuvable</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Ce slug n’est pas aligné avec le catalogue backend actuel.
          </p>
          <Link to="/dashboard" className="mt-6 inline-flex font-medium text-secondary">
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-medium text-gradient">Outil connecté au backend</p>
        <h1 className="mt-3 text-4xl font-semibold">{tool.title}</h1>
        <p className="mt-4 text-muted-foreground">{tool.description}</p>

        {tool.slug === "pdf-merge" ? <PdfMergePanel /> : <ComingSoonPanel />}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground"
          >
            Voir l’historique
          </Link>
          <Link to="/" className="rounded-xl border border-white/10 px-4 py-3 font-medium">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComingSoonPanel() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-5">
      <p className="text-sm font-medium">Connexion en cours</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Cette page est prête pour recevoir le vrai flux d’upload, le suivi du traitement et le téléchargement.
      </p>
    </div>
  );
}

function PdfMergePanel() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { pdfMerge } = useFileProcessing();
  const jobQuery = useProcessingJob(activeJobId);

  const currentJob = jobQuery.data ?? pdfMerge.data ?? null;
  const canSubmit = selectedFiles.length >= 2 && !pdfMerge.isPending;

  const totalSizeLabel = useMemo(() => {
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return new Intl.NumberFormat("fr-FR", {
      style: "unit",
      unit: "megabyte",
      maximumFractionDigits: 2,
    }).format(totalSize / (1024 * 1024));
  }, [selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? []);
    setSelectedFiles(nextFiles);
    setFormError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (selectedFiles.length < 2) {
      setFormError("Ajoute au moins deux PDF pour lancer une fusion.");
      return;
    }

    try {
      const job = await pdfMerge.mutateAsync(selectedFiles);
      setActiveJobId(job.id);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Impossible de lancer la fusion pour le moment.",
      );
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-background/50 p-5">
        <h2 className="text-lg font-semibold">Fusionner des PDF</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Premier flux branché au backend: envoi multi-fichiers vers `/api/processing/pdf/merge/`.
        </p>

        <label className="mt-6 block rounded-2xl border border-dashed border-white/10 p-5">
          <span className="block text-sm font-medium">Sélectionne les fichiers PDF</span>
          <span className="mt-2 block text-sm text-muted-foreground">
            Deux fichiers minimum. L’ordre de sélection sera l’ordre d’envoi.
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="mt-4 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-xl file:border-0 file:bg-cosmic file:px-4 file:py-2 file:font-medium file:text-primary-foreground"
          />
        </label>

        <div className="mt-5 space-y-3">
          {selectedFiles.map((file) => (
            <div key={`${file.name}-${file.size}`} className="rounded-xl border border-white/10 px-4 py-3">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Intl.NumberFormat("fr-FR", {
                  style: "unit",
                  unit: "megabyte",
                  maximumFractionDigits: 2,
                }).format(file.size / (1024 * 1024))}
              </p>
            </div>
          ))}
        </div>

        {selectedFiles.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            {selectedFiles.length} fichier(s) sélectionné(s) · {totalSizeLabel}
          </p>
        )}

        {(formError || pdfMerge.error) && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {formError ?? pdfMerge.error?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pdfMerge.isPending ? "Fusion en cours..." : "Lancer la fusion"}
        </button>
      </form>

      <section className="rounded-2xl border border-white/10 bg-background/50 p-5">
        <h2 className="text-lg font-semibold">Suivi du job</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Le panneau suit l’état du job et expose le téléchargement quand le backend le renvoie.
        </p>

        {!currentJob && (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-muted-foreground">
            Lance une fusion pour afficher le retour backend ici.
          </div>
        )}

        {currentJob && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-white/10 px-4 py-4">
              <p className="text-xs text-muted-foreground">Job ID</p>
              <p className="mt-1 break-all text-sm font-medium">{currentJob.id}</p>
            </div>
            <div className="rounded-xl border border-white/10 px-4 py-4">
              <p className="text-xs text-muted-foreground">Statut</p>
              <p className="mt-1 text-sm font-medium">{currentJob.status}</p>
            </div>
            {currentJob.error_message && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                {currentJob.error_message}
              </div>
            )}
            {currentJob.download_url && (
              <a
                href={currentJob.download_url}
                className="inline-flex rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition hover:opacity-90"
              >
                Télécharger le PDF fusionné
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
