import { apiClient } from './api';
import type { DetectionResult } from '@/types';

export const detectionService = {
  async detect(file: File): Promise<DetectionResult> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.postForm<DetectionResult>('/detect', formData);
  },
};
