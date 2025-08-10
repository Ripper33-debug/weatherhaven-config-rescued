'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would send to your newsletter service
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{
      padding: '80px 0',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '16px'
          }}>
            STAY UPDATED
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Get the latest updates on new products, case studies, and industry insights delivered to your inbox.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '16px'
                }}>
                  ✅
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  THANK YOU!
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '1rem'
                }}>
                  You've been successfully subscribed to our newsletter.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  {error && (
                    <div style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '8px',
                      textAlign: 'left'
                    }}>
                      {error}
                    </div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  style={{
                    padding: '16px 32px',
                    background: isSubmitting ? 'rgba(255, 255, 255, 0.3)' : 'white',
                    color: 'black',
                    fontWeight: '500',
                    fontSize: '16px',
                    letterSpacing: '0.025em',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(0, 0, 0, 0.3)',
                        borderTop: '2px solid black',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      SUBSCRIBING...
                    </>
                  ) : (
                    'SUBSCRIBE TO NEWSLETTER'
                  )}
                </motion.button>
              </form>
            )}

            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                margin: 0,
                lineHeight: '1.5'
              }}>
                📧 We respect your privacy. Unsubscribe at any time.
                <br />
                📅 Monthly updates on new products and industry insights.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
