import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { ProcessingJob } from "@/types/jobs";

export const jobsService = {
  list() {
    return api.get<ProcessingJob[]>(endpoints.processing.jobs);
  },
  get(jobId: string) {
    return api.get<ProcessingJob>(endpoints.processing.jobDetail(jobId));
  },
};
