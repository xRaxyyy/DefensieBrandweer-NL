
export interface DefenseLocation {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  type: string;
  yearFrom: string;
  yearTo: string;
  description: string;
  imageUrl: string;
  galleryImages: string[]; // Added gallery support
  lat: number;
  lng: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  year: string;
  description: string;
  imageUrl: string;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
}

export enum EquipmentCategory {
  BLUSMIDDELEN = 'Blusmiddelen',
  VOERTUIGEN = 'Rollend Materieel',
  OVERIGE = 'Overige'
}

export type ViewMode = 'list' | 'map';
