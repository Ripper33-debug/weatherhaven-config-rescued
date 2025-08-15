// Weatherhaven Knowledge Base for AI Assistant
// This file contains comprehensive information about Weatherhaven, TRECC, and related products

export interface WeatherhavenKnowledge {
  company: CompanyInfo;
  products: ProductInfo[];
  trecc: TRECCInfo;
  shelters: ShelterInfo[];
  applications: ApplicationInfo[];
  technical: TechnicalInfo;
  support: SupportInfo;
  useCases: UseCaseInfo[];
}

export interface CompanyInfo {
  name: string;
  founded: string;
  headquarters: string;
  description: string;
  mission: string;
  values: string[];
  globalPresence: string[];
  certifications: string[];
  achievements: string[];
}

export interface ProductInfo {
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, any>;
  useCases: string[];
  advantages: string[];
}

export interface TRECCInfo {
  fullName: string;
  description: string;
  keyFeatures: string[];
  specifications: Record<string, any>;
  deploymentTime: string;
  capacity: string;
  environments: string[];
  configurations: string[];
  advantages: string[];
  certifications: string[];
}

export interface ShelterInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  keyFeatures: string[];
  specifications: Record<string, any>;
  deploymentTime: string;
  capacity: string;
  environments: string[];
  configurations: string[];
  advantages: string[];
  disadvantages: string[];
  bestUseCases: string[];
  worstUseCases: string[];
  costRange: string;
  maintenanceLevel: string;
  certifications: string[];
  competitors: string[];
  uniqueSellingPoints: string[];
}

export interface ApplicationInfo {
  sector: string;
  description: string;
  useCases: string[];
  requirements: string[];
  benefits: string[];
}

export interface TechnicalInfo {
  materials: string[];
  construction: string[];
  environmental: string[];
  safety: string[];
  maintenance: string[];
}

export interface SupportInfo {
  services: string[];
  warranty: string;
  training: string[];
  documentation: string[];
  contact: string[];
}

export interface UseCaseInfo {
  scenario: string;
  description: string;
  requirements: string[];
  recommendedShelters: string[];
  alternativeShelters: string[];
  keyConsiderations: string[];
  estimatedCost: string;
  deploymentTime: string;
  maintenanceNeeds: string[];
}

export const weatherhavenKnowledge: WeatherhavenKnowledge = {
  company: {
    name: "Weatherhaven",
    founded: "1983",
    headquarters: "Vancouver, British Columbia, Canada",
    description: "Weatherhaven is the world's leading provider of deployable shelter systems for military, disaster response, remote industry, and research applications. We specialize in rapid deployment solutions that provide protection in the most extreme environments.",
    mission: "To provide innovative, reliable, and sustainable shelter solutions that enable human achievement in the world's most challenging environments.",
    values: [
      "Innovation in extreme environments",
      "Reliability and durability",
      "Rapid deployment capability",
      "Environmental sustainability",
      "Customer-focused solutions",
      "Global service and support"
    ],
    globalPresence: [
      "North America",
      "Europe",
      "Middle East",
      "Asia Pacific",
      "Africa",
      "South America"
    ],
    certifications: [
      "ISO 9001:2015 Quality Management",
      "ISO 14001:2015 Environmental Management",
      "OHSAS 18001:2007 Occupational Health and Safety",
      "NATO Stock Numbers (NSN)",
      "Military specifications compliance",
      "CE Marking for European markets"
    ],
    achievements: [
      "Over 40 years of innovation in deployable shelters",
      "Deployed in over 50 countries worldwide",
      "Trusted by military forces globally",
      "Emergency response partner for major disasters",
      "Research station provider for polar expeditions",
      "Industry leader in rapid deployment technology"
    ]
  },

  products: [
    {
      name: "TRECC (Tactical Redeployable Expandable Container Capability)",
      category: "Military & Tactical",
      description: "Advanced modular shelter system designed for rapid deployment in tactical military operations, providing command and control, medical, and support facilities.",
      features: [
        "Rapid deployment (under 30 minutes)",
        "Modular expandable design",
        "Extreme environment protection",
        "Integrated power and HVAC systems",
        "Secure communications infrastructure",
        "Multi-purpose interior configurations"
      ],
      specifications: {
        deploymentTime: "Under 30 minutes",
        capacity: "Up to 50 personnel",
        dimensions: "Expandable from 20ft to 40ft",
        weight: "Configurable based on requirements",
        power: "Integrated generator and solar options",
        climate: "-40°C to +60°C operation"
      },
      useCases: [
        "Military command and control centers",
        "Field hospitals and medical facilities",
        "Tactical operations centers",
        "Emergency response headquarters",
        "Remote research stations",
        "Disaster relief operations"
      ],
      advantages: [
        "Rapid deployment capability",
        "Extreme environment durability",
        "Modular and scalable design",
        "Integrated infrastructure",
        "Global logistics support",
        "Proven military reliability"
      ]
    },
    {
      name: "Field Hospital System",
      category: "Medical & Healthcare",
      description: "Complete medical facility solution for emergency response and routine care in remote locations.",
      features: [
        "Complete medical infrastructure",
        "Operating room capabilities",
        "Patient care areas",
        "Medical equipment integration",
        "Sterile environment maintenance",
        "Emergency power systems"
      ],
      specifications: {
        capacity: "20-100 patients",
        setupTime: "2-4 hours",
        medicalLevel: "Level 1-3 trauma care",
        power: "Redundant power systems",
        climate: "Controlled medical environment"
      },
      useCases: [
        "Disaster response medical care",
        "Military field hospitals",
        "Remote community healthcare",
        "Emergency medical response",
        "Humanitarian aid operations"
      ],
      advantages: [
        "Rapid medical facility deployment",
        "Complete medical infrastructure",
        "Flexible capacity scaling",
        "Global medical standards compliance",
        "Integrated medical equipment",
        "Emergency power redundancy"
      ]
    }
  ],

  trecc: {
    fullName: "Tactical Redeployable Expandable Container Capability",
    description: "TRECC is Weatherhaven's flagship tactical shelter system, designed for rapid deployment in military and emergency response operations. It provides a complete infrastructure solution in a compact, transportable package.",
    keyFeatures: [
      "Rapid deployment under 30 minutes",
      "Modular expandable design",
      "Extreme environment protection (-40°C to +60°C)",
      "Integrated power, HVAC, and communications",
      "Multi-purpose interior configurations",
      "Global logistics and support network"
    ],
    specifications: {
      baseDimensions: "20ft ISO container footprint",
      expandedDimensions: "Up to 40ft expanded length",
      deploymentTime: "Under 30 minutes with 4-person crew",
      capacity: "Up to 50 personnel",
      powerOutput: "Up to 20kW integrated power",
      climateControl: "Full HVAC system with filtration",
      communications: "Integrated secure communications",
      weight: "Configurable 5,000-15,000 kg"
    },
    deploymentTime: "Under 30 minutes with trained crew",
    capacity: "Up to 50 personnel depending on configuration",
    environments: [
      "Desert (up to +60°C)",
      "Arctic (down to -40°C)",
      "Tropical (high humidity)",
      "Mountain (high altitude)",
      "Coastal (salt spray)",
      "Urban (confined spaces)"
    ],
    configurations: [
      "Command and Control Center",
      "Medical Treatment Facility",
      "Tactical Operations Center",
      "Communications Hub",
      "Logistics Support Center",
      "Emergency Response Headquarters"
    ],
    advantages: [
      "Rapid deployment capability",
      "Extreme environment durability",
      "Modular and scalable design",
      "Integrated infrastructure",
      "Global logistics support",
      "Proven military reliability",
      "Cost-effective total ownership",
      "Flexible mission adaptation"
    ],
    certifications: [
      "Military specifications compliance",
      "NATO interoperability standards",
      "International safety standards",
      "Environmental protection compliance",
      "Quality management systems",
      "Global logistics certifications"
    ]
  },

  shelters: [
    {
      id: "trecc",
      name: "TRECC (Tactical Redeployable Expandable Container Capability)",
      category: "Military & Tactical",
      description: "Advanced modular shelter system for rapid deployment in tactical military operations and emergency response scenarios.",
      keyFeatures: [
        "Rapid deployment under 30 minutes",
        "Modular expandable design (20ft to 40ft)",
        "Extreme environment protection (-40°C to +60°C)",
        "Integrated power, HVAC, and communications",
        "Multi-purpose interior configurations",
        "Global logistics and support network"
      ],
      specifications: {
        baseDimensions: "20ft ISO container footprint",
        expandedDimensions: "Up to 40ft expanded length",
        deploymentTime: "Under 30 minutes with 4-person crew",
        capacity: "Up to 50 personnel",
        powerOutput: "Up to 20kW integrated power",
        climateControl: "Full HVAC system with filtration",
        communications: "Integrated secure communications",
        weight: "Configurable 5,000-15,000 kg",
        transport: "Standard military transport compatible"
      },
      deploymentTime: "Under 30 minutes",
      capacity: "Up to 50 personnel",
      environments: [
        "Desert (up to +60°C)",
        "Arctic (down to -40°C)",
        "Tropical (high humidity)",
        "Mountain (high altitude)",
        "Coastal (salt spray)",
        "Urban (confined spaces)"
      ],
      configurations: [
        "Command and Control Center",
        "Medical Treatment Facility",
        "Tactical Operations Center",
        "Communications Hub",
        "Logistics Support Center",
        "Emergency Response Headquarters"
      ],
      advantages: [
        "Rapid deployment capability",
        "Extreme environment durability",
        "Modular and scalable design",
        "Integrated infrastructure",
        "Global logistics support",
        "Proven military reliability",
        "Cost-effective total ownership",
        "Flexible mission adaptation"
      ],
      disadvantages: [
        "Higher initial cost compared to basic shelters",
        "Requires trained personnel for deployment",
        "Complex maintenance requirements",
        "Limited customization after deployment"
      ],
      bestUseCases: [
        "Military command and control operations",
        "Emergency response and disaster relief",
        "Tactical military operations",
        "Field hospitals and medical facilities",
        "Remote research stations",
        "High-security communications centers"
      ],
      worstUseCases: [
        "Permanent installations",
        "Low-budget operations",
        "Simple storage facilities",
        "Urban office environments",
        "Short-term events"
      ],
      costRange: "$500,000 - $2,000,000+",
      maintenanceLevel: "High - requires trained technicians",
      certifications: [
        "Military specifications compliance",
        "NATO interoperability standards",
        "International safety standards",
        "Environmental protection compliance"
      ],
      competitors: [
        "HESCO Bastion",
        "Alaska Structures",
        "Rubb Buildings",
        "Shelter Systems"
      ],
      uniqueSellingPoints: [
        "Fastest deployment time in industry",
        "Most extreme environment capability",
        "Integrated infrastructure systems",
        "Proven military track record"
      ]
    },
    {
      id: "field-hospital",
      name: "Field Hospital System",
      category: "Medical & Healthcare",
      description: "Complete medical facility solution for emergency response and routine care in remote locations with full medical infrastructure.",
      keyFeatures: [
        "Complete medical infrastructure",
        "Operating room capabilities",
        "Patient care areas",
        "Medical equipment integration",
        "Sterile environment maintenance",
        "Emergency power systems"
      ],
      specifications: {
        capacity: "20-100 patients",
        setupTime: "2-4 hours",
        medicalLevel: "Level 1-3 trauma care",
        power: "Redundant power systems",
        climate: "Controlled medical environment",
        sterilization: "Medical-grade sterilization systems",
        imaging: "X-ray and ultrasound capabilities",
        lab: "Basic laboratory facilities"
      },
      deploymentTime: "2-4 hours",
      capacity: "20-100 patients",
      environments: [
        "Temperate climates",
        "Desert environments",
        "Tropical regions",
        "Arctic conditions",
        "High altitude locations"
      ],
      configurations: [
        "Emergency Trauma Center",
        "General Medical Facility",
        "Surgical Suite",
        "Intensive Care Unit",
        "Outpatient Clinic",
        "Medical Supply Center"
      ],
      advantages: [
        "Complete medical infrastructure",
        "Rapid medical facility deployment",
        "Flexible capacity scaling",
        "Global medical standards compliance",
        "Integrated medical equipment",
        "Emergency power redundancy"
      ],
      disadvantages: [
        "High cost and complexity",
        "Requires medical staff training",
        "Limited to medical applications",
        "Regular medical equipment maintenance"
      ],
      bestUseCases: [
        "Disaster response medical care",
        "Military field hospitals",
        "Remote community healthcare",
        "Emergency medical response",
        "Humanitarian aid operations",
        "Medical training facilities"
      ],
      worstUseCases: [
        "Non-medical operations",
        "Simple storage needs",
        "Temporary office space",
        "Low-budget operations"
      ],
      costRange: "$1,000,000 - $5,000,000+",
      maintenanceLevel: "Very High - requires medical technicians",
      certifications: [
        "Medical device regulations",
        "Hospital accreditation standards",
        "Emergency medical protocols",
        "International health standards"
      ],
      competitors: [
        "Medecins Sans Frontieres",
        "International Medical Corps",
        "Red Cross facilities",
        "Military medical units"
      ],
      uniqueSellingPoints: [
        "Complete medical infrastructure",
        "Rapid deployment capability",
        "Medical-grade sterilization",
        "Integrated imaging systems"
      ]
    },
    {
      id: "command-center",
      name: "Command & Control Center",
      category: "Military & Tactical",
      description: "Advanced command and control facility designed for military operations, emergency management, and tactical decision-making.",
      keyFeatures: [
        "Secure communications infrastructure",
        "Multi-screen command displays",
        "Tactical planning areas",
        "Secure data processing",
        "Redundant power systems",
        "Environmental monitoring"
      ],
      specifications: {
        capacity: "10-30 command staff",
        setupTime: "1-2 hours",
        communications: "Multi-band secure communications",
        displays: "Large format tactical displays",
        power: "Redundant power with UPS",
        security: "EMI/RFI shielding",
        climate: "Controlled environment"
      },
      deploymentTime: "1-2 hours",
      capacity: "10-30 command staff",
      environments: [
        "Military bases",
        "Emergency operations centers",
        "Tactical forward positions",
        "Disaster response headquarters",
        "Security operations centers"
      ],
      configurations: [
        "Tactical Operations Center",
        "Emergency Management Center",
        "Intelligence Analysis Hub",
        "Communications Command Post",
        "Logistics Coordination Center",
        "Security Operations Center"
      ],
      advantages: [
        "Rapid command facility deployment",
        "Secure communications infrastructure",
        "Integrated tactical displays",
        "Redundant power systems",
        "EMI/RFI protection",
        "Scalable command structure"
      ],
      disadvantages: [
        "High technology requirements",
        "Complex setup procedures",
        "Requires trained operators",
        "High power consumption"
      ],
      bestUseCases: [
        "Military tactical operations",
        "Emergency response coordination",
        "Disaster management",
        "Security operations",
        "Intelligence analysis",
        "Logistics coordination"
      ],
      worstUseCases: [
        "Simple storage needs",
        "Basic office space",
        "Low-tech operations",
        "Temporary events"
      ],
      costRange: "$300,000 - $1,500,000",
      maintenanceLevel: "High - requires IT technicians",
      certifications: [
        "Military communications standards",
        "Emergency management protocols",
        "Security clearance requirements",
        "Data protection standards"
      ],
      competitors: [
        "Lockheed Martin",
        "Raytheon",
        "Northrop Grumman",
        "BAE Systems"
      ],
      uniqueSellingPoints: [
        "Rapid deployment capability",
        "Integrated tactical systems",
        "Secure communications",
        "Proven military reliability"
      ]
    },
    {
      id: "research-station",
      name: "Research Station",
      category: "Scientific & Research",
      description: "Specialized shelter system designed for scientific research, environmental monitoring, and field studies in extreme environments.",
      keyFeatures: [
        "Laboratory facilities",
        "Environmental monitoring systems",
        "Data collection infrastructure",
        "Long-term durability",
        "Scientific equipment integration",
        "Remote communications"
      ],
      specifications: {
        capacity: "5-20 researchers",
        setupTime: "4-8 hours",
        laboratory: "Basic to advanced lab facilities",
        monitoring: "Environmental sensors",
        communications: "Satellite and radio systems",
        power: "Solar and generator hybrid",
        climate: "Controlled research environment"
      },
      deploymentTime: "4-8 hours",
      capacity: "5-20 researchers",
      environments: [
        "Polar regions",
        "Desert environments",
        "Tropical rainforests",
        "High altitude locations",
        "Coastal areas",
        "Remote wilderness"
      ],
      configurations: [
        "Environmental Research Station",
        "Climate Monitoring Facility",
        "Wildlife Research Center",
        "Archaeological Field Station",
        "Geological Survey Base",
        "Biological Research Lab"
      ],
      advantages: [
        "Specialized research facilities",
        "Long-term durability",
        "Environmental monitoring capability",
        "Remote communications",
        "Scientific equipment integration",
        "Sustainable power systems"
      ],
      disadvantages: [
        "Limited to research applications",
        "Complex setup requirements",
        "High initial cost",
        "Requires scientific expertise"
      ],
      bestUseCases: [
        "Environmental research",
        "Climate change studies",
        "Wildlife monitoring",
        "Archaeological excavations",
        "Geological surveys",
        "Biological research"
      ],
      worstUseCases: [
        "Military operations",
        "Emergency response",
        "Commercial storage",
        "Temporary events"
      ],
      costRange: "$200,000 - $800,000",
      maintenanceLevel: "Medium - requires technical expertise",
      certifications: [
        "Scientific research standards",
        "Environmental protection",
        "Data collection protocols",
        "Safety standards"
      ],
      competitors: [
        "National Science Foundation",
        "Research institutions",
        "Environmental organizations",
        "Academic field stations"
      ],
      uniqueSellingPoints: [
        "Specialized research facilities",
        "Long-term environmental durability",
        "Integrated monitoring systems",
        "Remote operation capability"
      ]
    },
    {
      id: "remote-camp",
      name: "Remote Camp System",
      category: "Industrial & Commercial",
      description: "Comprehensive camp solution for remote industrial operations, mining, oil and gas, and construction projects.",
      keyFeatures: [
        "Modular accommodation units",
        "Dining and recreation facilities",
        "Medical and safety facilities",
        "Power and utility systems",
        "Waste management",
        "Communications infrastructure"
      ],
      specifications: {
        capacity: "50-500 personnel",
        setupTime: "1-3 days",
        accommodation: "Individual and shared units",
        dining: "Full-service kitchen facilities",
        medical: "Basic medical clinic",
        power: "Centralized power generation",
        utilities: "Water, sewage, communications"
      },
      deploymentTime: "1-3 days",
      capacity: "50-500 personnel",
      environments: [
        "Mining operations",
        "Oil and gas fields",
        "Construction sites",
        "Forestry operations",
        "Remote industrial facilities",
        "Infrastructure projects"
      ],
      configurations: [
        "Mining Camp",
        "Oil Field Camp",
        "Construction Camp",
        "Forestry Camp",
        "Industrial Camp",
        "Infrastructure Camp"
      ],
      advantages: [
        "Complete camp infrastructure",
        "Scalable capacity",
        "Long-term durability",
        "Integrated utilities",
        "Cost-effective operations",
        "Comfortable living conditions"
      ],
      disadvantages: [
        "Longer setup time",
        "Large footprint",
        "Complex logistics",
        "Environmental impact"
      ],
      bestUseCases: [
        "Remote mining operations",
        "Oil and gas exploration",
        "Large construction projects",
        "Forestry operations",
        "Industrial development",
        "Infrastructure projects"
      ],
      worstUseCases: [
        "Emergency response",
        "Tactical military operations",
        "Short-term events",
        "Urban environments"
      ],
      costRange: "$500,000 - $5,000,000+",
      maintenanceLevel: "Medium - requires camp management",
      certifications: [
        "Industrial safety standards",
        "Environmental compliance",
        "Health and safety regulations",
        "Quality management systems"
      ],
      competitors: [
        "Alaska Structures",
        "Rubb Buildings",
        "Shelter Systems",
        "Local camp providers"
      ],
      uniqueSellingPoints: [
        "Complete camp solutions",
        "Integrated infrastructure",
        "Long-term durability",
        "Cost-effective operations"
      ]
    }
  ],

  applications: [
    {
      sector: "Military & Defense",
      description: "Tactical shelter solutions for military operations worldwide, providing command, control, medical, and support facilities in any environment.",
      useCases: [
        "Tactical command and control centers",
        "Field hospitals and medical facilities",
        "Forward operating bases",
        "Training and simulation centers",
        "Logistics and supply centers",
        "Communications and intelligence hubs"
      ],
      requirements: [
        "Rapid deployment capability",
        "Extreme environment protection",
        "Secure communications infrastructure",
        "Modular and scalable design",
        "Global logistics support",
        "Military specifications compliance"
      ],
      benefits: [
        "Enhanced operational readiness",
        "Reduced deployment time",
        "Improved personnel protection",
        "Flexible mission adaptation",
        "Cost-effective total ownership",
        "Proven battlefield reliability"
      ]
    },
    {
      sector: "Emergency Response",
      description: "Rapid deployment solutions for disaster response, humanitarian aid, and emergency management operations.",
      useCases: [
        "Disaster response headquarters",
        "Emergency medical facilities",
        "Refugee and relief centers",
        "Search and rescue operations",
        "Emergency communications centers",
        "Temporary housing solutions"
      ],
      requirements: [
        "Immediate deployment capability",
        "All-weather protection",
        "Medical facility standards",
        "Communications infrastructure",
        "Power and water systems",
        "Transportation compatibility"
      ],
      benefits: [
        "Rapid emergency response",
        "Complete infrastructure provision",
        "Flexible capacity scaling",
        "Global deployment capability",
        "Cost-effective emergency solutions",
        "Proven disaster response reliability"
      ]
    },
    {
      sector: "Remote Industry",
      description: "Shelter solutions for mining, oil and gas, construction, and other remote industrial operations.",
      useCases: [
        "Remote camp facilities",
        "Mining operations support",
        "Oil and gas exploration camps",
        "Construction site offices",
        "Research and development facilities",
        "Training and education centers"
      ],
      requirements: [
        "Remote location deployment",
        "Extreme environment protection",
        "Industrial safety standards",
        "Power and utility integration",
        "Transportation logistics",
        "Long-term durability"
      ],
      benefits: [
        "Rapid remote facility deployment",
        "Complete infrastructure solutions",
        "Extreme environment protection",
        "Cost-effective remote operations",
        "Flexible capacity requirements",
        "Proven industrial reliability"
      ]
    },
    {
      sector: "Research & Exploration",
      description: "Specialized shelter solutions for scientific research, polar exploration, and field studies.",
      useCases: [
        "Polar research stations",
        "Field research facilities",
        "Environmental monitoring stations",
        "Archaeological expedition camps",
        "Wildlife research facilities",
        "Climate change monitoring stations"
      ],
      requirements: [
        "Extreme environment protection",
        "Scientific equipment integration",
        "Long-term durability",
        "Environmental impact minimization",
        "Research facility standards",
        "Remote logistics support"
      ],
      benefits: [
        "Extreme environment capability",
        "Scientific equipment integration",
        "Long-term research support",
        "Environmental sustainability",
        "Remote location deployment",
        "Proven research reliability"
      ]
    }
  ],

  technical: {
    materials: [
      "High-strength aluminum alloys",
      "Advanced composite materials",
      "Military-grade fabrics and membranes",
      "Corrosion-resistant coatings",
      "Thermal insulation systems",
      "Ballistic protection materials"
    ],
    construction: [
      "Modular frame systems",
      "Expandable mechanisms",
      "Integrated infrastructure",
      "Quick-connect systems",
      "Transportation optimization",
      "Maintenance accessibility"
    ],
    environmental: [
      "Extreme temperature operation (-40°C to +60°C)",
      "High humidity resistance",
      "Salt spray protection",
      "UV radiation resistance",
      "Wind load resistance",
      "Environmental impact minimization"
    ],
    safety: [
      "Fire resistance standards",
      "Structural integrity testing",
      "Electrical safety compliance",
      "Environmental safety standards",
      "Occupational health compliance",
      "Emergency egress systems"
    ],
    maintenance: [
      "Preventive maintenance programs",
      "Spare parts availability",
      "Technical support services",
      "Training and certification",
      "Documentation and manuals",
      "Global service network"
    ]
  },

  support: {
    services: [
      "24/7 global technical support",
      "Rapid deployment training",
      "Maintenance and repair services",
      "Spare parts and logistics",
      "Custom configuration design",
      "Installation and commissioning"
    ],
    warranty: "Comprehensive warranty coverage including parts, labor, and technical support",
    training: [
      "Deployment and setup training",
      "Maintenance and repair training",
      "Safety and operational training",
      "Custom configuration training",
      "Emergency response training",
      "Certification programs"
    ],
    documentation: [
      "Technical manuals and specifications",
      "Deployment and setup guides",
      "Maintenance procedures",
      "Safety guidelines",
      "Training materials",
      "Video tutorials and demonstrations"
    ],
    contact: [
      "Global headquarters: Vancouver, BC, Canada",
      "24/7 technical support hotline",
      "Regional service centers worldwide",
      "Online support portal",
      "Emergency response contacts",
      "Sales and consultation services"
    ]
  },

  useCases: [
    {
      scenario: "Military Tactical Operations",
      description: "Rapid deployment command and control center for military operations in hostile environments",
      requirements: [
        "Rapid deployment under 30 minutes",
        "Secure communications infrastructure",
        "Extreme environment protection",
        "Tactical planning capabilities",
        "EMI/RFI shielding",
        "Redundant power systems"
      ],
      recommendedShelters: ["TRECC", "Command & Control Center"],
      alternativeShelters: ["Field Hospital System"],
      keyConsiderations: [
        "Deployment speed critical",
        "Security requirements high",
        "Communications essential",
        "Environmental protection needed"
      ],
      estimatedCost: "$500,000 - $1,500,000",
      deploymentTime: "Under 30 minutes",
      maintenanceNeeds: ["Regular security updates", "Communications maintenance", "Power system checks"]
    },
    {
      scenario: "Emergency Medical Response",
      description: "Field hospital for disaster response and emergency medical care",
      requirements: [
        "Complete medical infrastructure",
        "Operating room capabilities",
        "Patient care areas",
        "Sterile environment",
        "Medical equipment integration",
        "Emergency power systems"
      ],
      recommendedShelters: ["Field Hospital System"],
      alternativeShelters: ["TRECC (medical configuration)"],
      keyConsiderations: [
        "Medical standards compliance",
        "Sterilization requirements",
        "Patient capacity needs",
        "Medical staff training"
      ],
      estimatedCost: "$1,000,000 - $5,000,000",
      deploymentTime: "2-4 hours",
      maintenanceNeeds: ["Medical equipment maintenance", "Sterilization system checks", "Medical supply management"]
    },
    {
      scenario: "Arctic Research Station",
      description: "Long-term research facility for scientific studies in extreme cold environments",
      requirements: [
        "Extreme cold protection (-40°C)",
        "Laboratory facilities",
        "Long-term durability",
        "Environmental monitoring",
        "Remote communications",
        "Sustainable power systems"
      ],
      recommendedShelters: ["Research Station"],
      alternativeShelters: ["TRECC (research configuration)"],
      keyConsiderations: [
        "Extreme environment durability",
        "Scientific equipment needs",
        "Long-term sustainability",
        "Remote logistics"
      ],
      estimatedCost: "$200,000 - $800,000",
      deploymentTime: "4-8 hours",
      maintenanceNeeds: ["Environmental system maintenance", "Scientific equipment calibration", "Power system monitoring"]
    },
    {
      scenario: "Remote Mining Camp",
      description: "Complete camp solution for remote mining operations with accommodation and support facilities",
      requirements: [
        "Large capacity (100+ personnel)",
        "Long-term durability",
        "Complete infrastructure",
        "Comfortable living conditions",
        "Power and utilities",
        "Medical facilities"
      ],
      recommendedShelters: ["Remote Camp System"],
      alternativeShelters: ["Multiple TRECC units"],
      keyConsiderations: [
        "Camp size requirements",
        "Infrastructure needs",
        "Long-term operations",
        "Environmental impact"
      ],
      estimatedCost: "$2,000,000 - $10,000,000",
      deploymentTime: "1-3 days",
      maintenanceNeeds: ["Camp management", "Utility system maintenance", "Facility upkeep"]
    },
    {
      scenario: "Disaster Response Headquarters",
      description: "Emergency operations center for coordinating disaster response and relief efforts",
      requirements: [
        "Rapid deployment capability",
        "Communications infrastructure",
        "Command and control facilities",
        "Emergency power",
        "All-weather protection",
        "Scalable capacity"
      ],
      recommendedShelters: ["TRECC", "Command & Control Center"],
      alternativeShelters: ["Field Hospital System"],
      keyConsiderations: [
        "Deployment speed critical",
        "Communications essential",
        "Coordination capabilities",
        "Emergency response protocols"
      ],
      estimatedCost: "$300,000 - $1,500,000",
      deploymentTime: "Under 30 minutes",
      maintenanceNeeds: ["Communications maintenance", "Power system checks", "Emergency protocols"]
    },
    {
      scenario: "Desert Military Base",
      description: "Forward operating base for military operations in extreme desert conditions",
      requirements: [
        "Extreme heat protection (+60°C)",
        "Dust and sand protection",
        "Military specifications",
        "Rapid deployment",
        "Secure communications",
        "Logistics support"
      ],
      recommendedShelters: ["TRECC"],
      alternativeShelters: ["Command & Control Center"],
      keyConsiderations: [
        "Heat protection critical",
        "Dust filtration essential",
        "Military standards required",
        "Deployment speed important"
      ],
      estimatedCost: "$500,000 - $2,000,000",
      deploymentTime: "Under 30 minutes",
      maintenanceNeeds: ["Dust filter maintenance", "Cooling system checks", "Military equipment upkeep"]
    },
    {
      scenario: "Tropical Research Facility",
      description: "Environmental research station for studies in high humidity and tropical conditions",
      requirements: [
        "High humidity protection",
        "Laboratory facilities",
        "Environmental monitoring",
        "Sustainable power",
        "Remote communications",
        "Long-term durability"
      ],
      recommendedShelters: ["Research Station"],
      alternativeShelters: ["TRECC (research configuration)"],
      keyConsiderations: [
        "Humidity control critical",
        "Environmental monitoring needs",
        "Sustainable operations",
        "Remote logistics"
      ],
      estimatedCost: "$200,000 - $800,000",
      deploymentTime: "4-8 hours",
      maintenanceNeeds: ["Humidity control maintenance", "Environmental monitoring", "Power system checks"]
    },
    {
      scenario: "Oil Field Operations Camp",
      description: "Industrial camp for oil and gas operations in remote locations",
      requirements: [
        "Large capacity (200+ personnel)",
        "Industrial safety standards",
        "Complete infrastructure",
        "Long-term durability",
        "Environmental compliance",
        "Medical facilities"
      ],
      recommendedShelters: ["Remote Camp System"],
      alternativeShelters: ["Multiple TRECC units"],
      keyConsiderations: [
        "Industrial safety requirements",
        "Environmental compliance",
        "Large capacity needs",
        "Long-term operations"
      ],
      estimatedCost: "$3,000,000 - $15,000,000",
      deploymentTime: "1-3 days",
      maintenanceNeeds: ["Industrial safety compliance", "Environmental monitoring", "Camp management"]
    }
  ]
};

// AI Assistant Response Templates
export const aiResponseTemplates = {
  greetings: [
    "Welcome to Weatherhaven! I'm your AI assistant, ready to help you configure the perfect shelter system for your needs.",
    "Hello! I'm here to help you explore Weatherhaven's comprehensive shelter solutions. What can I assist you with today?",
    "Greetings! I'm your Weatherhaven AI assistant, specializing in shelter configurations and tactical solutions."
  ],
  
  capabilities: [
    "I can help you configure shelter systems for military, emergency response, remote industry, research, or any other application.",
    "I specialize in shelter deployment scenarios, technical specifications, and optimal configurations for your specific needs.",
    "I can provide detailed information about all shelter capabilities, deployment times, capacity options, and environmental protection."
  ],
  
  recommendations: [
    "Based on your requirements, I recommend a {shelter} configuration optimized for {environment} with {capacity} capacity.",
    "For your {application} needs, I suggest a {shelter} system with {features} for optimal performance.",
    "Given your {sector} requirements, the ideal {shelter} setup would include {specifications} for maximum effectiveness."
  ],
  
  technical: [
    "TRECC systems deploy in under 30 minutes and can operate in temperatures from -40°C to +60°C.",
    "The TRECC modular design allows expansion from 20ft to 40ft with capacity for up to 50 personnel.",
    "TRECC includes integrated power, HVAC, and communications systems for complete infrastructure solutions."
  ]
};

// Quick Response Functions
export const getQuickResponse = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  // Company information
  if (queryLower.includes('company') || queryLower.includes('weatherhaven')) {
    return `Weatherhaven, founded in 1983, is the world's leading provider of deployable shelter systems. We specialize in rapid deployment solutions for military, disaster response, remote industry, and research applications. Our mission is to provide innovative, reliable, and sustainable shelter solutions that enable human achievement in the world's most challenging environments. We've been deployed in over 50 countries worldwide and are trusted by military forces globally.`;
  }
  
  // TRECC information
  if (queryLower.includes('trecc') || queryLower.includes('tactical')) {
    return `TRECC (Tactical Redeployable Expandable Container Capability) is Weatherhaven's flagship tactical shelter system. It deploys in under 30 minutes, operates in temperatures from -40°C to +60°C, and can accommodate up to 50 personnel. The modular design expands from 20ft to 40ft with integrated power, HVAC, and communications systems. TRECC is designed for rapid deployment in military and emergency response operations, providing a complete infrastructure solution in a compact, transportable package.`;
  }
  
  // Deployment time
  if (queryLower.includes('deploy') || queryLower.includes('time') || queryLower.includes('setup')) {
    return `TRECC systems deploy in under 30 minutes with a trained 4-person crew. The rapid deployment capability is achieved through our patented modular design and quick-connect systems, making it ideal for tactical military operations and emergency response scenarios.`;
  }
  
  // Capacity
  if (queryLower.includes('capacity') || queryLower.includes('people') || queryLower.includes('personnel')) {
    return `TRECC systems can accommodate up to 50 personnel depending on the configuration. The modular design allows for flexible capacity scaling, from small command posts to large medical facilities or emergency response centers.`;
  }
  
  // Environments
  if (queryLower.includes('environment') || queryLower.includes('weather') || queryLower.includes('temperature')) {
    return `TRECC systems are designed for extreme environments, operating in temperatures from -40°C to +60°C. They're proven in desert, arctic, tropical, mountain, coastal, and urban environments with specialized protection for each condition.`;
  }
  
  // Applications
  if (queryLower.includes('use') || queryLower.includes('application') || queryLower.includes('purpose')) {
    return `TRECC systems are used for military command and control, field hospitals, emergency response, remote industry camps, and research stations. Each configuration is optimized for specific operational requirements and environmental conditions.`;
  }
  
  return "I'm here to help you with shelter configuration and Weatherhaven solutions. Could you please provide more specific details about your requirements?";
};

// Advanced Shelter Recommendation Function
export const getShelterRecommendation = (requirements: string[]): any => {
  const shelterScores: Record<string, number> = {};
  
  weatherhavenKnowledge.shelters.forEach(shelter => {
    let score = 0;
    
    requirements.forEach(req => {
      const reqLower = req.toLowerCase();
      
      // Check if shelter matches requirements
      if (shelter.bestUseCases.some(useCase => useCase.toLowerCase().includes(reqLower))) {
        score += 10;
      }
      
      if (shelter.keyFeatures.some(feature => feature.toLowerCase().includes(reqLower))) {
        score += 5;
      }
      
      if (shelter.environments.some(env => env.toLowerCase().includes(reqLower))) {
        score += 5;
      }
      
      if (shelter.configurations.some(config => config.toLowerCase().includes(reqLower))) {
        score += 5;
      }
    });
    
    shelterScores[shelter.id] = score;
  });
  
  // Find best match
  const bestShelterId = Object.keys(shelterScores).reduce((a, b) => 
    shelterScores[a] > shelterScores[b] ? a : b
  );
  
  return weatherhavenKnowledge.shelters.find(s => s.id === bestShelterId);
};

// Use Case Analysis Function
export const analyzeUseCase = (scenario: string): any => {
  const scenarioLower = scenario.toLowerCase();
  
  return weatherhavenKnowledge.useCases.find(useCase => 
    useCase.scenario.toLowerCase().includes(scenarioLower) ||
    useCase.description.toLowerCase().includes(scenarioLower)
  );
};
