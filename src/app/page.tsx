import Hero from '../components/marketing/Hero'
import ProofBar from '../components/marketing/ProofBar'
import SectorCards from '../components/marketing/SectorCards'

export default function HomePage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Hero />
      <ProofBar />
      <SectorCards />
    </div>
  )
}
