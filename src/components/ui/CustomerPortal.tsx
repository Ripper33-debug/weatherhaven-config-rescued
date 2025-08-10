'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Order {
  id: string;
  product: string;
  status: 'pending' | 'in-production' | 'shipped' | 'deployed' | 'completed';
  orderDate: string;
  estimatedDelivery: string;
  deploymentLocation: string;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: 'manual' | 'certification' | 'specification' | 'training';
  size: string;
  lastUpdated: string;
  category: string;
}

interface Maintenance {
  id: string;
  type: string;
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
  priority: 'low' | 'medium' | 'high';
}

interface Training {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'interactive' | 'documentation';
  completed: boolean;
  progress: number;
}

interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  paidAmount: number;
  remainingAmount: number;
}

export default function CustomerPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      product: 'Tactical Command Center',
      status: 'deployed',
      orderDate: '2024-01-15',
      estimatedDelivery: '2024-02-15',
      deploymentLocation: 'Fort Bragg, NC',
      progress: 100
    },
    {
      id: 'ORD-2024-002',
      product: 'Field Hospital System',
      status: 'in-production',
      orderDate: '2024-02-01',
      estimatedDelivery: '2024-03-15',
      deploymentLocation: 'Camp Pendleton, CA',
      progress: 65
    },
    {
      id: 'ORD-2024-003',
      product: 'Emergency Relief Shelter',
      status: 'shipped',
      orderDate: '2024-02-10',
      estimatedDelivery: '2024-02-25',
      deploymentLocation: 'Houston, TX',
      progress: 85
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Tactical Command Center User Manual',
      type: 'manual',
      size: '2.4 MB',
      lastUpdated: '2024-01-20',
      category: 'User Guides'
    },
    {
      id: '2',
      name: 'ISO 9001:2015 Certification',
      type: 'certification',
      size: '1.8 MB',
      lastUpdated: '2024-01-15',
      category: 'Certifications'
    },
    {
      id: '3',
      name: 'Technical Specifications v2.1',
      type: 'specification',
      size: '3.2 MB',
      lastUpdated: '2024-02-01',
      category: 'Technical Docs'
    },
    {
      id: '4',
      name: 'Deployment Training Video',
      type: 'training',
      size: '45.6 MB',
      lastUpdated: '2024-01-25',
      category: 'Training'
    }
  ];

  const maintenance: Maintenance[] = [
    {
      id: '1',
      type: 'Annual System Check',
      scheduledDate: '2024-03-15',
      status: 'scheduled',
      technician: 'Mike Chen',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'HVAC Maintenance',
      scheduledDate: '2024-02-28',
      status: 'completed',
      technician: 'Sarah Johnson',
      priority: 'high'
    }
  ];

  const training: Training[] = [
    {
      id: '1',
      title: 'System Operation Basics',
      duration: '2 hours',
      type: 'video',
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Advanced Configuration',
      duration: '4 hours',
      type: 'interactive',
      completed: false,
      progress: 60
    },
    {
      id: '3',
      title: 'Emergency Procedures',
      duration: '1.5 hours',
      type: 'video',
      completed: false,
      progress: 0
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      orderId: 'ORD-2024-001',
      amount: 450000,
      dueDate: '2024-03-15',
      status: 'pending',
      items: [
        { name: 'Tactical Command Center', quantity: 1, unitPrice: 450000, total: 450000 }
      ],
      paidAmount: 0,
      remainingAmount: 450000
    },
    {
      id: 'INV-2024-002',
      orderId: 'ORD-2024-002',
      amount: 650000,
      dueDate: '2024-04-01',
      status: 'partial',
      items: [
        { name: 'Field Hospital System', quantity: 1, unitPrice: 650000, total: 650000 }
      ],
      paidAmount: 200000,
      remainingAmount: 450000
    },
    {
      id: 'INV-2024-003',
      orderId: 'ORD-2024-003',
      amount: 120000,
      dueDate: '2024-02-28',
      status: 'overdue',
      items: [
        { name: 'Emergency Relief Shelter', quantity: 2, unitPrice: 60000, total: 120000 }
      ],
      paidAmount: 0,
      remainingAmount: 120000
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#48bb78';
      case 'deployed': return '#48bb78';
      case 'shipped': return '#3b82f6';
      case 'in-production': return '#f59e0b';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#48bb78';
      default: return '#6b7280';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#48bb78';
      case 'partial': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false);
      setSelectedInvoice(null);
      // In a real app, you'd update the invoice status here
    }, 2000);
  };

  const renderDashboard = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Welcome back, Commander
      </h3>
      
      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f7fafc', marginBottom: '8px' }}>
            {orders.length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>Active Orders</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#48bb78', marginBottom: '8px' }}>
            {documents.length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>Available Documents</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>
            {maintenance.filter(m => m.status === 'scheduled').length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>Scheduled Maintenance</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>
            {formatCurrency(invoices.reduce((sum, inv) => sum + inv.remainingAmount, 0))}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>Outstanding Balance</div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ color: '#f7fafc', marginBottom: '16px', fontSize: '1.125rem' }}>
          Recent Orders
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {orders.slice(0, 3).map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f7fafc' }}>
                  {order.product}
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: `rgba(${getStatusColor(order.status).replace('#', '')}, 0.1)`,
                  color: getStatusColor(order.status),
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {order.status}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginBottom: '8px' }}>
                {order.deploymentLocation} • {order.orderDate}
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
                <div style={{
                  width: `${order.progress}%`,
                  height: '100%',
                  background: getStatusColor(order.status),
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Order Tracking
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f7fafc', marginBottom: '4px' }}>
                  {order.product}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                  Order ID: {order.id}
                </div>
              </div>
              <div style={{
                padding: '6px 12px',
                background: `rgba(${getStatusColor(order.status).replace('#', '')}, 0.1)`,
                color: getStatusColor(order.status),
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {order.status}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>ORDER DATE</div>
                <div style={{ fontSize: '0.875rem', color: '#f7fafc' }}>{order.orderDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>ESTIMATED DELIVERY</div>
                <div style={{ fontSize: '0.875rem', color: '#f7fafc' }}>{order.estimatedDelivery}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>DEPLOYMENT LOCATION</div>
                <div style={{ fontSize: '0.875rem', color: '#f7fafc' }}>{order.deploymentLocation}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>PROGRESS</div>
                <div style={{ fontSize: '0.875rem', color: '#f7fafc' }}>{order.progress}%</div>
              </div>
            </div>
            
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' }}>
              <div style={{
                width: `${order.progress}%`,
                height: '100%',
                background: getStatusColor(order.status),
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Document Library
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '1.5rem' }}>
                {doc.type === 'manual' && '📖'}
                {doc.type === 'certification' && '🏆'}
                {doc.type === 'specification' && '📋'}
                {doc.type === 'training' && '🎥'}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f7fafc', marginBottom: '4px' }}>
                  {doc.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
                  {doc.category} • {doc.size} • Updated {doc.lastUpdated}
                </div>
              </div>
            </div>
            <button style={{
              padding: '8px 16px',
              background: 'rgba(72, 187, 120, 0.1)',
              border: '1px solid rgba(72, 187, 120, 0.2)',
              borderRadius: '6px',
              color: '#48bb78',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}>
              Download
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Maintenance & Service
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {maintenance.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f7fafc', marginBottom: '4px' }}>
                  {item.type}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                  Technician: {item.technician}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  padding: '4px 8px',
                  background: `rgba(${getPriorityColor(item.priority).replace('#', '')}, 0.1)`,
                  color: getPriorityColor(item.priority),
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {item.priority}
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: `rgba(${getStatusColor(item.status).replace('#', '')}, 0.1)`,
                  color: getStatusColor(item.status),
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {item.status}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
              Scheduled: {item.scheduledDate}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Invoices & Payments
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {invoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f7fafc', marginBottom: '4px' }}>
                  Invoice #{invoice.id}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                  Order: {invoice.orderId} • Due: {invoice.dueDate}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{
                  padding: '6px 12px',
                  background: `rgba(${getInvoiceStatusColor(invoice.status).replace('#', '')}, 0.1)`,
                  color: getInvoiceStatusColor(invoice.status),
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {invoice.status}
                </div>
                {invoice.status !== 'paid' && (
                  <button
                    onClick={() => handlePayment(invoice)}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>TOTAL AMOUNT</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f7fafc' }}>
                  {formatCurrency(invoice.amount)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>PAID AMOUNT</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#48bb78' }}>
                  {formatCurrency(invoice.paidAmount)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>REMAINING</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f59e0b' }}>
                  {formatCurrency(invoice.remainingAmount)}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f7fafc', marginBottom: '8px' }}>
                Items:
              </div>
              {invoice.items.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
                    {item.name} (x{item.quantity})
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#f7fafc', fontWeight: '600' }}>
                    {formatCurrency(item.total)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '24px', fontSize: '1.5rem' }}>
        Training Materials
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {training.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#f7fafc', marginBottom: '4px' }}>
                  {course.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                  Duration: {course.duration} • Type: {course.type}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                background: course.completed ? 'rgba(72, 187, 120, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                color: course.completed ? '#48bb78' : '#a0aec0',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>
                {course.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>
            
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', marginBottom: '12px' }}>
              <div style={{
                width: `${course.progress}%`,
                height: '100%',
                background: course.completed ? '#48bb78' : '#3b82f6',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
                Progress: {course.progress}%
              </div>
              <button style={{
                padding: '8px 16px',
                background: course.completed ? 'rgba(72, 187, 120, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                border: course.completed ? '1px solid rgba(72, 187, 120, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '6px',
                color: course.completed ? '#48bb78' : '#3b82f6',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                {course.completed ? 'Review' : 'Continue'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Portal Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        👤
      </motion.button>

      {/* Portal Modal */}
      {isOpen && (
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
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '1000px',
                height: '80vh',
                background: 'rgba(26, 32, 44, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>👤</div>
                  <div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#f7fafc' }}>
                      Customer Portal
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                      {isLoggedIn ? 'Welcome back, Commander' : 'Sign in to access your account'}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a0aec0',
                    cursor: 'pointer',
                    fontSize: '1.5rem'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {!isLoggedIn ? (
                  // Login Form
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                  }}>
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleLogin}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '32px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <h3 style={{ color: '#f7fafc', marginBottom: '24px', textAlign: 'center' }}>
                        Sign In
                      </h3>
                      
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            color: '#f7fafc',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                          Password
                        </label>
                        <input
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            color: '#f7fafc',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter your password"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#ffffff',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Sign In
                      </button>
                    </motion.form>
                  </div>
                ) : (
                  // Portal Content
                  <>
                    {/* Sidebar */}
                    <div style={{
                      width: '200px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '20px 0'
                    }}>
                      {[
                        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                        { id: 'orders', label: 'Orders', icon: '📦' },
                        { id: 'invoices', label: 'Invoices', icon: '💰' },
                        { id: 'documents', label: 'Documents', icon: '📄' },
                        { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
                        { id: 'training', label: 'Training', icon: '🎓' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          style={{
                            width: '100%',
                            padding: '12px 20px',
                            background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            border: 'none',
                            color: activeTab === tab.id ? '#3b82f6' : '#a0aec0',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textAlign: 'left'
                          }}
                        >
                          <span>{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: 1, overflow: 'auto' }}>
                                          {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'invoices' && renderInvoices()}
                    {activeTab === 'documents' && renderDocuments()}
                    {activeTab === 'maintenance' && renderMaintenance()}
                    {activeTab === 'training' && renderTraining()}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
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
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '500px',
                background: 'rgba(26, 32, 44, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '32px'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💳</div>
                <h3 style={{ color: '#f7fafc', marginBottom: '8px' }}>
                  Payment for Invoice #{selectedInvoice.id}
                </h3>
                <p style={{ color: '#a0aec0' }}>
                  Amount due: {formatCurrency(selectedInvoice.remainingAmount)}
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    color: '#f7fafc',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="wire">Wire Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              {paymentMethod === 'card' && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#f7fafc',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          color: '#f7fafc',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '0.875rem' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          color: '#f7fafc',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowPaymentModal(false)}
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
                  onClick={processPayment}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Process Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
    </>
  );
}
