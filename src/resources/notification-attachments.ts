/**
 * Notification Attachments API
 */

import type { HarnessClient } from '../client.js';

export interface NotificationAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  url: string;
}

export class NotificationAttachmentsAPI {
  constructor(private client: HarnessClient) {}

  async upload(file: Blob, fileName: string): Promise<NotificationAttachment> {
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.client.post<NotificationAttachment>('/notifications/attachments/upload', formData);
  }

  async get(attachmentId: string): Promise<NotificationAttachment> {
    return this.client.get<NotificationAttachment>(`/notifications/attachments/${attachmentId}`);
  }

  async delete(attachmentId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/notifications/attachments/${attachmentId}`);
  }
}
