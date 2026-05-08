import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useProcessingJob } from "@/hooks/useProcessingJob";
import { getToolBySlug } from "@/services/processing.service";
import type { ProcessingJob } from "@/types/jobs";

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
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-medium text-gradient">Outil connecté au backend</p>
        <h1 className="mt-3 text-4xl font-semibold">{tool.title}</h1>
        <p className="mt-4 text-muted-foreground">{tool.description}</p>

        {tool.slug === "pdf-merge" && <PdfMergePanel />}
        {tool.slug === "images-to-pdf" && <ImagesToPdfPanel />}
        {tool.slug === "image-convert" && <ImageConvertPanel />}
        {tool.slug !== "pdf-merge" && tool.slug !== "images-to-pdf" && tool.slug !== "image-convert" && (
          <ComingSoonPanel />
        )}

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
          Envoi multi-fichiers vers `/api/processing/pdf/merge/`.
        </p>

        <FilePicker
          label="Sélectionne les fichiers PDF"
          hint="Deux fichiers minimum. L’ordre de sélection sera l’ordre d’envoi."
          accept="application/pdf"
          multiple
          onFilesSelected={setSelectedFiles}
        />

        <FileList files={selectedFiles} />
        <SelectionSummary files={selectedFiles} />
        <ErrorMessage message={formError ?? pdfMerge.error?.message ?? null} />

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pdfMerge.isPending ? "Fusion en cours..." : "Lancer la fusion"}
        </button>
      </form>

      <JobStatusPanel
        job={currentJob}
        idleMessage="Lance une fusion pour afficher le retour backend ici."
        downloadLabel="Télécharger le PDF fusionné"
      />
    </div>
  );
}

function ImagesToPdfPanel() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [pageSize, setPageSize] = useState("auto");
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { imagesToPdf } = useFileProcessing();
  const jobQuery = useProcessingJob(activeJobId);

  const currentJob = jobQuery.data ?? imagesToPdf.data ?? null;
  const canSubmit = selectedFiles.length >= 1 && !imagesToPdf.isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (selectedFiles.length === 0) {
      setFormError("Ajoute au moins une image pour générer le PDF.");
      return;
    }

    try {
      const job = await imagesToPdf.mutateAsync({
        files: selectedFiles,
        orientation,
        pageSize,
      });
      setActiveJobId(job.id);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Impossible de lancer la conversion pour le moment.",
      );
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-background/50 p-5">
        <h2 className="text-lg font-semibold">Images vers PDF</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Envoi multi-images vers `/api/processing/pdf/images-to-pdf/`.
        </p>

        <FilePicker
          label="Sélectionne les images"
          hint="JPG, PNG ou WebP. Une ou plusieurs images peuvent être envoyées."
          accept="image/png,image/jpeg,image/webp"
          multiple
          onFilesSelected={setSelectedFiles}
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Orientation</span>
            <select
              value={orientation}
              onChange={(event) => setOrientation(event.target.value as "portrait" | "landscape")}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Format de page</span>
            <select
              value={pageSize}
              onChange={(event) => setPageSize(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
            >
              <option value="auto">Auto</option>
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </label>
        </div>

        <FileList files={selectedFiles} />
        <SelectionSummary files={selectedFiles} />
        <ErrorMessage message={formError ?? imagesToPdf.error?.message ?? null} />

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {imagesToPdf.isPending ? "Génération en cours..." : "Créer le PDF"}
        </button>
      </form>

      <JobStatusPanel
        job={currentJob}
        idleMessage="Ajoute une ou plusieurs images pour générer un PDF." 
        downloadLabel="Télécharger le PDF généré"
      />
    </div>
  );
}

function ImageConvertPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"webp" | "png" | "jpeg">("webp");
  const [quality, setQuality] = useState("85");
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { imageConvert } = useFileProcessing();
  const jobQuery = useProcessingJob(activeJobId);

  const currentJob = jobQuery.data ?? imageConvert.data ?? null;
  const canSubmit = Boolean(selectedFile) && !imageConvert.isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!selectedFile) {
      setFormError("Ajoute une image avant de lancer la conversion.");
      return;
    }

    try {
      const job = await imageConvert.mutateAsync({
        file: selectedFile,
        outputFormat,
        quality: Number(quality),
      });
      setActiveJobId(job.id);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Impossible de convertir l’image pour le moment.",
      );
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-background/50 p-5">
        <h2 className="text-lg font-semibold">Convertir une image</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Envoi simple vers `/api/processing/images/convert/`.
        </p>

        <FilePicker
          label="Sélectionne une image"
          hint="Un seul fichier est envoyé au backend pour cette opération."
          accept="image/png,image/jpeg,image/webp"
          onFilesSelected={(files) => setSelectedFile(files[0] ?? null)}
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Format de sortie</span>
            <select
              value={outputFormat}
              onChange={(event) => setOutputFormat(event.target.value as "webp" | "png" | "jpeg")}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
            >
              <option value="webp">WEBP</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Qualité</span>
            <input
              type="number"
              min="1"
              max="100"
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-secondary"
            />
          </label>
        </div>

        <FileList files={selectedFile ? [selectedFile] : []} />
        <SelectionSummary files={selectedFile ? [selectedFile] : []} />
        <ErrorMessage message={formError ?? imageConvert.error?.message ?? null} />

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 rounded-xl bg-cosmic px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {imageConvert.isPending ? "Conversion en cours..." : "Convertir l’image"}
        </button>
      </form>

      <JobStatusPanel
        job={currentJob}
        idleMessage="Ajoute une image et choisis un format de sortie pour démarrer."
        downloadLabel="Télécharger l’image convertie"
      />
    </div>
  );
}

function FilePicker({
  label,
  hint,
  accept,
  multiple = false,
  onFilesSelected,
}: {
  label: string;
  hint: string;
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilesSelected(Array.from(event.target.files ?? []));
  };

  return (
    <label className="mt-6 block rounded-2xl border border-dashed border-white/10 p-5">
      <span className="block text-sm font-medium">{label}</span>
      <span className="mt-2 block text-sm text-muted-foreground">{hint}</span>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="mt-4 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-xl file:border-0 file:bg-cosmic file:px-4 file:py-2 file:font-medium file:text-primary-foreground"
      />
    </label>
  );
}

function FileList({ files }: { files: File[] }) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 space-y-3">
      {files.map((file) => (
        <div key={`${file.name}-${file.size}`} className="rounded-xl border border-white/10 px-4 py-3">
          <p className="text-sm font-medium">{file.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
        </div>
      ))}
    </div>
  );
}

function SelectionSummary({ files }: { files: File[] }) {
  const totalSizeLabel = useMemo(() => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    return formatFileSize(totalSize);
  }, [files]);

  if (files.length === 0) {
    return null;
  }

  return (
    <p className="mt-4 text-xs text-muted-foreground">
      {files.length} fichier(s) sélectionné(s) · {totalSizeLabel}
    </p>
  );
}

function ErrorMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </p>
  );
}

function JobStatusPanel({
  job,
  idleMessage,
  downloadLabel,
}: {
  job: ProcessingJob | null;
  idleMessage: string;
  downloadLabel: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-background/50 p-5">
      <h2 className="text-lg font-semibold">Suivi du job</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Le panneau suit l’état du job et expose le téléchargement quand le backend le renvoie.
      </p>

      {!job && (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-muted-foreground">
          {idleMessage}
        </div>
      )}

      {job && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-white/10 px-4 py-4">
            <p className="text-xs text-muted-foreground">Job ID</p>
            <p className="mt-1 break-all text-sm font-medium">{job.id}</p>
          </div>
          <div className="rounded-xl border border-white/10 px-4 py-4">
            <p className="text-xs text-muted-foreground">Statut</p>
            <p className="mt-1 text-sm font-medium">{job.status}</p>
          </div>
          {job.error_message && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-200">
              {job.error_message}
            </div>
          )}
          {job.download_url && (
            <a
              href={job.download_url}
              className="inline-flex rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition hover:opacity-90"
            >
              {downloadLabel}
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function formatFileSize(size: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "unit",
    unit: "megabyte",
    maximumFractionDigits: 2,
  }).format(size / (1024 * 1024));
}
