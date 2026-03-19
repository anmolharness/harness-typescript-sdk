/**
 * Cloud Cost Perspective Reports API
 */

import type { HarnessClient } from '../client.js';

export interface PerspectiveReport {
  id: string;
  name: string;
  perspectiveId: string;
  format: 'PDF' | 'CSV' | 'EXCEL';
  schedule?: {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    recipients: string[];
  };
}

export class CloudCostPerspectiveReportsAPI {
  constructor(private client: HarnessClient) {}

  async list(perspectiveId: string): Promise<PerspectiveReport[]> {
    return this.client.get<PerspectiveReport[]>(`/ccm/api/perspective/${perspectiveId}/reports`);
  }

  async create(perspectiveId: string, data: Partial<PerspectiveReport>): Promise<PerspectiveReport> {
    return this.client.post<PerspectiveReport>(`/ccm/api/perspective/${perspectiveId}/reports`, data);
  }

  async download(reportId: string): Promise<Blob> {
    return this.client.get<Blob>(`/ccm/api/perspective/reports/${reportId}/download`);
  }
}
