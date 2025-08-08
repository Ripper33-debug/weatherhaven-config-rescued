import React, { useState } from 'react';
import { User, Shelter } from '../App';
import DualLogoHeader from './DualLogoHeader';

interface CommandCenterProps {
  user: User;
  onLogout: () => void;
  onShelterSelect: (shelter: Shelter) => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ user, onLogout, onShelterSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Shelter catalog data
  const shelters: Shelter[] = [
    // TRECC Models
    {
      id: 'trecc-command',
      name: 'TRECC Command Post',
      model: 'TRECC COMMAND POST KITTING',
      category: 'trecc',
      description: 'Advanced command post with integrated power, HVAC, display systems, and deployable workstations.',
      image: 'command',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/command-post.glb',
      specs: {
        deployed: { length: '14.3 ft', width: '7.1 ft', height: '7.9 ft' },
        stowed: { length: '7.0 ft', width: '7.1 ft', height: '4.8 ft' }
      }
    },
    {
      id: 'trecc-medical',
      name: 'TRECC Medical Unit',
      model: 'TRECC MEDICAL KITTING',
      category: 'trecc',
      description: 'Field hospital with surgical capabilities, patient care areas, and medical equipment integration.',
      image: 'medical',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/medical-unit.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-living',
      name: 'TRECC-L Living Quarters',
      model: 'TRECC-L LIVING KITTING',
      category: 'trecc',
      description: 'Comfortable living quarters with sleeping areas, dining facilities, and recreational space.',
      image: 'living',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/living-quarters.glb',
      specs: {
        deployed: { length: '18.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '9.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-communications',
      name: 'TRECC-C Communications Hub',
      model: 'TRECC-C COMMUNICATIONS KITTING',
      category: 'trecc',
      description: 'Advanced communications center with satellite systems, radio equipment, and network infrastructure.',
      image: 'communications',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/communications.glb',
      specs: {
        deployed: { length: '14.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '7.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-storage',
      name: 'TRECC-E Equipment Storage',
      model: 'TRECC-E STORAGE KITTING',
      category: 'trecc',
      description: 'Secure storage facility with climate control, inventory management, and equipment maintenance areas.',
      image: 'storage',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/equipment-storage.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-kitchen',
      name: 'TRECC-K Field Kitchen',
      model: 'TRECC-K KITCHEN KITTING',
      category: 'trecc',
      description: 'Mobile kitchen with cooking facilities, food storage, and dining areas.',
      image: 'kitchen',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/field-kitchen.glb',
      specs: {
        deployed: { length: '14.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '7.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-drone-manufacturing',
      name: 'TRECC Drone Manufacturing',
      model: 'TRECC DRONE MANUFACTURING KITTING',
      category: 'trecc',
      description: 'Advanced drone manufacturing facility with assembly lines, testing equipment, and quality control systems.',
      image: 'manufacturing',
      modelPath: '/models/trecc-main.glb',
      interiorPath: '/models/interiors/drone-manufacturing.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '10.0 ft', height: '9.0 ft' },
        stowed: { length: '10.0 ft', width: '10.0 ft', height: '6.0 ft' }
      }
    },
    
    // MTS Models
    {
      id: 'mts-standard',
      name: 'MTS Standard',
      model: 'MODULAR TENTAGE SYSTEM',
      category: 'mts',
      description: 'The most thermally efficient and robust tactical shelter in the world. Used for field applications and popular with military forces for operations centres and medical facilities.',
      image: 'mts',
      modelPath: '/models/mts-main.glb',
      interiorPath: '/models/interiors/mts-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '10.0 ft', width: '10.0 ft', height: '6.0 ft' }
      }
    },
    {
      id: 'mts-medical',
      name: 'MTS Medical Facility',
      model: 'MTS MEDICAL KITTING',
      category: 'mts',
      description: 'Medical facility configuration with surgical suites, patient care areas, and medical equipment integration.',
      image: 'medical',
      modelPath: '/models/mts-main.glb',
      interiorPath: '/models/interiors/mts-medical.glb',
      specs: {
        deployed: { length: '24.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '12.0 ft', width: '12.0 ft', height: '6.0 ft' }
      }
    },
    
    // Series 4 Models
    {
      id: 'series4-standard',
      name: 'Series 4 Standard',
      model: 'SERIES 4 STANDARD',
      category: 'series4',
      description: 'High-performance shelter used worldwide by commercial and military customers in all climates, including polar regions. Ideal for workforce housing and military accommodation.',
      image: 'series4',
      modelPath: '/models/series4-main.glb',
      interiorPath: '/models/interiors/series4-standard.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '7.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'series4-tropical',
      name: 'Series 4 Tropical',
      model: 'SERIES 4 TROPICAL',
      category: 'series4',
      description: 'Tropical version with side windows for maximum ventilation. Perfect for hot and humid environments.',
      image: 'series4',
      modelPath: '/models/series4-main.glb',
      interiorPath: '/models/interiors/series4-tropical.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '7.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'series4-shop',
      name: 'Series 4 Shop',
      model: 'SERIES 4 SHOP',
      category: 'series4',
      description: 'Extended-height structure ideal for applications requiring additional vertical space.',
      image: 'series4',
      modelPath: '/models/series4-main.glb',
      interiorPath: '/models/interiors/series4-shop.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '9.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '6.0 ft' }
      }
    },
    
    // Series 8 Models
    {
      id: 'series8-standard',
      name: 'Series 8 Standard',
      model: 'SERIES 8 STANDARD',
      category: 'series8',
      description: 'Lightweight version designed for locations without high winds or snow loads. Used for equipment maintenance, storage, and temporary manufacturing facilities.',
      image: 'series8',
      modelPath: '/models/series8-main.glb',
      interiorPath: '/models/interiors/series8-standard.glb',
      specs: {
        deployed: { length: '14.0 ft', width: '8.0 ft', height: '6.0 ft' },
        stowed: { length: '7.0 ft', width: '8.0 ft', height: '4.0 ft' }
      }
    },
    {
      id: 'series8-tropical',
      name: 'Series 8 Tropical',
      model: 'SERIES 8 TROPICAL',
      category: 'series8',
      description: 'Tropical version with side windows for maximum ventilation in hot climates.',
      image: 'series8',
      modelPath: '/models/series8-main.glb',
      interiorPath: '/models/interiors/series8-tropical.glb',
      specs: {
        deployed: { length: '14.0 ft', width: '8.0 ft', height: '6.0 ft' },
        stowed: { length: '7.0 ft', width: '8.0 ft', height: '4.0 ft' }
      }
    },
    {
      id: 'series8-shop',
      name: 'Series 8 Shop',
      model: 'SERIES 8 SHOP',
      category: 'series8',
      description: 'Wider and taller version of the standard Series 8 shelter for enhanced workspace.',
      image: 'series8',
      modelPath: '/models/series8-main.glb',
      interiorPath: '/models/interiors/series8-shop.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '8.0 ft', width: '10.0 ft', height: '5.0 ft' }
      }
    },
    
    // MEX-26
    {
      id: 'mex26',
      name: 'MEX-26',
      model: 'MEX-26 MAINTENANCE SHELTER',
      category: 'mex',
      description: 'Designed to facilitate armoured vehicle and helicopter maintenance for global military forces. Provides dust-free environment for optics and weapons repairs.',
      image: 'mex',
      modelPath: '/models/mex26-main.glb',
      interiorPath: '/models/interiors/mex26-maintenance.glb',
      specs: {
        deployed: { length: '26.0 ft', width: '12.0 ft', height: '10.0 ft' },
        stowed: { length: '13.0 ft', width: '12.0 ft', height: '7.0 ft' }
      }
    },
    
    // Polar Shelters
    {
      id: 'polarhaven',
      name: 'Polarhaven',
      model: 'POLARHAVEN SHELTER',
      category: 'polar',
      description: 'Designed to perform in high winds, snow, and extremely low temperatures. Ideal for Arctic expeditions and advanced base camps.',
      image: 'polar',
      modelPath: '/models/polarhaven-main.glb',
      interiorPath: '/models/interiors/polarhaven-standard.glb',
      specs: {
        deployed: { length: '18.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '9.0 ft', width: '10.0 ft', height: '6.0 ft' }
      }
    },
    {
      id: 'polar-chief',
      name: 'Polar Chief',
      model: 'POLAR CHIEF SHELTER',
      category: 'polar',
      description: 'Enhanced polar shelter for scientific studies and workforce camps in extremely cold and dry regions.',
      image: 'polar',
      modelPath: '/models/polar-chief-main.glb',
      interiorPath: '/models/interiors/polar-chief-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '9.0 ft' },
        stowed: { length: '10.0 ft', width: '12.0 ft', height: '7.0 ft' }
      }
    },
    {
      id: 'endurance',
      name: 'Endurance',
      model: 'ENDURANCE SHELTER',
      category: 'polar',
      description: 'Ultimate polar shelter for extreme conditions. Used for tourism and scientific research in the harshest environments.',
      image: 'polar',
      modelPath: '/models/endurance-main.glb',
      interiorPath: '/models/interiors/endurance-standard.glb',
      specs: {
        deployed: { length: '22.0 ft', width: '14.0 ft', height: '10.0 ft' },
        stowed: { length: '11.0 ft', width: '14.0 ft', height: '8.0 ft' }
      }
    },
    
    // RDMSS
    {
      id: 'rdmss',
      name: 'RDMSS',
      model: 'RAPIDLY DEPLOYED MODULAR SHELTER SYSTEM',
      category: 'rdmss',
      description: 'The most advanced softwall shelter system in Weatherhaven\'s fleet. Driven by stringent military requirements for rapid deployment in any geographic and climatic zone.',
      image: 'rdmss',
      modelPath: '/models/rdmss-main.glb',
      interiorPath: '/models/interiors/rdmss-standard.glb',
      specs: {
        deployed: { length: '24.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '12.0 ft', width: '12.0 ft', height: '6.0 ft' }
      }
    },
    
    // ATEPS
    {
      id: 'ateps',
      name: 'ATEPS',
      model: 'AIR-TRANSPORTABLE EXPANDABLE PALLET SHELTER',
      category: 'ateps',
      description: 'Innovative design allows militaries to safely and swiftly deploy forward operating bases, medical facilities, and specialized shelter capabilities while reducing long-term costs.',
      image: 'ateps',
      modelPath: '/models/ateps-main.glb',
      interiorPath: '/models/interiors/ateps-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '10.0 ft', width: '10.0 ft', height: '6.0 ft' }
      }
    },
    
    // MECC
    {
      id: 'mecc',
      name: 'MECC',
      model: 'MOBILE EXPANDABLE CONTAINER CONFIGURATION™',
      category: 'mecc',
      description: 'Combines fabric shelter technology with ISO container standard. Offers three times the floor area of conventional modules while maintaining the same shipping footprint.',
      image: 'mecc',
      modelPath: '/models/mecc-main.glb',
      interiorPath: '/models/interiors/mecc-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '20.0 ft', width: '8.0 ft', height: '8.0 ft' }
      }
    },
    
    // EHMECC
    {
      id: 'ehmecc',
      name: 'EHMECC',
      model: 'EXTENDED HEIGHT MOBILE EXPANDABLE CONTAINER CONFIGURATION™',
      category: 'mecc',
      description: 'Extended height version of MECC with roof raised an additional 4.5 feet for more spacious interior and expanded functionality.',
      image: 'mecc',
      modelPath: '/models/ehmecc-main.glb',
      interiorPath: '/models/interiors/ehmecc-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '12.5 ft' },
        stowed: { length: '20.0 ft', width: '8.0 ft', height: '12.5 ft' }
      }
    },
    
    // HERCON
    {
      id: 'hercon-4ft',
      name: 'HERCON 4\' Wide',
      model: 'HARDWALL EXPANDABLE REDEPLOYABLE CONTAINER™',
      category: 'hercon',
      description: 'Breakthrough hard-walled expandable container shelter. Two 4\' wide units can be coupled for shipping but deployed separately on-site.',
      image: 'hercon',
      modelPath: '/models/hercon-4ft-main.glb',
      interiorPath: '/models/interiors/hercon-4ft-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '20.0 ft', width: '4.0 ft', height: '8.0 ft' }
      }
    },
    {
      id: 'hercon-8ft',
      name: 'HERCON 8\' Wide',
      model: 'HARDWALL EXPANDABLE REDEPLOYABLE CONTAINER™',
      category: 'hercon',
      description: '8\' wide version of the HERCON hard-walled expandable container shelter for maximum deployable space.',
      image: 'hercon',
      modelPath: '/models/hercon-8ft-main.glb',
      interiorPath: '/models/interiors/hercon-8ft-standard.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '16.0 ft', height: '8.0 ft' },
        stowed: { length: '20.0 ft', width: '8.0 ft', height: '8.0 ft' }
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Shelters', icon: 'all' },
    { id: 'trecc', name: 'TRECC', icon: 'trecc' },
    { id: 'mts', name: 'MTS', icon: 'mts' },
    { id: 'series4', name: 'Series 4', icon: 'series4' },
    { id: 'series8', name: 'Series 8', icon: 'series8' },
    { id: 'mex', name: 'MEX-26', icon: 'mex' },
    { id: 'polar', name: 'Polar', icon: 'polar' },
    { id: 'rdmss', name: 'RDMSS', icon: 'rdmss' },
    { id: 'ateps', name: 'ATEPS', icon: 'ateps' },
    { id: 'mecc', name: 'MECC', icon: 'mecc' },
    { id: 'hercon', name: 'HERCON', icon: 'hercon' }
  ];

  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shelter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'command':
        return <div className="icon-command"></div>;
      case 'medical':
        return <div className="icon-medical"></div>;
      case 'living':
        return <div className="icon-living"></div>;
      case 'communications':
        return <div className="icon-communications"></div>;
      case 'storage':
        return <div className="icon-storage"></div>;
      case 'kitchen':
        return <div className="icon-kitchen"></div>;
      case 'manufacturing':
        return <div className="icon-manufacturing"></div>;
      case 'trecc':
        return <div className="icon-trecc"></div>;
      case 'mts':
        return <div className="icon-mts"></div>;
      case 'series4':
        return <div className="icon-series4"></div>;
      case 'series8':
        return <div className="icon-series8"></div>;
      case 'mex':
        return <div className="icon-mex"></div>;
      case 'polar':
        return <div className="icon-polar"></div>;
      case 'rdmss':
        return <div className="icon-rdmss"></div>;
      case 'ateps':
        return <div className="icon-ateps"></div>;
      case 'mecc':
        return <div className="icon-mecc"></div>;
      case 'hercon':
        return <div className="icon-hercon"></div>;
      case 'all':
        return <div className="icon-all"></div>;
      default:
        return <div className="icon-default"></div>;
    }
  };

  return (
    <div className="command-center">
      {/* Header */}
      <header className="command-header">
        <DualLogoHeader 
          title="COMMAND CENTER"
          subtitle="Shelter Configuration System"
          user={user}
        />
        <div className="header-right">
          <div className="user-info">
            <span className="user-rank">{user.rank}</span>
            <span className="user-name">{user.username}</span>
            <span className="user-clearance">{user.clearance}</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <span className="icon-logout"></span>
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="command-content">
        {/* Search and filters */}
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search shelters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"></span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span className="category-icon">{renderIcon(category.icon)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shelter grid */}
        <div className="shelter-grid">
          {filteredShelters.map(shelter => (
            <div
              key={shelter.id}
              className="shelter-card"
              onClick={() => onShelterSelect(shelter)}
            >
              <div className="shelter-icon">{renderIcon(shelter.image)}</div>
              <div className="shelter-info">
                <h3>{shelter.name}</h3>
                <p className="shelter-model">{shelter.model}</p>
                <p className="shelter-description">{shelter.description}</p>
                <div className="shelter-specs">
                  <div className="spec-item">
                    <span className="spec-label">Deployed:</span>
                    <span className="spec-value">
                      {shelter.specs.deployed.length} × {shelter.specs.deployed.width} × {shelter.specs.deployed.height}
                    </span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Stowed:</span>
                    <span className="spec-value">
                      {shelter.specs.stowed.length} × {shelter.specs.stowed.width} × {shelter.specs.stowed.height}
                    </span>
                  </div>
                </div>
              </div>
              <div className="shelter-action">
                <button className="configure-button">
                  <span className="icon-configure"></span>
                  <span>CONFIGURE</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShelters.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon"></div>
            <h3>No shelters found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="command-footer">
        <p>CLASSIFIED MILITARY SYSTEM • WEATHERHAVEN TECHNOLOGIES</p>
        <p>Total Shelters: {shelters.length} • Active User: {user.username}</p>
      </footer>
    </div>
  );
};

export default CommandCenter;
