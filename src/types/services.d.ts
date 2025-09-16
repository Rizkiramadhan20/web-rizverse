interface MultilingualText {
  en: string;
  id: string;
}

interface ServiceItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  image: string;
}

interface ServicesResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: ServiceItem[];
}

type ServiceCardProps = {
  item: ServiceItem
  locale: 'id' | 'en'
}
