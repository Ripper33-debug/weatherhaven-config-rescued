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
