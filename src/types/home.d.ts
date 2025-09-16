interface MultilingualText {
  id: string;
  en: string;
}

interface Button {
  label: MultilingualText;
  href: string;
}

interface HomeItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  image: string[];
  button: Button[];
}

interface HomeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: HomeItem[];
}

interface ImageCardProps {
  src: string
  alt: string
  priority?: boolean
  quality?: number
  className?: string
}

interface TextContentProps {
  title: string
  description: string
  buttons: LocalizedButton[]
}