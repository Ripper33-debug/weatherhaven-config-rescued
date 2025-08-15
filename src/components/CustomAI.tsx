import React, { useState, useEffect, useRef } from 'react';
import { weatherhavenKnowledge, getShelterRecommendation, analyzeUseCase, getQuickResponse } from '../config/weatherhavenKnowledge';

interface CustomAIProps {
  onConfigurationSuggested?: (config: any) => void;
}

interface AIState {
  isOpen: boolean;
  isProcessing: boolean;
  currentQuery: string;
  conversation: Array<{
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
    data?: any;
  }>;
  currentContext: {
    lastShelter?: any;
    lastUseCase?: any;
    userPreferences?: string[];
  };
}

const CustomAI: React.FC<CustomAIProps> = ({ onConfigurationSuggested }) => {
  const [state, setState] = useState<AIState>({
    isOpen: false,
    isProcessing: false,
    currentQuery: '',
    conversation: [],
    currentContext: {}
  });

  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.conversation]);

  // Initialize with welcome message
  useEffect(() => {
    if (state.isOpen && state.conversation.length === 0) {
      const welcomeMessage = `Welcome to your custom Weatherhaven AI! 🤖

I have comprehensive knowledge about all Weatherhaven shelter systems and can help you with:

• **Shelter Recommendations** - Find the perfect shelter for your needs
• **Use Case Analysis** - Detailed scenarios and requirements
• **Technical Specifications** - Complete specs for all systems
• **Cost Estimates** - Pricing and maintenance information
• **Competitor Analysis** - How we compare to alternatives

What would you like to know about today?`;
      
      setState(prev => ({
        ...prev,
        conversation: [
          { type: 'assistant', message: welcomeMessage, timestamp: new Date() }
        ]
      }));
    }
  }, [state.isOpen]);

  // Intelligent response generation
  const generateIntelligentResponse = async (query: string): Promise<string> => {
    const queryLower = query.toLowerCase();
    
    // Check for quick responses first
    const quickResponse = getQuickResponse(query);
    if (quickResponse !== "I'm here to help you with shelter configuration and Weatherhaven solutions. Could you please provide more specific details about your requirements?") {
      return quickResponse;
    }

    // Analyze for specific shelter requests
    const shelterKeywords = ['trecc', 'field hospital', 'command center', 'research station', 'remote camp', 'camp'];
    const requestedShelter = shelterKeywords.find(keyword => queryLower.includes(keyword));
    
    if (requestedShelter) {
      const shelter = weatherhavenKnowledge.shelters.find(s => 
        s.name.toLowerCase().includes(requestedShelter) || 
        s.id.toLowerCase().includes(requestedShelter)
      );
      
      if (shelter) {
        return generateShelterResponse(shelter);
      }
    }

    // Analyze for use case scenarios
    const useCase = analyzeUseCase(query);
    if (useCase) {
      return generateUseCaseResponse(useCase);
    }

    // Analyze for requirements and recommend shelter
    const requirements = extractRequirements(query);
    if (requirements.length > 0) {
      const recommendedShelter = getShelterRecommendation(requirements);
      if (recommendedShelter) {
        return generateRecommendationResponse(recommendedShelter, requirements);
      }
    }

    // General knowledge responses
    if (queryLower.includes('cost') || queryLower.includes('price') || queryLower.includes('budget')) {
      return generateCostResponse();
    }

    if (queryLower.includes('environment') || queryLower.includes('weather') || queryLower.includes('climate')) {
      return generateEnvironmentResponse();
    }

    if (queryLower.includes('deploy') || queryLower.includes('setup') || queryLower.includes('time')) {
      return generateDeploymentResponse();
    }

    if (queryLower.includes('compare') || queryLower.includes('difference') || queryLower.includes('vs')) {
      return generateComparisonResponse();
    }

    // Default intelligent response
    return generateDefaultResponse(query);
  };

  const generateShelterResponse = (shelter: any): string => {
    return `**${shelter.name}** 🏗️

**Description:** ${shelter.description}

**Key Features:**
${shelter.keyFeatures.map(feature => `• ${feature}`).join('\n')}

**Specifications:**
• **Capacity:** ${shelter.capacity}
• **Deployment Time:** ${shelter.deploymentTime}
• **Cost Range:** ${shelter.costRange}
• **Maintenance Level:** ${shelter.maintenanceLevel}

**Best Use Cases:**
${shelter.bestUseCases.map(useCase => `• ${useCase}`).join('\n')}

**Environments:** ${shelter.environments.join(', ')}

**Unique Advantages:**
${shelter.uniqueSellingPoints.map(point => `• ${point}`).join('\n')}

Would you like me to provide more details about any specific aspect of this shelter system?`;
  };

  const generateUseCaseResponse = (useCase: any): string => {
    return `**${useCase.scenario}** 📋

**Description:** ${useCase.description}

**Requirements:**
${useCase.requirements.map(req => `• ${req}`).join('\n')}

**Recommended Shelters:** ${useCase.recommendedShelters.join(', ')}

**Key Considerations:**
${useCase.keyConsiderations.map(consideration => `• ${consideration}`).join('\n')}

**Estimated Cost:** ${useCase.estimatedCost}
**Deployment Time:** ${useCase.deploymentTime}

**Maintenance Needs:**
${useCase.maintenanceNeeds.map(need => `• ${need}`).join('\n')}

Would you like me to configure one of these recommended shelters for you?`;
  };

  const generateRecommendationResponse = (shelter: any, requirements: string[]): string => {
    return `**AI Recommendation** 🎯

Based on your requirements: *${requirements.join(', ')}*

I recommend the **${shelter.name}** for your needs.

**Why This Shelter:**
${shelter.advantages.slice(0, 4).map(advantage => `• ${advantage}`).join('\n')}

**Key Specifications:**
• **Capacity:** ${shelter.capacity}
• **Deployment:** ${shelter.deploymentTime}
• **Cost:** ${shelter.costRange}
• **Environments:** ${shelter.environments.slice(0, 3).join(', ')}

**Best Use Cases:**
${shelter.bestUseCases.slice(0, 3).map(useCase => `• ${useCase}`).join('\n')}

**Important Considerations:**
${shelter.disadvantages.slice(0, 2).map(disadvantage => `• ${disadvantage}`).join('\n')}

Would you like me to:
1. Configure this shelter for you
2. Show you alternatives
3. Provide detailed specifications
4. Compare with competitors`;
  };

  const generateCostResponse = (): string => {
    return `**Cost Overview** 💰

Here's a breakdown of Weatherhaven shelter costs:

**TRECC System:** $500,000 - $2,000,000+
- Most expensive but highest capability
- Includes all infrastructure and systems

**Field Hospital:** $1,000,000 - $5,000,000+
- Complete medical infrastructure
- Highest cost due to medical equipment

**Command & Control Center:** $300,000 - $1,500,000
- Advanced communications and displays
- Mid-range cost for tactical operations

**Research Station:** $200,000 - $800,000
- Specialized scientific equipment
- Lower cost for research applications

**Remote Camp System:** $500,000 - $5,000,000+
- Large capacity, complete infrastructure
- Cost varies with size and features

**Cost Factors:**
• Configuration complexity
• Equipment and systems included
• Capacity requirements
• Environmental protection needs
• Maintenance and support packages

Would you like a detailed cost breakdown for a specific shelter or use case?`;
  };

  const generateEnvironmentResponse = (): string => {
    return `**Environmental Capabilities** 🌍

Weatherhaven shelters are designed for extreme environments:

**Temperature Range:** -40°C to +60°C
- **Arctic:** Down to -40°C with thermal insulation
- **Desert:** Up to +60°C with enhanced cooling
- **Tropical:** High humidity protection
- **Mountain:** High altitude operation

**Environmental Protection:**
• **Dust & Sand:** Advanced filtration systems
• **Salt Spray:** Corrosion-resistant materials
• **UV Radiation:** Protective coatings
• **Wind Load:** Structural reinforcement
• **Humidity:** Moisture control systems

**Specialized Configurations:**
• **Arctic:** Enhanced insulation and heating
• **Desert:** Cooling and dust protection
• **Tropical:** Humidity and mold resistance
• **Coastal:** Salt corrosion protection
• **High Altitude:** Oxygen and pressure systems

**Certifications:** ISO environmental standards, military specifications

Which environment are you planning to deploy in?`;
  };

  const generateDeploymentResponse = (): string => {
    return `**Deployment Capabilities** ⚡

Weatherhaven offers rapid deployment solutions:

**TRECC System:** Under 30 minutes
- 4-person trained crew
- Patented quick-connect systems
- Modular expandable design

**Field Hospital:** 2-4 hours
- Complete medical infrastructure
- Sterilization systems setup
- Medical equipment integration

**Command Center:** 1-2 hours
- Communications infrastructure
- Tactical displays setup
- Security systems activation

**Research Station:** 4-8 hours
- Laboratory equipment setup
- Environmental monitoring
- Scientific systems calibration

**Remote Camp:** 1-3 days
- Large-scale infrastructure
- Multiple accommodation units
- Complete utility systems

**Deployment Factors:**
• Crew training and experience
• Site preparation requirements
• Equipment complexity
• Environmental conditions
• Infrastructure needs

**Training Available:** Deployment, maintenance, and operation training programs

What's your deployment timeline requirement?`;
  };

  const generateComparisonResponse = (): string => {
    return `**Shelter Comparison** ⚖️

**TRECC vs Field Hospital:**
• **TRECC:** Tactical, rapid deployment, multi-purpose
• **Field Hospital:** Medical-specific, complete healthcare infrastructure

**TRECC vs Command Center:**
• **TRECC:** Extreme environments, rapid deployment
• **Command Center:** Advanced communications, tactical displays

**TRECC vs Research Station:**
• **TRECC:** Military/emergency focus, rapid setup
• **Research Station:** Scientific equipment, long-term research

**TRECC vs Remote Camp:**
• **TRECC:** Small teams, rapid deployment
• **Remote Camp:** Large capacity, complete infrastructure

**Competitive Advantages:**
• **Faster deployment** than competitors
• **More extreme environments** than alternatives
• **Integrated infrastructure** vs separate systems
• **Proven military reliability** vs commercial solutions
• **Global support network** vs local providers

**vs HESCO Bastion:** More mobile, faster deployment
**vs Alaska Structures:** More extreme environments, integrated systems
**vs Rubb Buildings:** Faster deployment, military specifications

Which comparison would you like me to elaborate on?`;
  };

  const generateDefaultResponse = (query: string): string => {
    return `I understand you're asking about "${query}". Let me help you find the right information.

**I can help you with:**

🏗️ **Shelter Selection** - Find the perfect shelter for your needs
📋 **Use Case Analysis** - Detailed scenarios and requirements  
💰 **Cost Information** - Pricing and budget planning
🌍 **Environmental Capabilities** - Extreme environment protection
⚡ **Deployment Times** - Rapid setup and configuration
⚖️ **Comparisons** - How our solutions compare to alternatives

**Popular Questions:**
• "What shelter do I need for military operations?"
• "How much does a field hospital cost?"
• "What's the best shelter for arctic research?"
• "Compare TRECC to other solutions"
• "What's the deployment time for emergency response?"

Could you please provide more specific details about what you're looking for? I have comprehensive knowledge about all Weatherhaven shelter systems and can provide detailed recommendations.`;
  };

  const extractRequirements = (query: string): string[] => {
    const requirements: string[] = [];
    const queryLower = query.toLowerCase();

    // Extract capacity requirements
    if (queryLower.includes('50') || queryLower.includes('large') || queryLower.includes('many people')) {
      requirements.push('large capacity');
    }
    if (queryLower.includes('small') || queryLower.includes('few') || queryLower.includes('compact')) {
      requirements.push('small capacity');
    }

    // Extract environment requirements
    if (queryLower.includes('desert') || queryLower.includes('hot') || queryLower.includes('arid')) {
      requirements.push('desert environment');
    }
    if (queryLower.includes('arctic') || queryLower.includes('cold') || queryLower.includes('polar')) {
      requirements.push('arctic environment');
    }
    if (queryLower.includes('tropical') || queryLower.includes('humidity')) {
      requirements.push('tropical environment');
    }

    // Extract application requirements
    if (queryLower.includes('military') || queryLower.includes('tactical')) {
      requirements.push('military operations');
    }
    if (queryLower.includes('medical') || queryLower.includes('hospital')) {
      requirements.push('medical facility');
    }
    if (queryLower.includes('research') || queryLower.includes('scientific')) {
      requirements.push('research facility');
    }
    if (queryLower.includes('emergency') || queryLower.includes('disaster')) {
      requirements.push('emergency response');
    }

    // Extract deployment requirements
    if (queryLower.includes('rapid') || queryLower.includes('quick') || queryLower.includes('fast')) {
      requirements.push('rapid deployment');
    }

    return requirements;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.currentQuery.trim()) {
      const query = state.currentQuery;
      setState(prev => ({ 
        ...prev, 
        isProcessing: true,
        currentQuery: '',
        conversation: [...prev.conversation, { type: 'user', message: query, timestamp: new Date() }]
      }));

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await generateIntelligentResponse(query);
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        conversation: [...prev.conversation, { type: 'assistant', message: response, timestamp: new Date() }]
      }));
    }
  };

  const handleQuickAction = (action: string) => {
    const actions = {
      'shelter-comparison': 'Compare all Weatherhaven shelter systems',
      'cost-analysis': 'Show me cost breakdowns for all shelters',
      'use-cases': 'What are the different use case scenarios?',
      'deployment-times': 'How fast can each shelter deploy?',
      'environmental': 'What environments can each shelter handle?'
    };

    setState(prev => ({ ...prev, currentQuery: actions[action as keyof typeof actions] || action }));
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        className="custom-ai-button"
        onClick={() => setState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
        title="Your Custom Weatherhaven AI"
      >
        <span className="ai-icon">🤖</span>
        <span className="ai-label">Custom AI</span>
      </button>

      {/* AI Panel */}
      {state.isOpen && (
        <div className="custom-ai-panel">
          <div className="ai-header">
            <h3>🤖 Your Custom Weatherhaven AI</h3>
            <div className="ai-subtitle">Powered by comprehensive knowledge base</div>
            <button 
              className="close-button"
              onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
            >
              ×
            </button>
          </div>

          <div className="ai-content">
            {/* Conversation History */}
            <div className="conversation-history">
              {state.conversation.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br/>') }} />
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {state.isProcessing && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={conversationEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h4>Quick Actions:</h4>
              <div className="action-buttons">
                {[
                  { key: 'shelter-comparison', label: 'Compare Shelters', icon: '⚖️' },
                  { key: 'cost-analysis', label: 'Cost Analysis', icon: '💰' },
                  { key: 'use-cases', label: 'Use Cases', icon: '📋' },
                  { key: 'deployment-times', label: 'Deployment Times', icon: '⚡' },
                  { key: 'environmental', label: 'Environments', icon: '🌍' }
                ].map((action) => (
                  <button
                    key={action.key}
                    className="action-btn"
                    onClick={() => handleQuickAction(action.key)}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-label">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <form onSubmit={handleSubmit} className="query-form">
              <div className="input-group">
                <input
                  type="text"
                  value={state.currentQuery}
                  onChange={(e) => setState(prev => ({ ...prev, currentQuery: e.target.value }))}
                  placeholder="Ask me anything about Weatherhaven shelters..."
                  className="query-input"
                  disabled={state.isProcessing}
                />
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={state.isProcessing || !state.currentQuery.trim()}
                >
                  {state.isProcessing ? '🤔 Thinking...' : '🚀 Ask AI'}
                </button>
              </div>
            </form>

            {/* AI Capabilities */}
            <div className="ai-capabilities">
              <div className="capability-item">
                <span className="capability-icon">🏗️</span>
                <span className="capability-text">5 Shelter Types</span>
              </div>
              <div className="capability-item">
                <span className="capability-icon">📋</span>
                <span className="capability-text">8 Use Cases</span>
              </div>
              <div className="capability-item">
                <span className="capability-icon">💰</span>
                <span className="capability-text">Cost Analysis</span>
              </div>
              <div className="capability-item">
                <span className="capability-icon">⚖️</span>
                <span className="capability-text">Comparisons</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomAI;
