// AWS S3 + CloudFront configuration
const AWS_S3_BUCKET = 'weatherhaven-models'
const AWS_REGION = 'us-east-2'
const CLOUDFRONT_DOMAIN = 'd3kx2t94cz9q1y.cloudfront.net'

// Debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 AWS S3 Bucket:', AWS_S3_BUCKET)
  console.log('🔧 CloudFront Domain:', CLOUDFRONT_DOMAIN)
}

// Model configuration
export interface ModelConfig {
  id: string
  name: string
  path: string
  thumbnail?: string
  description?: string
  dimensions?: {
    length: number
    width: number
    height: number
  }
  weight?: number
  capacity?: number
}

// Available models
export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'trecc',
    name: 'TRECC Shelter',
    path: 'trecc.glb',
    description: 'Tactical Rapidly Erectable Command Center',
    dimensions: { length: 20, width: 8, height: 8 },
    weight: 5000,
    capacity: 12
  }
  // Add more models as you upload them to S3
  // {
  //   id: 'command-posting',
  //   name: 'Command Posting',
  //   path: 'interiors/CommandPosting.glb',
  //   description: 'Interior command center configuration',
  //   dimensions: { length: 20, width: 8, height: 8 },
  //   weight: 5000,
  //   capacity: 8
  // }
]

// Get model URL from AWS S3 + CloudFront with local fallback
export async function getModelUrl(modelPath: string): Promise<string> {
  // For now, let's use local models until AWS is properly configured
  // This ensures the site works immediately
  const localUrl = `/models/${modelPath}`
  console.log('🔄 Using local model URL (AWS not configured yet):', localUrl)
  return localUrl
  
  // TODO: Uncomment this when AWS is properly configured
  /*
  try {
    // First try CloudFront URL
    const cloudfrontUrl = `https://${CLOUDFRONT_DOMAIN}/${modelPath}`
    console.log('🔧 Trying AWS CloudFront URL:', cloudfrontUrl)
    
    // Test if the URL is accessible (only in browser)
    if (typeof window !== 'undefined') {
      const response = await fetch(cloudfrontUrl, { method: 'HEAD' })
      if (response.ok) {
        console.log('✅ AWS CloudFront URL working:', cloudfrontUrl)
        return cloudfrontUrl
      } else {
        console.warn('⚠️ CloudFront URL not accessible, trying S3 direct...')
        throw new Error(`CloudFront returned ${response.status}`)
      }
    } else {
      // On server side, just return CloudFront URL
      return cloudfrontUrl
    }
  } catch (error) {
    console.warn('⚠️ CloudFront failed, trying S3 direct URL...', error)
    
    try {
      // Fallback to S3 direct URL
      const s3Url = `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${modelPath}`
      if (typeof window !== 'undefined') {
        const response = await fetch(s3Url, { method: 'HEAD' })
        if (response.ok) {
          console.log('✅ S3 direct URL working:', s3Url)
          return s3Url
        } else {
          throw new Error(`S3 returned ${response.status}`)
        }
      } else {
        return s3Url
      }
    } catch (s3Error) {
      console.warn('⚠️ AWS S3 failed, falling back to local model...', s3Error)
      
      // Final fallback to local model
      const localUrl = `/models/${modelPath}`
      console.log('🔄 Using local fallback URL:', localUrl)
      return localUrl
    }
  }
  */
}

// Get all available models
export async function getAvailableModels(): Promise<ModelConfig[]> {
  try {
    // For now, return the hardcoded models
    // In the future, you could implement S3 list API to dynamically fetch models
    console.log('🔧 Returning available models from AWS S3')
    return AVAILABLE_MODELS
  } catch (error) {
    console.error('Error fetching models:', error)
    return AVAILABLE_MODELS
  }
}

// Test AWS S3 connection
export async function testAWSConnection(): Promise<boolean> {
  try {
    // Test by trying to fetch a model URL
    const testUrl = await getModelUrl('trecc.glb')
    const isAWS = testUrl.includes('cloudfront.net') || testUrl.includes('s3.amazonaws.com')
    console.log('🔧 Model URL test result:', testUrl, isAWS ? '(AWS)' : '(Local - AWS not configured)')
    return isAWS
  } catch (error) {
    console.error('AWS S3 connection test error:', error)
    return false
  }
}

// Preload model for faster loading
export async function preloadModel(modelPath: string): Promise<void> {
  try {
    const modelUrl = await getModelUrl(modelPath)
    
    // Create a link element to preload the model
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = modelUrl
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    
    console.log(`Preloaded model: ${modelPath}`)
  } catch (error) {
    console.error('Error preloading model:', error)
  }
}
