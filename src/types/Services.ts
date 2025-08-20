export interface MultilingualText {
  en: string;
  id: string;
}

export interface ServiceItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  image: string;
}

export interface ServicesResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: ServiceItem[];
}
