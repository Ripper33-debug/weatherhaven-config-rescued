import Hero from '../components/marketing/Hero'
import ProofBar from '../components/marketing/ProofBar'
import SectorCards from '../components/marketing/SectorCards'
import FeaturesShowcase from '../components/marketing/FeaturesShowcase'
import Testimonials from '../components/marketing/Testimonials'
import ParallaxCTA from '../components/marketing/ParallaxCTA'
import NewsletterSignup from '../components/marketing/NewsletterSignup'
import StickyCTA from '../components/marketing/StickyCTA'

export default function HomePage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Hero />
      <ProofBar />
      <SectorCards />
      <FeaturesShowcase />
      <Testimonials />
      <ParallaxCTA />
      <NewsletterSignup />
      <StickyCTA />
    </div>
  )
}
