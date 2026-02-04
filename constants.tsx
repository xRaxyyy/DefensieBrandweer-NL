
import { DefenseLocation, Equipment, EquipmentCategory } from './types';

export const INITIAL_LOCATIONS: DefenseLocation[] = [
  {
    id: '1',
    name: 'Genie Park / Genie Complex',
    city: 'Alphen aan de Rijn',
    province: 'Zuid-Holland',
    country: 'NL',
    type: 'Militair complex',
    yearFrom: '1954',
    yearTo: '1981',
    description: 'Historisch militair complex dat diende als belangrijke basis voor de genie-eenheden.',
    imageUrl: 'https://picsum.photos/seed/loc1/800/600',
    galleryImages: [],
    lat: 52.129,
    lng: 4.655
  },
  {
    id: '2',
    name: 'Kamp / Munitie Complex',
    city: 'Alphen NB',
    province: 'Noord-Brabant',
    country: 'NL',
    type: 'Munitie-opslagplaats',
    yearFrom: '1954',
    yearTo: 'Heden',
    description: 'Operationeel complex voor de veilige opslag van munitie en logistieke ondersteuning.',
    imageUrl: 'https://picsum.photos/seed/loc2/800/600',
    galleryImages: [],
    lat: 51.483,
    lng: 4.950
  },
  {
    id: '3',
    name: 'Vliegbasis Amendola',
    city: 'Amendola',
    province: 'Foggia',
    country: 'IT',
    type: 'Vliegbasis',
    yearFrom: '1999',
    yearTo: '2001',
    description: 'Inzetlocatie voor de Nederlandse luchtmacht tijdens internationale missies in Italië.',
    imageUrl: 'https://picsum.photos/seed/loc3/800/600',
    galleryImages: [],
    lat: 41.538,
    lng: 15.712
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'e1',
    name: 'Poederblusser 50 kg',
    category: EquipmentCategory.BLUSMIDDELEN,
    year: '1980',
    description: 'Verrijdbare poederblusser voor grote vloeistofbranden.',
    imageUrl: 'https://picsum.photos/seed/eq1/800/600',
    technicalSpecs: [
      { label: 'Inhoud', value: '50 kg ABC-poeder' },
      { label: 'Bereik', value: '8-10 meter' }
    ]
  },
  {
    id: 'e2',
    name: 'E-One Titan HPR',
    category: EquipmentCategory.VOERTUIGEN,
    year: '2015',
    description: 'Groot schuimblusvoertuig (CRASH-tender) voor vliegveldbestrijding.',
    imageUrl: 'https://picsum.photos/seed/eq2/800/600',
    technicalSpecs: [
      { label: 'Motor', value: 'Cummins QSX15' },
      { label: 'Watertank', value: '12.000 liter' }
    ]
  }
];
