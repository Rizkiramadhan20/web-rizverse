export interface FaqItem {
  id: string;
  title: string;
  description: string;
}

export interface FaqsResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FaqItem[];
}
