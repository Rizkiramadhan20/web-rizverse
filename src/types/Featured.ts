export type Locale = "id" | "en";

export interface TranslatedText {
  id: string;
  en: string;
}

export interface FeatureEntry {
  title: TranslatedText;
  description: TranslatedText;
}

export interface FeaturedItem {
  id: string;
  title: TranslatedText;
  text: TranslatedText;
  image: string;
  features: FeatureEntry[];
}

export interface FeaturedResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FeaturedItem[];
}
