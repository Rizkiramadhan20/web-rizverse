export interface Feature {
  title: string;
  description: string;
}

export interface FeaturedItem {
  id: string;
  title: string;
  text: string;
  image: string;
  features: Feature[];
}

export interface FeaturedResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: FeaturedItem[];
}
