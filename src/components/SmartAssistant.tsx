import React, { useState, useEffect } from 'react';
import { Shelter, InteriorConfig } from '../App';
import { weatherhavenKnowledge, getQuickResponse, aiResponseTemplates } from '../config/weatherhavenKnowledge';

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

  // Initialize with welcome message
  useEffect(() => {
    if (state.isOpen && state.conversation.length === 0) {
      const welcomeMessage = aiResponseTemplates.greetings[Math.floor(Math.random() * aiResponseTemplates.greetings.length)];
      setState(prev => ({
        ...prev,
        conversation: [
          { type: 'assistant', message: welcomeMessage, timestamp: new Date() }
        ]
      }));
    }
  }, [state.isOpen]);

  // AI-powered configuration suggestions with Weatherhaven knowledge
  const generateSuggestions = async (query: string) => {
    setState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions = analyzeRequirementsWithKnowledge(query, availableShelters, availableInteriors);
    const response = generateIntelligentResponse(query, suggestions);
    
    setState(prev => ({
      ...prev,
      isProcessing: false,
      suggestions,
      conversation: [
        ...prev.conversation,
        { type: 'user', message: query, timestamp: new Date() },
        { type: 'assistant', message: response, timestamp: new Date() }
      ]
    }));
  };

  const analyzeRequirementsWithKnowledge = (query: string, shelters: Shelter[], interiors: InteriorConfig[]) => {
    const queryLower = query.toLowerCase();
    const suggestions = [];

    // Check for quick responses first
    const quickResponse = getQuickResponse(query);
    if (quickResponse !== "I'm here to help you with TRECC configuration and Weatherhaven solutions. Could you please provide more specific details about your requirements?") {
      return [{
        type: 'information',
        recommendation: 'Weatherhaven Information',
        reasoning: quickResponse,
        priority: 'high'
      }];
    }

    // Analyze military applications
    if (queryLower.includes('military') || queryLower.includes('command') || queryLower.includes('tactical')) {
      const militaryApp = weatherhavenKnowledge.applications.find(app => app.sector === 'Military & Defense');
      suggestions.push({
        type: 'application',
        recommendation: 'Military & Defense Configuration',
        reasoning: `Based on Weatherhaven's expertise in military applications, I recommend a TRECC system configured for ${militaryApp?.sector}. Key features include: ${militaryApp?.requirements.slice(0, 3).join(', ')}.`,
        priority: 'high',
        details: militaryApp
      });
    }

    // Analyze emergency response
    if (queryLower.includes('emergency') || queryLower.includes('disaster') || queryLower.includes('response')) {
      const emergencyApp = weatherhavenKnowledge.applications.find(app => app.sector === 'Emergency Response');
      suggestions.push({
        type: 'application',
        recommendation: 'Emergency Response Configuration',
        reasoning: `For emergency response scenarios, Weatherhaven's TRECC systems provide: ${emergencyApp?.benefits.slice(0, 3).join(', ')}.`,
        priority: 'high',
        details: emergencyApp
      });
    }

    // Analyze medical applications
    if (queryLower.includes('medical') || queryLower.includes('hospital') || queryLower.includes('healthcare')) {
      suggestions.push({
        type: 'configuration',
        recommendation: 'Medical Treatment Facility',
        reasoning: `TRECC systems can be configured as complete medical facilities with operating rooms, patient care areas, and medical equipment integration. Based on Weatherhaven's field hospital experience, this configuration includes sterile environment maintenance and emergency power systems.`,
        priority: 'high'
      });
    }

    // Analyze environmental requirements
    if (queryLower.includes('desert') || queryLower.includes('hot') || queryLower.includes('arid')) {
      suggestions.push({
        type: 'environment',
        recommendation: 'Desert Environment Configuration',
        reasoning: `TRECC systems are proven in desert environments up to +60°C. Weatherhaven's desert configurations include enhanced cooling systems, UV protection, and dust filtration.`,
        priority: 'medium'
      });
    }

    if (queryLower.includes('arctic') || queryLower.includes('cold') || queryLower.includes('polar')) {
      suggestions.push({
        type: 'environment',
        recommendation: 'Arctic Environment Configuration',
        reasoning: `TRECC systems operate in arctic conditions down to -40°C. Weatherhaven's arctic configurations include thermal insulation, heating systems, and cold-weather materials.`,
        priority: 'medium'
      });
    }

    // Analyze capacity requirements
    if (queryLower.includes('50') || queryLower.includes('large') || queryLower.includes('many people')) {
      suggestions.push({
        type: 'capacity',
        recommendation: 'High-Capacity Configuration',
        reasoning: `TRECC systems can accommodate up to 50 personnel. Weatherhaven's modular design allows expansion from 20ft to 40ft with flexible interior configurations for large groups.`,
        priority: 'high'
      });
    }

    if (queryLower.includes('small') || queryLower.includes('few') || queryLower.includes('compact')) {
      suggestions.push({
        type: 'capacity',
        recommendation: 'Compact Configuration',
        reasoning: `For smaller groups, TRECC systems can be configured in compact 20ft mode while maintaining all essential features. Weatherhaven's modular design ensures efficiency for small teams.`,
        priority: 'medium'
      });
    }

    // Analyze deployment requirements
    if (queryLower.includes('rapid') || queryLower.includes('quick') || queryLower.includes('fast')) {
      suggestions.push({
        type: 'deployment',
        recommendation: 'Rapid Deployment Configuration',
        reasoning: `TRECC systems deploy in under 30 minutes with a trained 4-person crew. Weatherhaven's patented quick-connect systems and modular design enable rapid setup for urgent operations.`,
        priority: 'high'
      });
    }

    // Default TRECC recommendation
    if (suggestions.length === 0) {
      suggestions.push({
        type: 'general',
        recommendation: 'Standard TRECC Configuration',
        reasoning: `Based on Weatherhaven's 40+ years of experience, I recommend a standard TRECC configuration with rapid deployment capability, extreme environment protection, and modular expandable design. This provides maximum flexibility for various operational requirements.`,
        priority: 'medium'
      });
    }

    return suggestions;
  };

  const generateIntelligentResponse = (query: string, suggestions: any[]): string => {
    const queryLower = query.toLowerCase();
    
    // Use Weatherhaven knowledge for specific responses
    if (queryLower.includes('company') || queryLower.includes('weatherhaven')) {
      return `Weatherhaven, founded in 1983, is the world's leading provider of deployable shelter systems. We specialize in rapid deployment solutions for military, disaster response, remote industry, and research applications. Our mission is to provide innovative, reliable, and sustainable shelter solutions that enable human achievement in the world's most challenging environments. We've been deployed in over 50 countries worldwide and are trusted by military forces globally.`;
    }

    if (queryLower.includes('trecc') || queryLower.includes('tactical')) {
      return `TRECC (Tactical Redeployable Expandable Container Capability) is Weatherhaven's flagship tactical shelter system. It deploys in under 30 minutes, operates in temperatures from -40°C to +60°C, and can accommodate up to 50 personnel. The modular design expands from 20ft to 40ft with integrated power, HVAC, and communications systems. TRECC is designed for rapid deployment in military and emergency response operations, providing a complete infrastructure solution in a compact, transportable package.`;
    }

    if (suggestions.length === 0) {
      return "I understand your requirements. Let me suggest a standard TRECC configuration that would work well for your needs based on Weatherhaven's 40+ years of experience in deployable shelter systems.";
    }

    const response = `Based on your requirements and Weatherhaven's expertise, I recommend:\n\n${suggestions.map(s => 
      `• **${s.recommendation}** - ${s.reasoning}`
    ).join('\n\n')}\n\nWould you like me to configure this TRECC system for you? I can also provide detailed specifications, deployment procedures, and support information.`;

    return response;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.currentQuery.trim()) {
      generateSuggestions(state.currentQuery);
      setState(prev => ({ ...prev, currentQuery: '' }));
    }
  };

  const applySuggestion = (suggestion: any) => {
    onConfigurationSuggested(suggestion);
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const getWeatherhavenFact = () => {
    const facts = [
      "Weatherhaven has been deployed in over 50 countries worldwide.",
      "TRECC systems deploy in under 30 minutes with a trained crew.",
      "Weatherhaven shelters operate in temperatures from -40°C to +60°C.",
      "Founded in 1983, Weatherhaven has 40+ years of innovation.",
      "TRECC systems can accommodate up to 50 personnel.",
      "Weatherhaven is trusted by military forces globally."
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <button
        className="smart-assistant-button"
        onClick={() => setState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
        title="Weatherhaven AI Assistant"
      >
        <span className="assistant-icon">🤖</span>
        <span className="assistant-label">Weatherhaven AI</span>
      </button>

      {/* Assistant Panel */}
      {state.isOpen && (
        <div className="smart-assistant-panel">
          <div className="assistant-header">
            <h3>🤖 Weatherhaven AI Assistant</h3>
            <div className="assistant-subtitle">Powered by 40+ years of Weatherhaven expertise</div>
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
                <h4>Recommended TRECC Configuration:</h4>
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
                  placeholder="Ask about TRECC, Weatherhaven, or describe your needs..."
                  className="query-input"
                  disabled={state.isProcessing}
                />
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={state.isProcessing || !state.currentQuery.trim()}
                >
                  {state.isProcessing ? '🤔 Analyzing...' : '🚀 Get TRECC Solution'}
                </button>
              </div>
            </form>

            {/* Quick Examples */}
            <div className="quick-examples">
              <h4>Quick Examples:</h4>
              <div className="example-buttons">
                {[
                  "Tell me about Weatherhaven",
                  "What is TRECC?",
                  "Military command post",
                  "Emergency response facility",
                  "Desert environment setup",
                  "Medical facility configuration"
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

            {/* Weatherhaven Fact */}
            <div className="weatherhaven-fact">
              <div className="fact-icon">💡</div>
              <div className="fact-text">{getWeatherhavenFact()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartAssistant;
