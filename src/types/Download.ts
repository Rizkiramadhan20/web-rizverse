export interface DownloadItem {
  id: string;
  version: string;
  file: string;
  type: string;
  createdAt: string;
}

export interface DownloadResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: DownloadItem[];
}
