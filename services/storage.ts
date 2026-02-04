
import { DefenseLocation, Equipment } from '../types';
import { INITIAL_LOCATIONS, INITIAL_EQUIPMENT } from '../constants';

const LOCATIONS_KEY = 'def_fire_locations';
const EQUIPMENT_KEY = 'def_fire_equipment';

export const getStoredLocations = (): DefenseLocation[] => {
  const stored = localStorage.getItem(LOCATIONS_KEY);
  return stored ? JSON.parse(stored) : INITIAL_LOCATIONS;
};

export const saveLocations = (locations: DefenseLocation[]) => {
  localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
};

export const getStoredEquipment = (): Equipment[] => {
  const stored = localStorage.getItem(EQUIPMENT_KEY);
  return stored ? JSON.parse(stored) : INITIAL_EQUIPMENT;
};

export const saveEquipment = (equipment: Equipment[]) => {
  localStorage.setItem(EQUIPMENT_KEY, JSON.stringify(equipment));
};
