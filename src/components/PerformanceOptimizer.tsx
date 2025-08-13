import React, { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  triangleCount: number;
  drawCalls: number;
  textureMemory: number;
  geometryCount: number;
  materialCount: number;
}

interface PerformanceOptimizerProps {
  onOptimizationApplied: (optimizations: any) => void;
  onPerformanceMetrics: (metrics: PerformanceMetrics) => void;
}

interface OptimizationSettings {
  enableLOD: boolean;
  enableFrustumCulling: boolean;
  enableOcclusionCulling: boolean;
  maxTriangles: number;
  maxDrawCalls: number;
  textureQuality: 'low' | 'medium' | 'high' | 'ultra';
  shadowQuality: 'low' | 'medium' | 'high' | 'ultra';
  antialiasing: boolean;
  vsync: boolean;
  adaptiveQuality: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  onOptimizationApplied,
  onPerformanceMetrics
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    triangleCount: 0,
    drawCalls: 0,
    textureMemory: 0,
    geometryCount: 0,
    materialCount: 0
  });
  const [settings, setSettings] = useState<OptimizationSettings>({
    enableLOD: true,
    enableFrustumCulling: true,
    enableOcclusionCulling: false,
    maxTriangles: 100000,
    maxDrawCalls: 1000,
    textureQuality: 'high',
    shadowQuality: 'high',
    antialiasing: true,
    vsync: true,
    adaptiveQuality: true
  });
  const [performanceMode, setPerformanceMode] = useState<'balanced' | 'performance' | 'quality'>('balanced');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const metricsRef = useRef<NodeJS.Timeout | null>(null);

  // Performance monitoring
  useEffect(() => {
    if (isMonitoring) {
      metricsRef.current = setInterval(() => {
        // Simulate performance metrics
        const newMetrics: PerformanceMetrics = {
          fps: Math.floor(Math.random() * 20) + 45, // 45-65 FPS
          memoryUsage: Math.floor(Math.random() * 200) + 100, // 100-300 MB
          renderTime: Math.random() * 5 + 10, // 10-15ms
          triangleCount: Math.floor(Math.random() * 50000) + 50000, // 50k-100k
          drawCalls: Math.floor(Math.random() * 500) + 500, // 500-1000
          textureMemory: Math.floor(Math.random() * 50) + 25, // 25-75 MB
          geometryCount: Math.floor(Math.random() * 20) + 10, // 10-30
          materialCount: Math.floor(Math.random() * 15) + 5 // 5-20
        };
        
        setMetrics(newMetrics);
        onPerformanceMetrics(newMetrics);
      }, 1000);
    } else {
      if (metricsRef.current) {
        clearInterval(metricsRef.current);
      }
    }

    return () => {
      if (metricsRef.current) {
        clearInterval(metricsRef.current);
      }
    };
  }, [isMonitoring, onPerformanceMetrics]);

  // Apply performance optimizations
  const applyOptimizations = () => {
    const optimizations = {
      settings,
      performanceMode,
      appliedAt: new Date()
    };

    onOptimizationApplied(optimizations);
  };

  // Preset optimization modes
  const applyPreset = (mode: 'balanced' | 'performance' | 'quality') => {
    setPerformanceMode(mode);
    
    switch (mode) {
      case 'performance':
        setSettings({
          ...settings,
          enableLOD: true,
          enableFrustumCulling: true,
          enableOcclusionCulling: true,
          maxTriangles: 50000,
          maxDrawCalls: 500,
          textureQuality: 'medium',
          shadowQuality: 'low',
          antialiasing: false,
          vsync: false,
          adaptiveQuality: true
        });
        break;
      case 'quality':
        setSettings({
          ...settings,
          enableLOD: false,
          enableFrustumCulling: true,
          enableOcclusionCulling: false,
          maxTriangles: 200000,
          maxDrawCalls: 2000,
          textureQuality: 'ultra',
          shadowQuality: 'ultra',
          antialiasing: true,
          vsync: true,
          adaptiveQuality: false
        });
        break;
      case 'balanced':
        setSettings({
          ...settings,
          enableLOD: true,
          enableFrustumCulling: true,
          enableOcclusionCulling: false,
          maxTriangles: 100000,
          maxDrawCalls: 1000,
          textureQuality: 'high',
          shadowQuality: 'high',
          antialiasing: true,
          vsync: true,
          adaptiveQuality: true
        });
        break;
    }
  };

  const getPerformanceStatus = () => {
    if (metrics.fps >= 55) return { status: 'excellent', color: 'var(--text-success)' };
    if (metrics.fps >= 45) return { status: 'good', color: 'var(--text-warning)' };
    return { status: 'poor', color: 'var(--text-error)' };
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <>
      {/* Performance Optimizer Button */}
      <button
        className="performance-optimizer-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Performance Optimizer"
      >
        <span className="optimizer-icon">⚡</span>
        <span className="optimizer-label">Performance</span>
      </button>

      {/* Performance Panel */}
      {isOpen && (
        <div className="performance-optimizer-panel">
          <div className="optimizer-header">
            <h3>⚡ Performance Optimizer</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="optimizer-content">
            {/* Performance Metrics */}
            <div className="performance-metrics">
              <h4>Real-time Metrics</h4>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">FPS</span>
                  <span className="metric-value" style={{ color: performanceStatus.color }}>
                    {metrics.fps}
                  </span>
                  <span className="metric-status">{performanceStatus.status}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Memory</span>
                  <span className="metric-value">{metrics.memoryUsage} MB</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Render Time</span>
                  <span className="metric-value">{metrics.renderTime.toFixed(1)}ms</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Triangles</span>
                  <span className="metric-value">{metrics.triangleCount.toLocaleString()}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Draw Calls</span>
                  <span className="metric-value">{metrics.drawCalls}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Textures</span>
                  <span className="metric-value">{metrics.textureMemory} MB</span>
                </div>
              </div>
              
              <div className="monitoring-controls">
                <button 
                  className={`monitor-btn ${isMonitoring ? 'active' : ''}`}
                  onClick={() => setIsMonitoring(!isMonitoring)}
                >
                  {isMonitoring ? '🛑 Stop Monitoring' : '📊 Start Monitoring'}
                </button>
              </div>
            </div>

            {/* Performance Presets */}
            <div className="performance-presets">
              <h4>Quick Presets</h4>
              <div className="preset-buttons">
                <button 
                  className={`preset-btn ${performanceMode === 'performance' ? 'active' : ''}`}
                  onClick={() => applyPreset('performance')}
                >
                  🚀 Performance Mode
                  <span className="preset-desc">Maximum FPS, reduced quality</span>
                </button>
                <button 
                  className={`preset-btn ${performanceMode === 'balanced' ? 'active' : ''}`}
                  onClick={() => applyPreset('balanced')}
                >
                  ⚖️ Balanced Mode
                  <span className="preset-desc">Good performance and quality</span>
                </button>
                <button 
                  className={`preset-btn ${performanceMode === 'quality' ? 'active' : ''}`}
                  onClick={() => applyPreset('quality')}
                >
                  🎨 Quality Mode
                  <span className="preset-desc">Maximum quality, lower FPS</span>
                </button>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="advanced-settings">
              <h4>Advanced Optimization</h4>
              
              <div className="settings-group">
                <h5>Rendering Optimizations</h5>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.enableLOD}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableLOD: e.target.checked }))}
                    />
                    Level of Detail (LOD)
                  </label>
                  <span className="setting-desc">Reduces geometry complexity at distance</span>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.enableFrustumCulling}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableFrustumCulling: e.target.checked }))}
                    />
                    Frustum Culling
                  </label>
                  <span className="setting-desc">Only renders visible objects</span>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.enableOcclusionCulling}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableOcclusionCulling: e.target.checked }))}
                    />
                    Occlusion Culling
                  </label>
                  <span className="setting-desc">Skips hidden objects (CPU intensive)</span>
                </div>
              </div>

              <div className="settings-group">
                <h5>Quality Settings</h5>
                <div className="setting-item">
                  <label>Texture Quality</label>
                  <select
                    value={settings.textureQuality}
                    onChange={(e) => setSettings(prev => ({ ...prev, textureQuality: e.target.value as any }))}
                  >
                    <option value="low">Low (512px)</option>
                    <option value="medium">Medium (1024px)</option>
                    <option value="high">High (2048px)</option>
                    <option value="ultra">Ultra (4096px)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Shadow Quality</label>
                  <select
                    value={settings.shadowQuality}
                    onChange={(e) => setSettings(prev => ({ ...prev, shadowQuality: e.target.value as any }))}
                  >
                    <option value="low">Low (1024px)</option>
                    <option value="medium">Medium (2048px)</option>
                    <option value="high">High (4096px)</option>
                    <option value="ultra">Ultra (8192px)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.antialiasing}
                      onChange={(e) => setSettings(prev => ({ ...prev, antialiasing: e.target.checked }))}
                    />
                    Anti-aliasing
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.vsync}
                      onChange={(e) => setSettings(prev => ({ ...prev, vsync: e.target.checked }))}
                    />
                    V-Sync
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <h5>Performance Limits</h5>
                <div className="setting-item">
                  <label>Max Triangles: {settings.maxTriangles.toLocaleString()}</label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={settings.maxTriangles}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxTriangles: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="setting-item">
                  <label>Max Draw Calls: {settings.maxDrawCalls}</label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={settings.maxDrawCalls}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxDrawCalls: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="apply-optimizations">
              <button className="apply-btn" onClick={applyOptimizations}>
                🚀 Apply Optimizations
              </button>
              <div className="optimization-note">
                Changes will be applied immediately to improve performance
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceOptimizer;
