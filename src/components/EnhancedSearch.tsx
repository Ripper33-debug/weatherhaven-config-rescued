import React, { useState, useEffect, useRef } from 'react';
import { Shelter } from '../App';

interface EnhancedSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  shelters: Shelter[];
  onShelterSelect: (shelter: Shelter) => void;
}

interface SearchSuggestion {
  type: 'shelter' | 'category' | 'feature';
  label: string;
  value: string;
  shelter?: Shelter;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  searchTerm,
  onSearchChange,
  shelters,
  onShelterSelect
}) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Generate search suggestions
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    // Shelter name matches
    shelters.forEach(shelter => {
      if (shelter.name.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: 'shelter',
          label: shelter.name,
          value: shelter.name,
          shelter
        });
      }
    });

    // Category matches
    const categories = ['TRECC', 'HERCON', 'MTS', 'Series', 'MEX-26', 'Polar', 'RDMSS', 'ATEPS', 'MECC'];
    categories.forEach(category => {
      if (category.toLowerCase().includes(term) && !newSuggestions.some(s => s.value === category)) {
        newSuggestions.push({
          type: 'category',
          label: `Category: ${category}`,
          value: category
        });
      }
    });

    // Feature matches
    const features = ['deployed', 'stowed', 'command', 'medical', 'living', 'communications'];
    features.forEach(feature => {
      if (feature.toLowerCase().includes(term)) {
        newSuggestions.push({
          type: 'feature',
          label: `Feature: ${feature}`,
          value: feature
        });
      }
    });

    setSuggestions(newSuggestions.slice(0, 8)); // Limit to 8 suggestions
  }, [searchTerm, shelters]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    if (suggestion.shelter) {
      onShelterSelect(suggestion.shelter);
    } else {
      onSearchChange(suggestion.value);
    }
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="enhanced-search" ref={searchRef}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search shelters, categories, or features... (Ctrl+K to focus)"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="search-input"
        />
        <span className="search-icon"></span>
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              <span className={`suggestion-icon ${suggestion.type}`}>
                {suggestion.type === 'shelter' ? '🏠' : 
                 suggestion.type === 'category' ? '📁' : '⚙️'}
              </span>
              <span className="suggestion-label">{suggestion.label}</span>
              {suggestion.shelter && (
                <span className="suggestion-category">{suggestion.shelter.category}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Recent Searches */}
      {!searchTerm && !showSuggestions && (
        <div className="recent-searches">
          <h4>Recent Searches</h4>
          <div className="recent-tags">
            <button className="recent-tag" onClick={() => onSearchChange('TRECC')}>
              TRECC
            </button>
            <button className="recent-tag" onClick={() => onSearchChange('command')}>
              Command
            </button>
            <button className="recent-tag" onClick={() => onSearchChange('medical')}>
              Medical
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
