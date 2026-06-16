export interface PortfolioItem {
  title: string;
  image: string;
  stats?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  promo?: string;
  features: string[];
  iconName: string;
  portfolio?: PortfolioItem[];
}

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  date: string;
}

export interface User {
  name: string;
  email: string;
  company?: string;
}
