import externalContent from './externalContent.json';

export type HeadingLevel = 2 | 3 | 4;

export type ContentBlock =
  | { type: 'heading'; level: HeadingLevel; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt?: string; width?: number; height?: number }
  | { type: 'list'; items: string[] }
  | { type: 'cta'; label: string; href: string };

export interface PageContent {
  title: string;
  seoDescription?: string;
  sections: ContentBlock[];
}

export interface SiteContent {
  home: {
    hero: {
      heading: string;
      subheading: string;
      ctas: Array<{ label: string; href: string }>;
    };
    sections?: ContentBlock[];
  };
  pages: Record<string, PageContent>;
}

// NOTE: Placeholders only. Replace text below with approved copy.
export const siteContent: SiteContent = {
  home: {
    hero: {
      heading: 'Rapidly Deploying Mobile Infrastructure',
      subheading:
        'Anywhere in the World',
      ctas: [
        { label: 'Explore Sectors', href: '/commercial' },
      ],
    },
    sections: [
      { type: 'heading', level: 2, text: 'Rapid & Redeployable' },
      { type: 'paragraph', text: 'Weatherhaven is a world leader in providing rapidly deployable and redeployable shelters and camp systems. Leverage our fast setup and takedown speeds for your military, medical or commercial needs.' },
      { type: 'heading', level: 2, text: 'Ecodesign' },
      { type: 'paragraph', text: "Weatherhaven's redeployable infrastructure can be found across all seven continents in some of the world's most remote harsh, and ecologically sensitive locations." },
      { type: 'paragraph', text: "We ensure that our shelter designs are lightweight and compact to minimize transport time, fuel consumption and impact on a site's surroundings." },
      { type: 'heading', level: 2, text: 'Global reach & experience' },
      { type: 'paragraph', text: 'Founded in 1981, Weatherhaven has deployed its products to more than 95 countries across all 7 continents. No matter the climate, geography, or logistical challenge you can rely on our expert teams located across the world.' },
    ],
  },
  pages: {
    military: {
      title: 'Military',
      sections: [
        { type: 'paragraph', text: 'Rapidly deployable shelter and camp systems designed for defense operations.' },
      ],
    },
    medical: {
      title: 'Medical',
      sections: [
        { type: 'paragraph', text: 'Redeployable medical infrastructure for field hospitals and emergency response.' },
      ],
    },
    commercial: {
      title: 'Commercial',
      sections: [
        { type: 'paragraph', text: 'Adaptable shelter solutions for commercial and industrial applications.' },
      ],
    },
    innovation: {
      title: 'Innovation',
      sections: [
        { type: 'paragraph', text: 'Advanced materials and engineering driving compact, lightweight, and efficient shelter design.' },
      ],
    },
    company: {
      title: 'Company',
      sections: [
        { type: 'paragraph', text: 'Founded in 1981, serving more than 95 countries across all seven continents.' },
      ],
    },
    instock: {
      title: 'Instock',
      sections: [
        { type: 'paragraph', text: 'Explore available products ready to ship.' },
      ],
    },
    contact: {
      title: 'Contact',
      sections: [
        { type: 'heading', level: 2, text: 'Head Office' },
        { type: 'paragraph', text: 'Toll Free (Canada and USA): 1-888-346-1334' },
        { type: 'paragraph', text: 'International: 1-604-451-8900' },
        { type: 'paragraph', text: 'Email: info@weatherhaven.com' },
        { type: 'paragraph', text: '#130-8610 Glenlyon Parkway' },
        { type: 'paragraph', text: 'Burnaby, BC' },
        { type: 'paragraph', text: 'Canada, V5J 0B6' },
        { type: 'heading', level: 3, text: 'Regional Websites' },
        { type: 'list', items: ['United Kingdom', 'Africa', 'Brasil', 'Peru'] },
      ],
    },
  },
};

// Merge external imported content (e.g., scraped from Weatherhaven) over defaults
export const resolvedSiteContent: SiteContent = {
  ...siteContent,
  pages: {
    ...siteContent.pages,
    ...((externalContent as any).pages || {}),
  },
};


