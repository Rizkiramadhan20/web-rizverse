export interface LocalizedText {
  en: string;
  id: string;
}

export interface PriceListItem {
  title: LocalizedText;
}

export interface PriceItem {
  id: string;
  title: LocalizedText;
  originalPrice: string;
  labelDisc: LocalizedText | null;
  discount: string | null;
  list: PriceListItem[];
  paket_up?: string;
}

export interface PriceResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: PriceItem[];
}
