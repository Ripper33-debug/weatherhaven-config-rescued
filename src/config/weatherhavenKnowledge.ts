// Weatherhaven Knowledge Base for AI Assistant
// This file contains comprehensive information about Weatherhaven, TRECC, and related products

export interface WeatherhavenKnowledge {
  company: CompanyInfo;
  products: ProductInfo[];
  trecc: TRECCInfo;
  applications: ApplicationInfo[];
  technical: TechnicalInfo;
  support: SupportInfo;
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
  }
};

// AI Assistant Response Templates
export const aiResponseTemplates = {
  greetings: [
    "Welcome to Weatherhaven! I'm your AI assistant, ready to help you configure the perfect TRECC system for your needs.",
    "Hello! I'm here to help you explore Weatherhaven's TRECC tactical shelter solutions. What can I assist you with today?",
    "Greetings! I'm your Weatherhaven AI assistant, specializing in TRECC configurations and tactical shelter solutions."
  ],
  
  capabilities: [
    "I can help you configure TRECC systems for military, emergency response, remote industry, or research applications.",
    "I specialize in TRECC deployment scenarios, technical specifications, and optimal configurations for your specific needs.",
    "I can provide detailed information about TRECC capabilities, deployment times, capacity options, and environmental protection."
  ],
  
  recommendations: [
    "Based on your requirements, I recommend a TRECC configuration optimized for {environment} with {capacity} capacity.",
    "For your {application} needs, I suggest a TRECC system with {features} for optimal performance.",
    "Given your {sector} requirements, the ideal TRECC setup would include {specifications} for maximum effectiveness."
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
    return `Weatherhaven, founded in 1983, is the world's leading provider of deployable shelter systems. We specialize in rapid deployment solutions for military, disaster response, remote industry, and research applications. Our mission is to provide innovative, reliable, and sustainable shelter solutions that enable human achievement in the world's most challenging environments.`;
  }
  
  // TRECC information
  if (queryLower.includes('trecc') || queryLower.includes('tactical')) {
    return `TRECC (Tactical Redeployable Expandable Container Capability) is our flagship tactical shelter system. It deploys in under 30 minutes, operates in temperatures from -40°C to +60°C, and can accommodate up to 50 personnel. The modular design expands from 20ft to 40ft with integrated power, HVAC, and communications systems.`;
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
  
  return "I'm here to help you with TRECC configuration and Weatherhaven solutions. Could you please provide more specific details about your requirements?";
};
