interface MultilingualText {
  id: string;
  en: string;
}

interface FaqItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
}

interface FaqsResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FaqItem[];
}
