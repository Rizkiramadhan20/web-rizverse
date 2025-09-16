interface LocalizedText {
  en: string;
  id: string;
}

interface BannerButton {
  href: string;
  label: LocalizedText;
}

interface BannerItem {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
  image: string;
  button: BannerButton[];
}

interface BannerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: BannerItem[];
}

type ImageLayoutProps = {
  bannerData: BannerItem
  currentLocale: 'id' | 'en'
}

type TextLayoutProps = {
  bannerData: BannerItem
  currentLocale: 'id' | 'en'
}