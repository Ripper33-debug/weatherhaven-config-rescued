import Hero from '../components/marketing/Hero'
import ProofBar from '../components/marketing/ProofBar'
import SectorCards from '../components/marketing/SectorCards'
import ProductCards from '../components/marketing/ProductCards'
import VideoBlock from '../components/marketing/VideoBlock'
import ThreeDPlaceholder from '../components/marketing/ThreeDPlaceholder'
import CaseStudyList from '../components/marketing/CaseStudyList'
import DocDownload from '../components/marketing/DocDownload'
import GlobalDeploymentsStrip from '../components/marketing/GlobalDeploymentsStrip'
import StickyCTA from '../components/marketing/StickyCTA'

export default function HomePage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* TEST BANNER */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        background: 'red',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 9999
      }}>
        🚨 COMPONENTS SHOULD BE RENDERING BELOW! 🚨
      </div>
      
      <Hero />
      <ProofBar />
      <SectorCards />
      <ProductCards />
      <VideoBlock />
      <ThreeDPlaceholder />
      <CaseStudyList />
      <DocDownload />
      <GlobalDeploymentsStrip />
      <StickyCTA />
    </div>
  )
}
