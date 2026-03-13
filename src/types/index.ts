export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  visible?: boolean;
}

export interface PortalSettings {
  columns: 2 | 3 | 4 | 5;
}