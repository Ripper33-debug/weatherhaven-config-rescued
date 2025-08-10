import { Metadata } from 'next';
import AboutHero from '../../components/marketing/AboutHero';
import CompanyHistory from '../../components/marketing/CompanyHistory';
import LeadershipTeam from '../../components/marketing/LeadershipTeam';
import CompanyValues from '../../components/marketing/CompanyValues';
import GlobalPresence from '../../components/marketing/GlobalPresence';
import Certifications from '../../components/marketing/Certifications';

export const metadata: Metadata = {
  title: 'About Weatherhaven - Global Leader in Deployable Shelter Solutions',
  description: 'Learn about Weatherhaven\'s 40+ year history, global presence, and commitment to innovation in deployable shelter systems for military, disaster response, and remote operations.',
  keywords: 'about weatherhaven, company history, leadership team, global presence, certifications, deployable shelters',
};

export default function AboutPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)', minHeight: '100vh' }}>
      <AboutHero />
      <CompanyHistory />
      <CompanyValues />
      <LeadershipTeam />
      <GlobalPresence />
      <Certifications />
    </div>
  );
}
