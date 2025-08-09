import React from 'react';
import HomepageHero from './HomepageHero';
import { resolvedSiteContent as siteContent, ContentBlock } from '../config/siteContent';

const sectionContainer: React.CSSProperties = {
  background: '#0b1220',
  color: 'white',
  padding: '48px 24px',
};

const headingStyle: React.CSSProperties = { margin: '0 auto 8px', maxWidth: 1000 };
const paragraphStyle: React.CSSProperties = { margin: '0 auto 16px', maxWidth: 1000, opacity: 0.9, lineHeight: 1.7 };

const HomePage: React.FC = () => {
  const sections = siteContent.home.sections || [];
  const render = (block: ContentBlock, i: number) => {
    switch (block.type) {
      case 'heading': {
        const tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
        return React.createElement(tag, { key: i, style: headingStyle }, block.text);
      }
      case 'paragraph':
        return <p key={i} style={paragraphStyle}>{block.text}</p>;
      case 'image':
        return <img key={i} src={block.src} alt={block.alt || ''} width={block.width} height={block.height} style={{ display: 'block', margin: '24px auto', maxWidth: '100%' }} />;
      case 'list':
        return (
          <ul key={i} style={{ ...paragraphStyle, paddingLeft: '1rem' }}>
            {block.items.map((item, idx) => <li key={idx} style={{ margin: '6px 0' }}>{item}</li>)}
          </ul>
        );
      case 'cta':
        return <a key={i} className="configure-button" href={block.href} style={{ display: 'inline-block', margin: '12px auto' }}>{block.label}</a>;
      default:
        return null;
    }
  };

  return (
    <main>
      <HomepageHero />
      <section style={sectionContainer}>
        {sections.map((b, i) => render(b, i))}
      </section>
    </main>
  );
};

export default HomePage;
