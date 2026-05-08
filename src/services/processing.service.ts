import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { ProcessingJob, ToolDefinition } from "@/types/jobs";

export const supportedTools: ToolDefinition[] = [
  {
    slug: "pdf-merge",
    title: "Merge PDF",
    description: "Combinez plusieurs PDF dans un seul document.",
    category: "pdf",
    tool: "PDF_MERGE",
    acceptsMultiple: true,
  },
  {
    slug: "pdf-split",
    title: "Split PDF",
    description: "Découpez un PDF par pages ou par plage.",
    category: "pdf",
    tool: "PDF_SPLIT",
    acceptsMultiple: false,
  },
  {
    slug: "pdf-rotate",
    title: "Rotate PDF",
    description: "Faites pivoter un PDF complet ou une plage de pages.",
    category: "pdf",
    tool: "PDF_ROTATE",
    acceptsMultiple: false,
  },
  {
    slug: "pdf-to-images",
    title: "PDF to Images",
    description: "Transformez un PDF en images PNG ou JPG.",
    category: "pdf",
    tool: "PDF_TO_IMAGES",
    acceptsMultiple: false,
  },
  {
    slug: "images-to-pdf",
    title: "Images to PDF",
    description: "Assemblez plusieurs images dans un PDF.",
    category: "pdf",
    tool: "IMAGES_TO_PDF",
    acceptsMultiple: true,
  },
  {
    slug: "image-convert",
    title: "Convert Image",
    description: "Convertissez une image vers un autre format.",
    category: "image",
    tool: "IMAGE_CONVERT",
    acceptsMultiple: false,
  },
  {
    slug: "image-resize",
    title: "Resize Image",
    description: "Redimensionnez une image avec options de ratio.",
    category: "image",
    tool: "IMAGE_RESIZE",
    acceptsMultiple: false,
  },
  {
    slug: "image-compress",
    title: "Compress Image",
    description: "Réduisez le poids d’une image en conservant le design actuel.",
    category: "image",
    tool: "IMAGE_COMPRESS",
    acceptsMultiple: false,
  },
  {
    slug: "image-rotate-flip",
    title: "Rotate or Flip Image",
    description: "Faites pivoter ou retourner une image.",
    category: "image",
    tool: "IMAGE_ROTATE_FLIP",
    acceptsMultiple: false,
  },
];

export interface ImagesToPdfPayload {
  files: File[];
  pageSize?: string;
  orientation?: "portrait" | "landscape";
  background?: string;
}

export interface ImageConvertPayload {
  file: File;
  outputFormat: "webp" | "png" | "jpeg";
  quality?: number;
  background?: string;
}

export const getToolBySlug = (slug: string) =>
  supportedTools.find((tool) => tool.slug === slug) ?? null;

export const processingService = {
  getSupportedTools() {
    return supportedTools;
  },
  submitPdfMerge(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    return api.post<ProcessingJob>(endpoints.processing.pdfMerge, formData);
  },
  submitImagesToPdf(payload: ImagesToPdfPayload) {
    const formData = new FormData();

    payload.files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("page_size", payload.pageSize ?? "auto");
    formData.append("orientation", payload.orientation ?? "portrait");
    formData.append("background", payload.background ?? "#ffffff");

    return api.post<ProcessingJob>(endpoints.processing.imagesToPdf, formData);
  },
  submitImageConvert(payload: ImageConvertPayload) {
    const formData = new FormData();

    formData.append("file", payload.file);
    formData.append("output_format", payload.outputFormat);
    formData.append("quality", String(payload.quality ?? 85));
    formData.append("background", payload.background ?? "#ffffff");

    return api.post<ProcessingJob>(endpoints.processing.imageConvert, formData);
  },
};
