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
    <>
      {/* TEST ELEMENT - IF YOU SEE THIS, THE HOMEPAGE IS WORKING */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        background: 'red',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 9999
      }}>
        🚨 HOMEPAGE IS WORKING! THIS IS THE NEW DESIGN! 🚨
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
    </>
  )
}
