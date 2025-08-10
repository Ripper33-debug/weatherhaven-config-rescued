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
      
      {/* SIMPLE TEST CONTENT */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h1>DEPLOYABLE SHELTERS</h1>
          <p style={{ fontSize: '24px', marginTop: '20px' }}>READY IN HOURS — NOT WEEKS</p>
          <div style={{ marginTop: '40px' }}>
            <button style={{
              background: 'white',
              color: 'black',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '10px',
              cursor: 'pointer'
            }}>
              REQUEST QUOTE
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              padding: '15px 30px',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '10px',
              cursor: 'pointer'
            }}>
              OPEN CONFIGURATOR
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
