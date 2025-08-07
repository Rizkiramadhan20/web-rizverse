export interface BannerButton {
  href: string;
  label: string;
}

export interface BannerItem {
  id: string;
  title: string;
  text: string;
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
