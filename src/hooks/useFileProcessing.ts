import { useMutation } from "@tanstack/react-query";
import { processingService } from "@/services/processing.service";

export function useFileProcessing() {
  const pdfMergeMutation = useMutation({
    mutationFn: processingService.submitPdfMerge,
  });

  const imagesToPdfMutation = useMutation({
    mutationFn: processingService.submitImagesToPdf,
  });

  const imageConvertMutation = useMutation({
    mutationFn: processingService.submitImageConvert,
  });

  return {
    pdfMerge: pdfMergeMutation,
    imagesToPdf: imagesToPdfMutation,
    imageConvert: imageConvertMutation,
  };
}
