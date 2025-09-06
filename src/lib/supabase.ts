import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket name for models
export const MODELS_BUCKET = 'models'

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
  },
  {
    id: 'command-posting',
    name: 'Command Posting',
    path: 'interiors/CommandPosting.glb',
    description: 'Interior command center configuration',
    dimensions: { length: 20, width: 8, height: 8 },
    weight: 5000,
    capacity: 8
  }
]

// Get model URL from Supabase Storage
export async function getModelUrl(modelPath: string): Promise<string> {
  try {
    const { data } = await supabase.storage
      .from(MODELS_BUCKET)
      .getPublicUrl(modelPath)
    
    return data.publicUrl
  } catch (error) {
    console.error('Error getting model URL:', error)
    // Fallback to local path
    return `/models/${modelPath}`
  }
}

// Get all available models
export async function getAvailableModels(): Promise<ModelConfig[]> {
  try {
    const { data, error } = await supabase.storage
      .from(MODELS_BUCKET)
      .list('', {
        limit: 100,
        offset: 0,
      })

    if (error) {
      console.error('Error fetching models:', error)
      return AVAILABLE_MODELS
    }

    // Filter for GLB files and map to ModelConfig
    const models = data
      .filter(file => file.name.endsWith('.glb'))
      .map(file => ({
        id: file.name.replace('.glb', ''),
        name: file.name.replace('.glb', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: file.name,
        description: `3D model: ${file.name}`,
        dimensions: { length: 20, width: 8, height: 8 },
        weight: 5000,
        capacity: 12
      }))

    return models.length > 0 ? models : AVAILABLE_MODELS
  } catch (error) {
    console.error('Error fetching models:', error)
    return AVAILABLE_MODELS
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
