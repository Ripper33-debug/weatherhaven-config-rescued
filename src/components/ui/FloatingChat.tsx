'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with your shelter needs. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    "Tell me about your products",
    "Request a quote",
    "Technical specifications",
    "Deployment timeline"
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Great question! Our deployable shelters can be set up in under 24 hours. Would you like me to connect you with our technical team?",
        "I'd be happy to help you get a quote. Could you tell me a bit about your specific requirements and timeline?",
        "Our shelters are designed for extreme environments and come with military-grade specifications. What's your primary use case?",
        "Perfect! Our team can have a system deployed within 24-48 hours depending on your location and requirements."
      ];

      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Widget */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '180px',
            right: '24px',
            width: '350px',
            height: '500px',
            background: 'rgba(26, 32, 44, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
            color: 'white',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🤖
              </div>
              <div>
                <div style={{
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  Weatherhaven Assistant
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.8
                }}>
                  Online • Ready to help
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)'
                    : '#f7fafc',
                  color: message.sender === 'user' ? 'white' : '#2d3748',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  lineHeight: '1.4'
                }}>
                  {message.text}
                </div>
              </motion.div>
            ))}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  color: '#a0aec0',
                  marginBottom: '8px'
                }}>
                  Quick replies:
                </div>
                {quickReplies.map((reply, index) => (
                  <motion.button
                    key={reply}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSendMessage(reply)}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(45, 55, 72, 0.1)',
                      border: '1px solid rgba(45, 55, 72, 0.2)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {reply}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Chat Input */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#e2e8f0'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(inputValue)}
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ➤
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
