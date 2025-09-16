interface LocalizedText {
  en: string;
  id: string;
}

interface PriceListItem {
  title: LocalizedText;
}

interface PriceItem {
  id: string;
  title: LocalizedText;
  originalPrice: string;
  labelDisc: LocalizedText | null;
  discount: string | null;
  list: PriceListItem[];
  paket_up?: string;
}

interface PriceResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: PriceItem[];
}


interface PriceCardProps {
  item: PriceItem
  index: number
  currentLocale: 'id' | 'en'
}