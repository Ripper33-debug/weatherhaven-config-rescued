import React, { useState, useEffect } from 'react';
import { Shelter, ShelterConfiguration } from '../App';

interface SavedTemplate {
  id: string;
  name: string;
  description: string;
  shelterId: string;
  shelterName: string;
  configuration: any;
  createdAt: Date;
  lastUsed: Date;
}

interface ConfigurationTemplatesProps {
  shelter: Shelter;
  currentConfiguration?: ShelterConfiguration;
  onLoadTemplate: (template: SavedTemplate) => void;
  onSaveTemplate: (template: Omit<SavedTemplate, 'id' | 'createdAt' | 'lastUsed'>) => void;
}

const ConfigurationTemplates: React.FC<ConfigurationTemplatesProps> = ({
  shelter,
  currentConfiguration,
  onLoadTemplate,
  onSaveTemplate
}) => {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('shelterTemplates');
    if (savedTemplates) {
      try {
        const parsed = JSON.parse(savedTemplates);
        setTemplates(parsed.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          lastUsed: new Date(t.lastUsed)
        })));
      } catch (error) {
        console.error('Error loading templates:', error);
      }
    }
  }, []);

  // Save templates to localStorage
  const saveTemplatesToStorage = (newTemplates: SavedTemplate[]) => {
    localStorage.setItem('shelterTemplates', JSON.stringify(newTemplates));
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    const newTemplate: SavedTemplate = {
      id: Date.now().toString(),
      name: templateName.trim(),
      description: templateDescription.trim(),
      shelterId: shelter.id,
      shelterName: shelter.name,
      configuration: currentConfiguration || {},
      createdAt: new Date(),
      lastUsed: new Date()
    };

    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    saveTemplatesToStorage(updatedTemplates);
    onSaveTemplate(newTemplate);

    setTemplateName('');
    setTemplateDescription('');
    setShowSaveDialog(false);
  };

  const handleLoadTemplate = (template: SavedTemplate) => {
    // Update last used date
    const updatedTemplates = templates.map(t => 
      t.id === template.id 
        ? { ...t, lastUsed: new Date() }
        : t
    );
    setTemplates(updatedTemplates);
    saveTemplatesToStorage(updatedTemplates);

    onLoadTemplate(template);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    saveTemplatesToStorage(updatedTemplates);
  };

  const shelterTemplates = templates.filter(t => t.shelterId === shelter.id);

  return (
    <div className="configuration-templates">
      <div className="templates-header">
        <h3>Configuration Templates</h3>
        <button
          className="save-template-btn"
          onClick={() => setShowSaveDialog(true)}
          disabled={!currentConfiguration}
        >
          💾 Save Current
        </button>
      </div>

      {shelterTemplates.length === 0 ? (
        <div className="no-templates">
          <p>No saved templates for {shelter.name}</p>
          <p>Configure your shelter and save it as a template for quick access.</p>
        </div>
      ) : (
        <div className="templates-list">
          {shelterTemplates
            .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
            .map(template => (
              <div key={template.id} className="template-item">
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <p>{template.description}</p>
                  <div className="template-meta">
                    <span>Created: {template.createdAt.toLocaleDateString()}</span>
                    <span>Last used: {template.lastUsed.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="template-actions">
                  <button
                    className="load-template-btn"
                    onClick={() => handleLoadTemplate(template)}
                  >
                    📂 Load
                  </button>
                  <button
                    className="delete-template-btn"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="template-dialog-overlay">
          <div className="template-dialog">
            <h3>Save Configuration Template</h3>
            <div className="dialog-content">
              <div className="input-group">
                <label htmlFor="template-name">Template Name *</label>
                <input
                  id="template-name"
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Command Post Standard"
                  className="template-input"
                />
              </div>
              <div className="input-group">
                <label htmlFor="template-description">Description</label>
                <textarea
                  id="template-description"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe this configuration..."
                  className="template-textarea"
                  rows={3}
                />
              </div>
            </div>
            <div className="dialog-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationTemplates;
