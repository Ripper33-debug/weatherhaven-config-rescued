import React, { useState } from 'react';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

interface ExportPanelProps {
  configState: ConfiguratorState;
  shelter: Shelter;
  user: any;
  onClose: () => void;
}

interface ExportOptions {
  format: 'pdf' | 'html' | 'json' | 'excel';
  includeSpecs: boolean;
  includePricing: boolean;
  includeImages: boolean;
  include3DModel: boolean;
  customTitle?: string;
  customNotes?: string;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  configState,
  shelter,
  user,
  onClose
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeSpecs: true,
    includePricing: true,
    includeImages: true,
    include3DModel: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const generateReport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportData = {
      title: customTitle || `${shelter.name} Configuration Report`,
      timestamp: new Date().toISOString(),
      user: user.username,
      company: user.clientBranding?.companyName || 'Weatherhaven Technologies',
      shelter: {
        name: shelter.name,
        model: shelter.model,
        category: shelter.category,
        description: shelter.description
      },
      configuration: {
        isDeployed: configState.isDeployed,
        isInsideView: configState.isInsideView,
        color: configState.color,
        colorName: getColorName(configState.color)
      },
      specifications: exportOptions.includeSpecs ? getSpecifications() : null,
      pricing: exportOptions.includePricing ? getPricing() : null,
      notes: customNotes,
      exportFormat: exportOptions.format
    };

    // In a real app, this would generate the actual file
    console.log('Exporting report:', reportData);
    
    // Simulate file download
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${shelter.name}_Configuration_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
    onClose();
  };

  const getColorName = (color: string) => {
    const colorMap: { [key: string]: string } = {
      '#4A5568': 'Military Green',
      '#D69E2E': 'Desert Tan',
      '#F7FAFC': 'Arctic White',
      '#2C5282': 'Navy Blue',
      '#2D3748': 'Charcoal',
      '#8B4513': 'Camo Brown'
    };
    return colorMap[color] || 'Custom';
  };

  const getSpecifications = () => {
    return {
      deployed: {
        length: '171.4" (14.3 ft)',
        width: '85.4" (7.1 ft)',
        height: '94.3" (7.9 ft)',
        weight: '2,300 lbs (1,040 kg)',
        maxPayload: '2,700 lbs (1,210 kg)',
        setupTime: '15-20 minutes',
        solarPanels: '460W solar array',
        airConditioner: '24V AC unit',
        heating: '800W electric heater',
        display: '55" command display',
        generator: '28VDC, 2kW capacity'
      },
      stowed: {
        length: '84.0" (7.0 ft)',
        width: '85.4" (7.1 ft)',
        height: '57.0" (4.8 ft)',
        weight: '2,300 lbs (1,040 kg)',
        transport: 'Standard military trailer',
        stacking: 'Up to 3 units high'
      }
    };
  };

  const getPricing = () => {
    const basePrice = 85000;
    const colorPremium = configState.color === '#F7FAFC' ? 2000 : 0;
    const totalPrice = basePrice + colorPremium;
    
    return {
      basePrice: `$${basePrice.toLocaleString()}`,
      colorPremium: colorPremium > 0 ? `$${colorPremium.toLocaleString()}` : 'N/A',
      totalPrice: `$${totalPrice.toLocaleString()}`,
      currency: 'USD',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  };

  return (
    <div className="export-panel-overlay">
      <div className="export-panel">
        <div className="export-header">
          <h2>Export Configuration</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="export-content">
          {/* Report Title */}
          <div className="export-section">
            <label htmlFor="report-title">Report Title</label>
            <input
              id="report-title"
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={`${shelter.name} Configuration Report`}
              className="export-input"
            />
          </div>

          {/* Export Format */}
          <div className="export-section">
            <label>Export Format</label>
            <div className="format-options">
              {[
                { value: 'pdf', label: 'PDF Report', icon: '📄' },
                { value: 'html', label: 'HTML Report', icon: '🌐' },
                { value: 'json', label: 'JSON Data', icon: '📊' },
                { value: 'excel', label: 'Excel Spreadsheet', icon: '📈' }
              ].map(format => (
                <button
                  key={format.value}
                  onClick={() => setExportOptions(prev => ({ ...prev, format: format.value as any }))}
                  className={`format-option ${exportOptions.format === format.value ? 'active' : ''}`}
                >
                  <span className="format-icon">{format.icon}</span>
                  <span>{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="export-section">
            <label>Include in Report</label>
            <div className="export-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={exportOptions.includeSpecs}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeSpecs: e.target.checked }))}
                />
                <span>Technical Specifications</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={exportOptions.includePricing}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includePricing: e.target.checked }))}
                />
                <span>Pricing Information</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={exportOptions.includeImages}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeImages: e.target.checked }))}
                />
                <span>Configuration Images</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={exportOptions.include3DModel}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, include3DModel: e.target.checked }))}
                />
                <span>3D Model Data</span>
              </label>
            </div>
          </div>

          {/* Custom Notes */}
          <div className="export-section">
            <label htmlFor="custom-notes">Additional Notes</label>
            <textarea
              id="custom-notes"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Add any additional notes or requirements..."
              className="export-textarea"
              rows={4}
            />
          </div>

          {/* Preview */}
          <div className="export-section">
            <label>Report Preview</label>
            <div className="report-preview">
              <div className="preview-header">
                <h3>{customTitle || `${shelter.name} Configuration Report`}</h3>
                <p>Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="preview-content">
                <div className="preview-item">
                  <strong>Shelter:</strong> {shelter.name}
                </div>
                <div className="preview-item">
                  <strong>Configuration:</strong> {configState.isDeployed ? 'Deployed' : 'Stowed'} | {getColorName(configState.color)}
                </div>
                <div className="preview-item">
                  <strong>User:</strong> {user.username} ({user.clientBranding?.companyName || 'Weatherhaven'})
                </div>
                {exportOptions.includeSpecs && (
                  <div className="preview-item">
                    <strong>Specifications:</strong> Included
                  </div>
                )}
                {exportOptions.includePricing && (
                  <div className="preview-item">
                    <strong>Pricing:</strong> Included
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="export-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={generateReport}
            disabled={isExporting}
            className="btn-primary"
          >
            {isExporting ? (
              <>
                <div className="loading-spinner"></div>
                Generating Report...
              </>
            ) : (
              'Generate Report'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
