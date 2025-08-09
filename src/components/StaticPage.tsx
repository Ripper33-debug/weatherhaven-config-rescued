import React from 'react';
import { resolvedSiteContent as siteContent, ContentBlock } from '../config/siteContent';

const container: React.CSSProperties = { color: 'white', background: '#0b1220', minHeight: '100vh', padding: '48px 24px', maxWidth: 1200, margin: '0 auto' };

interface StaticPageProps {
  slug: keyof typeof siteContent.pages | string;
}

const headingTagByLevel: Record<2 | 3 | 4, 'h2' | 'h3' | 'h4'> = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case 'heading': {
      const tagName = headingTagByLevel[block.level];
      return React.createElement(tagName, { key: index, style: { margin: '16px 0 8px' } }, block.text);
    }
    case 'paragraph':
      return <p key={index} style={{ margin: '8px 0' }}>{block.text}</p>;
    case 'image':
      return (
        <img
          key={index}
          src={block.src}
          alt={block.alt || ''}
          width={block.width}
          height={block.height}
          style={{ display: 'block', margin: '16px 0', maxWidth: '100%' }}
        />
      );
    case 'list':
      return (
        <ul key={index} style={{ margin: '8px 0 8px 1rem', paddingLeft: '1rem' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{item}</li>
          ))}
        </ul>
      );
    case 'cta':
      return (
        <a key={index} className="configure-button" href={block.href} style={{ display: 'inline-block', margin: '16px 0' }}>
          {block.label}
        </a>
      );
    default:
      return null;
  }
};

const StaticPage: React.FC<StaticPageProps> = ({ slug }) => {
  const page = siteContent.pages[slug] || { title: 'Page', sections: [{ type: 'paragraph', text: 'Content coming soon.' } as ContentBlock] };
  return (
    <div style={container}>
      <h1 style={{ marginBottom: 16 }}>{page.title}</h1>
      <div style={{ opacity: 0.9, lineHeight: 1.7 }}>
        {page.sections.map((block, idx) => renderBlock(block, idx))}
      </div>
    </div>
  );
};

export default StaticPage;


