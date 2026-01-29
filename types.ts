
export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  isCore?: boolean;
  twitter?: string;
  github?: string;
}

export interface STEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  isFeatured?: boolean;
  type: string;
}

export interface Metric {
  label: string;
  value: string;
  color: 'verde' | 'amarelo' | 'azul';
}
