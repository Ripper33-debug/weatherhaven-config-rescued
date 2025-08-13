import React, { useState, useEffect } from 'react';
import { Shelter, InteriorConfig } from '../App';

interface SmartAssistantProps {
  onConfigurationSuggested: (config: any) => void;
  availableShelters: Shelter[];
  availableInteriors: InteriorConfig[];
}

interface AssistantState {
  isOpen: boolean;
  isProcessing: boolean;
  currentQuery: string;
  suggestions: any[];
  conversation: Array<{
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
  }>;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({
  onConfigurationSuggested,
  availableShelters,
  availableInteriors
}) => {
  const [state, setState] = useState<AssistantState>({
    isOpen: false,
    isProcessing: false,
    currentQuery: '',
    suggestions: [],
    conversation: []
  });

  // AI-powered configuration suggestions
  const generateSuggestions = async (query: string) => {
    setState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions = analyzeRequirements(query, availableShelters, availableInteriors);
    
    setState(prev => ({
      ...prev,
      isProcessing: false,
      suggestions,
      conversation: [
        ...prev.conversation,
        { type: 'user', message: query, timestamp: new Date() },
        { type: 'assistant', message: generateResponse(suggestions), timestamp: new Date() }
      ]
    }));
  };

  const analyzeRequirements = (query: string, shelters: Shelter[], interiors: InteriorConfig[]) => {
    const queryLower = query.toLowerCase();
    const suggestions = [];

    // Analyze use case
    if (queryLower.includes('medical') || queryLower.includes('hospital')) {
      suggestions.push({
        type: 'shelter',
        recommendation: 'Medical Command Post',
        reasoning: 'Medical facilities require specialized layouts and equipment mounting',
        priority: 'high'
      });
    }

    if (queryLower.includes('military') || queryLower.includes('command')) {
      suggestions.push({
        type: 'shelter',
        recommendation: 'Command & Control Center',
        reasoning: 'Military operations need secure communications and tactical planning space',
        priority: 'high'
      });
    }

    if (queryLower.includes('desert') || queryLower.includes('hot')) {
      suggestions.push({
        type: 'environment',
        recommendation: 'Desert Tan with Enhanced Cooling',
        reasoning: 'Desert environments require heat-resistant materials and advanced HVAC',
        priority: 'medium'
      });
    }

    if (queryLower.includes('arctic') || queryLower.includes('cold')) {
      suggestions.push({
        type: 'environment',
        recommendation: 'Arctic White with Insulation',
        reasoning: 'Cold environments need thermal insulation and heating systems',
        priority: 'medium'
      });
    }

    if (queryLower.includes('50') || queryLower.includes('large')) {
      suggestions.push({
        type: 'capacity',
        recommendation: 'Multiple Unit Configuration',
        reasoning: 'Large capacity requires multiple shelters or specialized layouts',
        priority: 'high'
      });
    }

    return suggestions;
  };

  const generateResponse = (suggestions: any[]) => {
    if (suggestions.length === 0) {
      return "I understand your requirements. Let me suggest a standard configuration that would work well for your needs.";
    }

    const response = `Based on your requirements, I recommend:\n\n${suggestions.map(s => 
      `• ${s.recommendation} - ${s.reasoning}`
    ).join('\n')}\n\nWould you like me to configure this for you?`;

    return response;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.currentQuery.trim()) {
      generateSuggestions(state.currentQuery);
    }
  };

  const applySuggestion = (suggestion: any) => {
    onConfigurationSuggested(suggestion);
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <button
        className="smart-assistant-button"
        onClick={() => setState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
        title="Smart Configuration Assistant"
      >
        <span className="assistant-icon">🤖</span>
        <span className="assistant-label">AI Assistant</span>
      </button>

      {/* Assistant Panel */}
      {state.isOpen && (
        <div className="smart-assistant-panel">
          <div className="assistant-header">
            <h3>🤖 Smart Configuration Assistant</h3>
            <button 
              className="close-button"
              onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
            >
              ×
            </button>
          </div>

          <div className="assistant-content">
            {/* Conversation History */}
            <div className="conversation-history">
              {state.conversation.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">{msg.message}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Suggestions */}
            {state.suggestions.length > 0 && (
              <div className="suggestions-panel">
                <h4>Recommended Configuration:</h4>
                {state.suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    <div className="suggestion-header">
                      <span className="suggestion-type">{suggestion.type}</span>
                      <span className={`priority ${suggestion.priority}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                    <div className="suggestion-title">{suggestion.recommendation}</div>
                    <div className="suggestion-reasoning">{suggestion.reasoning}</div>
                    <button 
                      className="apply-suggestion-btn"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      Apply This Configuration
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Query Input */}
            <form onSubmit={handleSubmit} className="query-form">
              <div className="input-group">
                <input
                  type="text"
                  value={state.currentQuery}
                  onChange={(e) => setState(prev => ({ ...prev, currentQuery: e.target.value }))}
                  placeholder="Describe your needs (e.g., 'I need a medical facility for 50 people in desert conditions')"
                  className="query-input"
                  disabled={state.isProcessing}
                />
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={state.isProcessing || !state.currentQuery.trim()}
                >
                  {state.isProcessing ? '🤔 Thinking...' : '🚀 Get Suggestions'}
                </button>
              </div>
            </form>

            {/* Quick Examples */}
            <div className="quick-examples">
              <h4>Quick Examples:</h4>
              <div className="example-buttons">
                {[
                  "Medical facility for 20 people",
                  "Military command post in desert",
                  "Arctic research station",
                  "Emergency response center"
                ].map((example, index) => (
                  <button
                    key={index}
                    className="example-btn"
                    onClick={() => setState(prev => ({ ...prev, currentQuery: example }))}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartAssistant;
