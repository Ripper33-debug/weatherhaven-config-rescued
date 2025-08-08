# TRECC 3D Configurator

A modern, interactive 3D configurator for the Weatherhaven TRECC military shelter. Built with React, Three.js, and Tailwind CSS.

## Features

- **Interactive 3D Model**: Full rotation, zoom, and pan controls
- **Deployment Animation**: Toggle between deployed and stowed states
- **Interior/Exterior Views**: Switch between inside and outside perspectives
- **Color Customization**: Multiple military-grade color options
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Professional transitions and loading states
- **Modern UI**: Glass-morphism design inspired by premium configurators

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trecc-configurator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Controls

- **Mouse/Touch**: Drag to rotate the model
- **Scroll**: Zoom in/out
- **Right-click + drag**: Pan the view

### Configuration Options

1. **Deployment State**: Toggle between deployed (🛖) and stowed (📦) configurations
2. **View Mode**: Switch between outside (🏠) and inside (👁️) views
3. **Color Selection**: Choose from 6 military-grade color options:
   - Military Green
   - Desert Tan
   - Arctic White
   - Navy Blue
   - Charcoal
   - Camo Brown

## Integrating Your 3D Models

### Current Implementation

The app currently uses a procedural geometry for demonstration. To integrate your actual GLB/GLTF models:

1. **Place your model files** in the `public/models/` directory
2. **Update the ModelViewer component** (`src/components/ModelViewer.tsx`):

```typescript
// Replace the procedural geometry with your model
const { scene: modelScene } = useGLTF('/models/your-shelter-model.glb');

// Clone the scene for manipulation
const modelRef = useRef<Group>(null);

useEffect(() => {
  if (modelRef.current && modelScene) {
    // Clear existing geometry
    modelRef.current.clear();
    
    // Clone and add your model
    const clonedScene = modelScene.clone();
    modelRef.current.add(clonedScene);
    
    // Apply materials and transformations
    clonedScene.traverse((child) => {
      if (child instanceof Mesh) {
        // Apply color changes
        if (child.material) {
          child.material.color.setHex(configState.color.replace('#', '0x'));
        }
      }
    });
  }
}, [modelScene, configState.color]);
```

### Model Requirements

- **Format**: GLB or GLTF
- **Optimization**: Compressed textures, reasonable polygon count
- **Materials**: PBR materials for best visual quality
- **Scale**: Properly scaled for the scene (1 unit = 1 meter recommended)

### Animation Support

For deployment animations, ensure your model includes:
- Separate meshes for deployable sections
- Proper bone structure for skeletal animations
- Named objects for easy identification

## Customization

### Adding New Colors

Edit the `colorOptions` array in `src/components/Controls.tsx`:

```typescript
const colorOptions = [
  // ... existing colors
  { name: 'New Color', value: '#HEXCODE' },
];
```

### Modifying Animations

Update the animation logic in `src/components/ModelViewer.tsx`:

```typescript
// For deployment animations
useFrame((state) => {
  if (groupRef.current) {
    // Add your custom animation logic here
    const targetScale = configState.isDeployed ? 1 : 0.3;
    groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.05);
  }
});
```

### Styling

The app uses Tailwind CSS with custom components. Key classes:
- `.glass-panel`: Glass-morphism effect
- `.btn-primary`: Primary button styling
- `.btn-secondary`: Secondary button styling
- `.color-option`: Color picker styling

## Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

## Performance Optimization

- **Model Optimization**: Use compressed textures and optimized geometry
- **Lazy Loading**: Implement progressive loading for large models
- **Level of Detail**: Add LOD systems for complex models
- **Texture Compression**: Use KTX2 or DDS formats for better compression

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Common Issues

1. **Model not loading**: Check file path and format
2. **Performance issues**: Optimize model geometry and textures
3. **Controls not working**: Ensure Three.js dependencies are properly installed

### Debug Mode

Enable debug mode by adding to your environment variables:
```
REACT_APP_DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Weatherhaven for the TRECC shelter design
- Three.js community for 3D graphics support
- React Three Fiber for React integration
