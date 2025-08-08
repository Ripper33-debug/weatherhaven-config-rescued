import React from 'react';
import { useBranding } from './BrandingProvider';

interface DualLogoHeaderProps {
  title?: string;
  subtitle?: string;
}

const DualLogoHeader: React.FC<DualLogoHeaderProps> = ({ 
  title = "COMMAND CENTER",
  subtitle = "Shelter Configuration System"
}) => {
  const { branding, getClientLogoUrl } = useBranding();

  return (
    <div className="dual-logo-header">
      <div className="logo-section">
        <div className="weatherhaven-logo">
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBmaWxsPSJ3aGl0ZSI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xMCAyMEwzMCA0MEwxMCA2MEw1MCA0MFoiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5XZWF0aGVyaGF2ZW48L3RleHQ+CjwvZz4KPC9zdmc+"
            alt="Weatherhaven"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="logo-fallback hidden">
            <span className="logo-text">WEATHERHAVEN</span>
          </div>
        </div>
        
        <div className="logo-separator">
          <span>×</span>
        </div>
        
        {branding ? (
          <div className="client-logo">
            <img 
              src={branding.logoUrl || getClientLogoUrl(branding.logoFolder)}
              alt={branding.companyName}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="logo-fallback hidden">
              <span className="logo-text">{branding.companyName}</span>
            </div>
          </div>
        ) : (
          <div className="client-logo">
            <span className="logo-text">CLIENT</span>
          </div>
        )}
      </div>
      
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default DualLogoHeader;
