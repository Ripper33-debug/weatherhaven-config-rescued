# Weatherhaven Shelter Configurator

A comprehensive marketing website with an interactive 3D shelter configurator, built with Next.js, TypeScript, and Three.js.

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the marketing site.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (marketing site)
│   ├── configurator/      # 3D Configurator (existing React app)
│   ├── solutions/         # Solution pages
│   ├── products/          # Product pages
│   ├── case-studies/      # Case study pages
│   ├── resources/         # Resource downloads
│   ├── about/             # About page
│   ├── contact/           # Contact/RFQ form
│   └── layout.tsx         # Root layout with header
├── components/
│   ├── marketing/         # Marketing site components
│   │   ├── Hero.tsx       # Homepage hero section
│   │   ├── Header.tsx     # Navigation header
│   │   ├── ProofBar.tsx   # Statistics bar
│   │   └── ...            # Other marketing components
│   └── [existing]         # Original configurator components
├── lib/
│   ├── db.ts              # Database configuration
│   └── schema.ts          # Drizzle ORM schema
├── content/               # Static content (JSON/YAML)
│   ├── products.json      # Product data
│   ├── case-studies.json  # Case study data
│   └── resources.json     # Resource data
└── App.tsx                # Original React app (configurator)
```

## 🎯 Key Features

### Marketing Site
- **Homepage**: Hero, value props, sectors, products, case studies
- **Solutions Pages**: Military, Government, Industrial, Commercial
- **Product Pages**: Detailed product specifications
- **Case Studies**: Real-world deployment examples
- **Resources**: Gated downloads and documentation
- **Contact**: RFQ forms with lead capture

### 3D Configurator
- **Interactive 3D Models**: Real-time shelter visualization
- **Configuration Options**: Colors, deployment states, interiors
- **Collaboration**: Multi-user real-time editing
- **Export**: Generate quotes and specifications

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX    # Google Tag Manager
ADMIN_EXPORT_TOKEN=your-token     # Lead export security
SITE_URL=https://weatherhaven.com # Sitemap generation
```

### Database
The app uses SQLite with Drizzle ORM for lead storage:
- **Table**: `leads` (name, email, organization, sector, etc.)
- **API**: `/api/leads/export` for CSV download (protected)

## 📊 Analytics & SEO

- **Vercel Analytics**: Built-in performance tracking
- **Google Tag Manager**: Custom event tracking
- **Sitemap**: Auto-generated XML sitemap
- **Metadata**: SEO-optimized page titles and descriptions
- **Structured Data**: JSON-LD for products and organization

## 🎨 Styling

- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliant

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

## 📝 Content Management

### Adding Products
1. Edit `content/products.json`
2. Add product specifications
3. Include images in `public/images/products/`

### Adding Case Studies
1. Edit `content/case-studies.json`
2. Include gallery images
3. Add metrics and outcomes

### Adding Resources
1. Edit `content/resources.json`
2. Mark as `gated: true` for lead capture
3. Upload files to `public/resources/`

## 🔗 Navigation

The site includes:
- **Header**: Mega-menu navigation with dropdowns
- **Configurator Link**: Prominent CTA to 3D tool
- **Sticky CTA**: "Request a Quote" button
- **Footer**: Links, contact info, legal pages

## 🛠️ Development

### Adding New Pages
1. Create page in `src/app/[route]/page.tsx`
2. Add metadata export
3. Update navigation in `Header.tsx`

### Adding Components
1. Create in `src/components/marketing/`
2. Use TypeScript interfaces
3. Include accessibility attributes

### Database Changes
1. Update `src/lib/schema.ts`
2. Run database migration
3. Update API endpoints

## 📞 Support

For technical support or questions about the configurator:
- Check the existing configurator documentation
- Review the original React app structure
- The configurator is preserved at `/configurator` route

## 🔄 Migration Notes

This project was migrated from a React app to Next.js:
- **Original App**: Preserved in `src/App.tsx`
- **Configurator Route**: `/configurator` loads the original app
- **Marketing Site**: New Next.js pages and components
- **Database**: Added for lead capture and analytics

The configurator functionality remains unchanged and is accessible via the marketing site navigation.
