export type ProcessingJobStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED";

export type ProcessingTool =
  | "PDF_MERGE"
  | "PDF_SPLIT"
  | "PDF_ROTATE"
  | "PDF_TO_IMAGES"
  | "IMAGES_TO_PDF"
  | "IMAGE_CONVERT"
  | "IMAGE_RESIZE"
  | "IMAGE_COMPRESS"
  | "IMAGE_ROTATE_FLIP";

export interface ProcessingJob {
  id: string;
  tool: ProcessingTool;
  status: ProcessingJobStatus;
  original_filename: string;
  input_size: number;
  output_size: number;
  options: Record<string, unknown>;
  error_message: string;
  download_url: string | null;
  created_at: string;
  completed_at: string | null;
  expires_at: string | null;
}

export interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  category: "pdf" | "image";
  tool: ProcessingTool;
  acceptsMultiple: boolean;
}
