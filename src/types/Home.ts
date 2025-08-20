export interface MultilingualText {
  id: string;
  en: string;
}

export interface Button {
  label: MultilingualText;
  href: string;
}

export interface HomeItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  image: string[];
  button: Button[];
}

export interface HomeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: HomeItem[];
}
