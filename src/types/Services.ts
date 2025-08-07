export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: ServiceItem[];
}
