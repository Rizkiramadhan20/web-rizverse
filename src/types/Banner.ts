export interface LocalizedText {
  en: string;
  id: string;
}

export interface BannerButton {
  href: string;
  label: LocalizedText;
}

export interface BannerItem {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
  image: string;
  button: BannerButton[];
}

export interface BannerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: BannerItem[];
}
