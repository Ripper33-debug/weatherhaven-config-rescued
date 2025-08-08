import React, { useState } from 'react';
import { User, Shelter } from '../App';

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
    {
      id: 'trecc-t-command',
      name: 'TRECC-T Command Post',
      model: 'TRECC-T W COMMAND POST KITTING',
      category: 'command',
      description: 'Advanced command post with integrated power, HVAC, display systems, and deployable workstations.',
      image: '🛖',
      specs: {
        deployed: { length: '14.3 ft', width: '7.1 ft', height: '7.9 ft' },
        stowed: { length: '7.0 ft', width: '7.1 ft', height: '4.8 ft' }
      }
    },
    {
      id: 'trecc-s-medical',
      name: 'TRECC-S Medical Unit',
      model: 'TRECC-S MEDICAL KITTING',
      category: 'medical',
      description: 'Field hospital with surgical capabilities, patient care areas, and medical equipment integration.',
      image: '🏥',
      specs: {
        deployed: { length: '16.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '8.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-l-living',
      name: 'TRECC-L Living Quarters',
      model: 'TRECC-L LIVING KITTING',
      category: 'living',
      description: 'Comfortable living quarters with sleeping areas, dining facilities, and recreational space.',
      image: '🏠',
      specs: {
        deployed: { length: '18.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '9.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-c-communications',
      name: 'TRECC-C Communications Hub',
      model: 'TRECC-C COMMS KITTING',
      category: 'communications',
      description: 'Advanced communications center with satellite links, radio systems, and network infrastructure.',
      image: '📡',
      specs: {
        deployed: { length: '15.0 ft', width: '7.5 ft', height: '8.0 ft' },
        stowed: { length: '7.5 ft', width: '7.5 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-e-equipment',
      name: 'TRECC-E Equipment Storage',
      model: 'TRECC-E EQUIPMENT KITTING',
      category: 'storage',
      description: 'Heavy-duty storage facility for military equipment, tools, and supplies.',
      image: '📦',
      specs: {
        deployed: { length: '12.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '6.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    },
    {
      id: 'trecc-k-kitchen',
      name: 'TRECC-K Field Kitchen',
      model: 'TRECC-K KITCHEN KITTING',
      category: 'kitchen',
      description: 'Mobile kitchen with cooking facilities, food storage, and dining areas.',
      image: '🍳',
      specs: {
        deployed: { length: '14.0 ft', width: '8.0 ft', height: '8.0 ft' },
        stowed: { length: '7.0 ft', width: '8.0 ft', height: '5.0 ft' }
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Shelters', icon: '🏕️' },
    { id: 'command', name: 'Command Posts', icon: '🛖' },
    { id: 'medical', name: 'Medical Units', icon: '🏥' },
    { id: 'living', name: 'Living Quarters', icon: '🏠' },
    { id: 'communications', name: 'Communications', icon: '📡' },
    { id: 'storage', name: 'Storage', icon: '📦' },
    { id: 'kitchen', name: 'Kitchens', icon: '🍳' }
  ];

  const filteredShelters = shelters.filter(shelter => {
    const matchesCategory = selectedCategory === 'all' || shelter.category === selectedCategory;
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="command-center">
      {/* Header */}
      <header className="command-header">
        <div className="header-left">
          <h1>WEATHERHAVEN COMMAND CENTER</h1>
          <p>Military Shelter Configuration System</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-rank">{user.rank}</span>
            <span className="user-name">{user.username}</span>
            <span className="user-clearance">{user.clearance}</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <span>🚪</span>
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
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
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
              <div className="shelter-icon">{shelter.image}</div>
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
                  <span>⚙️</span>
                  <span>CONFIGURE</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShelters.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
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
