export interface MultilingualText {
  id: string;
  en: string;
}

export interface FaqItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
}

export interface FaqsResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FaqItem[];
}
