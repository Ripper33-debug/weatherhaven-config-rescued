'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'agent';
  timestamp: Date;
  type: 'text' | 'quote' | 'video' | 'product';
  data?: any;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  deployment: string;
  capacity: string;
  description: string;
}

export default function AdvancedChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [language, setLanguage] = useState('en');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'Tactical Command Center',
      category: 'Military & Defense',
      price: '$250,000 - $500,000',
      deployment: '4-6 hours',
      capacity: '20-50 personnel',
      description: 'Advanced command and control facility for military operations'
    },
    {
      id: '2',
      name: 'Field Hospital System',
      category: 'Healthcare',
      price: '$300,000 - $750,000',
      deployment: '6-8 hours',
      capacity: '50-100 patients',
      description: 'Complete medical facility for emergency and routine care'
    },
    {
      id: '3',
      name: 'Emergency Relief Shelter',
      category: 'Disaster Response',
      price: '$50,000 - $150,000',
      deployment: '2-4 hours',
      capacity: '100-500 people',
      description: 'Immediate shelter solution for disaster victims'
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const agents = [
    { id: '1', name: 'Sarah Johnson', role: 'Sales Engineer', avatar: '👩‍💼', available: true },
    { id: '2', name: 'Mike Chen', role: 'Technical Specialist', avatar: '👨‍💻', available: true },
    { id: '3', name: 'Dr. Emily Rodriguez', role: 'Solutions Architect', avatar: '👩‍🔬', available: false }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addMessage({
          id: '1',
          text: 'Hello! I\'m Weatherhaven AI Assistant. I can help you with product information, instant quotes, and connect you with our experts. How can I assist you today?',
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        });
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateQuote = (requirements: string) => {
    // Simulate quote generation
    const quote = {
      id: Date.now().toString(),
      requirements,
      estimatedPrice: '$150,000 - $300,000',
      deploymentTime: '4-6 hours',
      recommendedProduct: 'Tactical Command Center',
      validity: '30 days',
      includes: ['Shelter system', 'Basic equipment', 'Deployment support', 'Training']
    };

    addMessage({
      id: Date.now().toString(),
      text: `Here's your instant quote based on your requirements:`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'quote',
      data: quote
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'text' as const
    };

    addMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('quote') || lowerInput.includes('price') || lowerInput.includes('cost')) {
        generateQuote(inputValue);
      } else if (lowerInput.includes('product') || lowerInput.includes('shelter')) {
        const product = products.find(p => 
          lowerInput.includes(p.name.toLowerCase()) || 
          lowerInput.includes(p.category.toLowerCase())
        );
        
        if (product) {
          addMessage({
            id: Date.now().toString(),
            text: `Here's information about the ${product.name}:`,
            sender: 'ai',
            timestamp: new Date(),
            type: 'product',
            data: product
          });
        } else {
          addMessage({
            id: Date.now().toString(),
            text: 'I can help you find the right product. What type of shelter do you need? (Military, Healthcare, Disaster Response, or Industrial?)',
            sender: 'ai',
            timestamp: new Date(),
            type: 'text'
          });
        }
      } else if (lowerInput.includes('video') || lowerInput.includes('consultation') || lowerInput.includes('expert')) {
        addMessage({
          id: Date.now().toString(),
          text: 'I can connect you with one of our experts for a video consultation. Would you like to schedule one?',
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        });
      } else {
        addMessage({
          id: Date.now().toString(),
          text: 'I can help you with product information, instant quotes, or connect you with our experts. What would you like to know?',
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        });
      }
    }, 1500);
  };

  const startVideoCall = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setCurrentAgent(agent.name);
      setShowVideoCall(true);
      addMessage({
        id: Date.now().toString(),
        text: `Connecting you with ${agent.name} for a video consultation...`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'video'
      });
    }
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'quote':
        return (
          <div style={{
            background: 'rgba(72, 187, 120, 0.1)',
            border: '1px solid rgba(72, 187, 120, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '8px'
          }}>
            <h4 style={{ color: '#48bb78', marginBottom: '12px', fontSize: '0.875rem', fontWeight: '600' }}>
              INSTANT QUOTE
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
              <div><strong>Requirements:</strong> {message.data.requirements}</div>
              <div><strong>Estimated Price:</strong> {message.data.estimatedPrice}</div>
              <div><strong>Deployment Time:</strong> {message.data.deploymentTime}</div>
              <div><strong>Recommended:</strong> {message.data.recommendedProduct}</div>
              <div><strong>Valid Until:</strong> {message.data.validity}</div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <strong style={{ fontSize: '0.75rem', color: '#e2e8f0' }}>Includes:</strong>
              <ul style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '4px', paddingLeft: '16px' }}>
                {message.data.includes.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'product':
        return (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '8px'
          }}>
            <h4 style={{ color: '#f7fafc', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '600' }}>
              {message.data.name}
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
              <div><strong>Category:</strong> {message.data.category}</div>
              <div><strong>Price:</strong> {message.data.price}</div>
              <div><strong>Deployment:</strong> {message.data.deployment}</div>
              <div><strong>Capacity:</strong> {message.data.capacity}</div>
              <div style={{ marginTop: '8px' }}>{message.data.description}</div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📹</span>
              <span style={{ fontSize: '0.875rem', color: '#3b82f6', fontWeight: '600' }}>
                Video Consultation
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
              Connecting you with {currentAgent}...
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        💬
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              width: '400px',
              height: '600px',
              background: 'rgba(26, 32, 44, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '1.2rem' }}>🤖</div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f7fafc' }}>
                    Weatherhaven AI
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#48bb78' }}>
                    Online • 24/7 Support
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Language Selector */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    color: '#f7fafc'
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a0aec0',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: message.sender === 'user' ? '#ffffff' : '#f7fafc',
                    fontSize: '0.875rem',
                    lineHeight: '1.4'
                  }}>
                    {message.text}
                    {renderMessage(message)}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#a0aec0',
                    fontSize: '0.875rem'
                  }}>
                    AI is typing...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => generateQuote('Emergency shelter for 100 people')}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: '#f7fafc',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Get Quote
              </button>
              <button
                onClick={() => startVideoCall('1')}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '16px',
                  color: '#3b82f6',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Video Call
              </button>
              <button
                onClick={() => addMessage({
                  id: Date.now().toString(),
                  text: 'Here are our available products:',
                  sender: 'ai',
                  timestamp: new Date(),
                  type: 'text'
                })}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: '#f7fafc',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Products
              </button>
            </div>

            {/* Input */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#f7fafc',
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Call Modal */}
      <AnimatePresence>
        {showVideoCall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1002,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'rgba(26, 32, 44, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                maxWidth: '400px'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📹</div>
              <h3 style={{ color: '#f7fafc', marginBottom: '8px' }}>
                Video Consultation
              </h3>
              <p style={{ color: '#a0aec0', marginBottom: '24px' }}>
                Connecting you with {currentAgent}...
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowVideoCall(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#f7fafc',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Join Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
