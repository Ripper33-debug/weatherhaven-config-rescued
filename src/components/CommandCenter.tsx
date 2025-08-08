import React, { useState, useEffect } from 'react';
import { User, Shelter, ShelterConfiguration } from '../App';
import DualLogoHeader from './DualLogoHeader';
import './CommandCenter.css';

interface CommandCenterProps {
  user: User;
  onLogout: () => void;
  onShelterSelect: (shelter: Shelter, configuration?: ShelterConfiguration) => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ user, onLogout, onShelterSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchTerm('');
        setSelectedCategory('all');
      }
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'k') {
          event.preventDefault();
          const searchInput = document.querySelector('.search-input') as HTMLInputElement;
          searchInput?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Shelter catalog data - Main shelter types with configurations
  const shelters: Shelter[] = [
    // TRECC
    {
      id: 'trecc',
      name: 'TRECC',
      model: 'TACTICAL REDEPLOYABLE EXPANDABLE CONTAINER CAPABILITY™',
      category: 'trecc',
      description: 'Lightweight, extended-height expandable container known for its unmatched capability and versatile shipping configuration.',
      image: 'trecc',
      modelPath: '/models/trecc-main.glb',
      specs: {
        deployed: { length: '14.3 ft', width: '7.1 ft', height: '7.9 ft' },
        stowed: { length: '7.0 ft', width: '7.1 ft', height: '4.8 ft' }
      },
      configurations: [
        {
          id: 'trecc-command',
          name: 'Command Post',
          description: 'Advanced command post with integrated power, HVAC, display systems, and deployable workstations.',
          category: 'command',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-command.glb'
        },
        {
          id: 'trecc-medical',
          name: 'Medical Unit',
          description: 'Field hospital with surgical capabilities, patient care areas, and medical equipment integration.',
          category: 'medical',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-medical.glb'
        },
        {
          id: 'trecc-living',
          name: 'Living Quarters',
          description: 'Comfortable living quarters with sleeping areas, dining facilities, and recreational space.',
          category: 'living',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-living.glb'
        },
        {
          id: 'trecc-communications',
          name: 'Communications Hub',
          description: 'Advanced communications center with satellite systems, radio equipment, and network infrastructure.',
          category: 'communications',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-communications.glb'
        },
        {
          id: 'trecc-storage',
          name: 'Equipment Storage',
          description: 'Secure storage facility with climate control, inventory management, and equipment maintenance areas.',
          category: 'storage',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-storage.glb'
        },
        {
          id: 'trecc-kitchen',
          name: 'Field Kitchen',
          description: 'Mobile kitchen with cooking facilities, food storage, and dining areas.',
          category: 'kitchen',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-kitchen.glb'
        },
        {
          id: 'trecc-drone-manufacturing',
          name: 'Drone Manufacturing',
          description: 'Advanced drone manufacturing facility with assembly lines, testing equipment, and quality control systems.',
          category: 'manufacturing',
          modelPath: '/models/trecc-main.glb',
          interiorPath: '/models/interiors/trecc-drone-manufacturing.glb'
        }
      ]
    },
    
    // HERCON
    {
      id: 'hercon',
      name: 'HERCON',
      model: 'HARDWALL EXPANDABLE REDEPLOYABLE CONTAINER™',
      category: 'hercon',
      description: 'Breakthrough hard-walled expandable container shelter. Available in 4\' and 8\' wide configurations with various interior layouts.',
      image: 'hercon',
      modelPath: '/models/hercon-main.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '20.0 ft', width: '4.0 ft', height: '8.0 ft' }
      },
      configurations: [
        {
          id: 'hercon-command',
          name: 'Command Post',
          description: 'Hard-walled command center with integrated systems and secure communications.',
          category: 'command',
          modelPath: '/models/hercon-main.glb',
          interiorPath: '/models/interiors/hercon-command.glb'
        },
        {
          id: 'hercon-medical',
          name: 'Medical Facility',
          description: 'Hard-walled medical facility with surgical suites and patient care areas.',
          category: 'medical',
          modelPath: '/models/hercon-main.glb',
          interiorPath: '/models/interiors/hercon-medical.glb'
        },
        {
          id: 'hercon-living',
          name: 'Living Quarters',
          description: 'Comfortable hard-walled living quarters for extended deployments.',
          category: 'living',
          modelPath: '/models/hercon-main.glb',
          interiorPath: '/models/interiors/hercon-living.glb'
        },
        {
          id: 'hercon-storage',
          name: 'Equipment Storage',
          description: 'Secure hard-walled storage facility for sensitive equipment.',
          category: 'storage',
          modelPath: '/models/hercon-main.glb',
          interiorPath: '/models/interiors/hercon-storage.glb'
        }
      ]
    },
    
    // MTS
    {
      id: 'mts',
      name: 'MTS',
      model: 'MODULAR TENTAGE SYSTEM',
      category: 'mts',
      description: 'The most thermally efficient and robust tactical shelter in the world. Used for field applications and popular with military forces for operations centres and medical facilities.',
      image: 'mts',
      modelPath: '/models/mts-main.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '10.0 ft', width: '10.0 ft', height: '6.0 ft' }
      },
      configurations: [
        {
          id: 'mts-standard',
          name: 'Standard Configuration',
          description: 'Standard MTS configuration for general field applications.',
          category: 'standard',
          modelPath: '/models/mts-main.glb',
          interiorPath: '/models/interiors/mts-standard.glb'
        },
        {
          id: 'mts-medical',
          name: 'Medical Facility',
          description: 'Medical facility configuration with surgical suites, patient care areas, and medical equipment.',
          category: 'medical',
          modelPath: '/models/mts-main.glb',
          interiorPath: '/models/interiors/mts-medical.glb'
        }
      ]
    },
    
    // Series
    {
      id: 'series',
      name: 'Series',
      model: 'SERIES SHELTERS',
      category: 'series',
      description: 'High-performance shelters used worldwide by commercial and military customers in all climates. Includes Series 4 and Series 8 variants with various interior configurations.',
      image: 'series',
      modelPath: '/models/series-main.glb',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '7.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      },
      configurations: [
        {
          id: 'series-standard',
          name: 'Standard Configuration',
          description: 'Standard Series shelter configuration for workforce housing and military accommodation.',
          category: 'standard',
          modelPath: '/models/series-main.glb',
          interiorPath: '/models/interiors/series-standard.glb'
        },
        {
          id: 'series-tropical',
          name: 'Tropical Configuration',
          description: 'Tropical version with side windows for maximum ventilation in hot environments.',
          category: 'tropical',
          modelPath: '/models/series-main.glb',
          interiorPath: '/models/interiors/series-tropical.glb'
        },
        {
          id: 'series-shop',
          name: 'Shop Configuration',
          description: 'Extended-height structure ideal for applications requiring additional vertical space.',
          category: 'shop',
          modelPath: '/models/series-main.glb',
          interiorPath: '/models/interiors/series-shop.glb'
        }
      ]
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
      specs: {
        deployed: { length: '26.0 ft', width: '12.0 ft', height: '10.0 ft' },
        stowed: { length: '13.0 ft', width: '12.0 ft', height: '7.0 ft' }
      },
      configurations: [
        {
          id: 'mex26-maintenance',
          name: 'Maintenance Facility',
          description: 'Specialized maintenance facility for armoured vehicle and helicopter maintenance.',
          category: 'maintenance',
          modelPath: '/models/mex26-main.glb',
          interiorPath: '/models/interiors/mex26-maintenance.glb'
        }
      ]
    },
    
    // Polar
    {
      id: 'polar',
      name: 'Polar',
      model: 'POLAR SHELTERS',
      category: 'polar',
      description: 'Includes Polarhaven, Polar Chief, and Endurance shelters designed to perform in high winds, snow, and extremely low temperatures.',
      image: 'polar',
      modelPath: '/models/polar-main.glb',
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '9.0 ft' },
        stowed: { length: '10.0 ft', width: '12.0 ft', height: '7.0 ft' }
      },
      configurations: [
        {
          id: 'polar-standard',
          name: 'Standard Configuration',
          description: 'Standard polar shelter configuration for extreme cold environments.',
          category: 'standard',
          modelPath: '/models/polar-main.glb',
          interiorPath: '/models/interiors/polar-standard.glb'
        }
      ]
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
      specs: {
        deployed: { length: '24.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '12.0 ft', width: '12.0 ft', height: '6.0 ft' }
      },
      configurations: [
        {
          id: 'rdmss-standard',
          name: 'Standard Configuration',
          description: 'Standard RDMSS configuration for rapid deployment applications.',
          category: 'standard',
          modelPath: '/models/rdmss-main.glb',
          interiorPath: '/models/interiors/rdmss-standard.glb'
        }
      ]
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
      specs: {
        deployed: { length: '20.0 ft', width: '10.0 ft', height: '8.0 ft' },
        stowed: { length: '10.0 ft', width: '10.0 ft', height: '6.0 ft' }
      },
      configurations: [
        {
          id: 'ateps-standard',
          name: 'Standard Configuration',
          description: 'Standard ATEPS configuration for forward operating bases and medical facilities.',
          category: 'standard',
          modelPath: '/models/ateps-main.glb',
          interiorPath: '/models/interiors/ateps-standard.glb'
        }
      ]
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
      specs: {
        deployed: { length: '20.0 ft', width: '12.0 ft', height: '8.0 ft' },
        stowed: { length: '20.0 ft', width: '8.0 ft', height: '8.0 ft' }
      },
      configurations: [
        {
          id: 'mecc-standard',
          name: 'Standard Configuration',
          description: 'Standard MECC configuration combining fabric shelter technology with ISO container standard.',
          category: 'standard',
          modelPath: '/models/mecc-main.glb',
          interiorPath: '/models/interiors/mecc-standard.glb'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Shelters', icon: 'all' },
    { id: 'trecc', name: 'TRECC', icon: 'trecc' },
    { id: 'hercon', name: 'HERCON', icon: 'hercon' },
    { id: 'mts', name: 'MTS', icon: 'mts' },
    { id: 'series', name: 'Series', icon: 'series' },
    { id: 'mex', name: 'MEX-26', icon: 'mex' },
    { id: 'polar', name: 'Polar', icon: 'polar' },
    { id: 'rdmss', name: 'RDMSS', icon: 'rdmss' },
    { id: 'ateps', name: 'ATEPS', icon: 'ateps' },
    { id: 'mecc', name: 'MECC', icon: 'mecc' }
  ];

  const filteredShelters = shelters
    .filter(shelter => {
      const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shelter.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shelter.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || shelter.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.category.localeCompare(b.category);
      }
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
      case 'series':
        return <div className="icon-series"></div>;
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
              placeholder="Search shelters... (Ctrl+K to focus)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"></span>
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                title={`Filter by ${category.name}`}
              >
                <span className="category-icon">{renderIcon(category.icon)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Sort Options */}
          <div className="sort-controls">
            <label className="sort-label">Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
              className="sort-dropdown"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>Showing {filteredShelters.length} of {shelters.length} shelters</p>
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
                  <div className="spec-group">
                    <span className="spec-label">Deployed:</span>
                    <span className="spec-value">
                      {shelter.specs.deployed.length} × {shelter.specs.deployed.width} × {shelter.specs.deployed.height}
                    </span>
                  </div>
                  <div className="spec-group">
                    <span className="spec-label">Stowed:</span>
                    <span className="spec-value">
                      {shelter.specs.stowed.length} × {shelter.specs.stowed.width} × {shelter.specs.stowed.height}
                    </span>
                  </div>
                </div>
                
                {/* Available configurations info */}
                {shelter.configurations && shelter.configurations.length > 0 && (
                  <div className="configurations-info">
                    <span className="configurations-label">
                      Available Configurations: {shelter.configurations.length}
                    </span>
                  </div>
                )}
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
