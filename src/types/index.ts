export interface Platform {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface PortalData {
  platforms: Platform[];
  lastUpdated: string;
}

export type PlatformFormData = Omit<Platform, 'id' | 'order'>;
