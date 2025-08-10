import { Metadata } from 'next';
import ProductsHero from '../../components/marketing/ProductsHero';
import ProductCategories from '../../components/marketing/ProductCategories';
import TechnicalSpecs from '../../components/marketing/TechnicalSpecs';
import ProductComparison from '../../components/marketing/ProductComparison';
import CustomSolutions from '../../components/marketing/CustomSolutions';

export const metadata: Metadata = {
  title: 'Products & Services - Weatherhaven Deployable Shelter Solutions',
  description: 'Explore our complete range of deployable shelter systems, from military-grade command centers to disaster response facilities. Custom solutions for any environment.',
  keywords: 'deployable shelters, military shelters, command centers, field hospitals, disaster response shelters, modular buildings, rapid deployment systems',
};

export default function ProductsPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)', minHeight: '100vh' }}>
      <ProductsHero />
      <ProductCategories />
      <TechnicalSpecs />
      <ProductComparison />
      <CustomSolutions />
    </div>
  );
}
