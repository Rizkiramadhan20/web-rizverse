type Locale = "id" | "en";

interface TranslatedText {
  id: string;
  en: string;
}

interface FeatureEntry {
  title: TranslatedText;
  description: TranslatedText;
}

interface FeaturedItem {
  id: string;
  title: TranslatedText;
  text: TranslatedText;
  image: string;
  features: FeatureEntry[];
}

interface FeaturedResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FeaturedItem[];
}

type ImageFeaturdProps = {
  featuredData: FeaturedItem
  currentLocale: 'id' | 'en'
}

type TextFeaturedProps = {
  featuredData: FeaturedItem
  currentLocale: 'id' | 'en'
}
