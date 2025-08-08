import React from 'react';

interface BreadcrumbItem {
  label: string;
  path: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb navigation">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && <span className="breadcrumb-separator">/</span>}
            {index === items.length - 1 ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                className="breadcrumb-link"
                onClick={item.onClick}
                title={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
