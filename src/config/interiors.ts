import { InteriorConfig } from '../App';

export const INTERIOR_CONFIGS: InteriorConfig[] = [
  // TRECC Interiors
  {
    id: 'trecc-command',
    name: 'Command Post',
    description: 'Advanced command post with integrated power, HVAC, display systems, and deployable workstations.',
    modelPath: '/models/interiors/trecc-command.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-medical',
    name: 'Medical Unit',
    description: 'Field hospital with surgical capabilities, patient care areas, and medical equipment integration.',
    modelPath: '/models/interiors/trecc-medical.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-living',
    name: 'Living Quarters',
    description: 'Comfortable living quarters with sleeping areas, dining facilities, and recreational space.',
    modelPath: '/models/interiors/trecc-living.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-communications',
    name: 'Communications Hub',
    description: 'Advanced communications center with satellite systems, radio equipment, and network infrastructure.',
    modelPath: '/models/interiors/trecc-communications.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-storage',
    name: 'Equipment Storage',
    description: 'Secure storage facility with climate control, inventory management, and equipment maintenance areas.',
    modelPath: '/models/interiors/trecc-storage.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-kitchen',
    name: 'Field Kitchen',
    description: 'Mobile kitchen with cooking facilities, food storage, and dining areas.',
    modelPath: '/models/interiors/trecc-kitchen.glb',
    category: 'trecc'
  },
  {
    id: 'trecc-drone-manufacturing',
    name: 'Drone Manufacturing',
    description: 'Advanced drone manufacturing facility with assembly lines, testing equipment, and quality control systems.',
    modelPath: '/models/interiors/trecc-drone-manufacturing.glb',
    category: 'trecc'
  },

  // MTS Interiors
  {
    id: 'mts-standard',
    name: 'Standard Configuration',
    description: 'Standard MTS configuration for general field applications.',
    modelPath: '/models/interiors/mts-standard.glb',
    category: 'mts'
  },
  {
    id: 'mts-medical',
    name: 'Medical Facility',
    description: 'Medical facility configuration with surgical suites, patient care areas, and medical equipment.',
    modelPath: '/models/interiors/mts-medical.glb',
    category: 'mts'
  },

  // Series Interiors
  {
    id: 'series-standard',
    name: 'Standard Configuration',
    description: 'Standard Series shelter configuration for workforce housing and military accommodation.',
    modelPath: '/models/interiors/series-standard.glb',
    category: 'series'
  },
  {
    id: 'series-tropical',
    name: 'Tropical Configuration',
    description: 'Tropical version with side windows for maximum ventilation in hot environments.',
    modelPath: '/models/interiors/series-tropical.glb',
    category: 'series'
  },
  {
    id: 'series-shop',
    name: 'Shop Configuration',
    description: 'Extended-height structure ideal for applications requiring additional vertical space.',
    modelPath: '/models/interiors/series-shop.glb',
    category: 'series'
  },

  // MEX-26 Interiors
  {
    id: 'mex26-maintenance',
    name: 'Maintenance Facility',
    description: 'Specialized maintenance facility for armoured vehicle and helicopter maintenance.',
    modelPath: '/models/interiors/mex26-maintenance.glb',
    category: 'mex'
  },

  // Polar Interiors
  {
    id: 'polar-standard',
    name: 'Standard Configuration',
    description: 'Standard polar shelter configuration for extreme cold environments.',
    modelPath: '/models/interiors/polar-standard.glb',
    category: 'polar'
  },

  // RDMSS Interiors
  {
    id: 'rdmss-standard',
    name: 'Standard Configuration',
    description: 'Standard RDMSS configuration for rapid deployment applications.',
    modelPath: '/models/interiors/rdmss-standard.glb',
    category: 'rdmss'
  },

  // ATEPS Interiors
  {
    id: 'ateps-standard',
    name: 'Standard Configuration',
    description: 'Standard ATEPS configuration for forward operating bases and medical facilities.',
    modelPath: '/models/interiors/ateps-standard.glb',
    category: 'ateps'
  },

  // MECC Interiors
  {
    id: 'mecc-standard',
    name: 'Standard Configuration',
    description: 'Standard MECC configuration combining fabric shelter technology with ISO container standard.',
    modelPath: '/models/interiors/mecc-standard.glb',
    category: 'mecc'
  },

  // HERCON Interiors
  {
    id: 'hercon-standard',
    name: 'Standard Configuration',
    description: 'Standard HERCON configuration for hard-walled expandable container applications.',
    modelPath: '/models/interiors/hercon-standard.glb',
    category: 'hercon'
  }
];

export const getInteriorsForShelter = (shelterCategory: string): InteriorConfig[] => {
  return INTERIOR_CONFIGS.filter(interior => interior.category === shelterCategory);
};
