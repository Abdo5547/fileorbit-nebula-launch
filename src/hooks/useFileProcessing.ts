import { useMutation } from "@tanstack/react-query";
import { processingService } from "@/services/processing.service";

export function useFileProcessing() {
  const pdfMergeMutation = useMutation({
    mutationFn: processingService.submitPdfMerge,
  });

  return {
    pdfMerge: pdfMergeMutation,
  };
}
