export interface Button {
  label: string;
  href: string;
}

export interface HomeItem {
  id: string;
  title: string;
  description: string;
  image: string;
  button: Button[];
}

export interface HomeResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: HomeItem[];
}
