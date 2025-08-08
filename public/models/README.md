# 3D Models Directory

Place your TRECC shelter 3D model files in this directory.

## Supported Formats

- `.glb` (recommended)
- `.gltf`

## File Naming Convention

- `trecc-shelter.glb` - Main shelter model
- `trecc-deployed.glb` - Deployed state model
- `trecc-stowed.glb` - Stowed state model

## Model Requirements

1. **Scale**: 1 unit = 1 meter
2. **Origin**: Center of the shelter base
3. **Materials**: PBR materials for best visual quality
4. **Textures**: Compressed formats (KTX2, DDS) recommended
5. **Polygon Count**: Optimized for web performance (< 50k triangles)

## Integration

After placing your model files, update the `ModelViewer.tsx` component to load your specific model:

```typescript
const { scene: modelScene } = useGLTF('/models/trecc-shelter.glb');
```

## Example Model Structure

```
models/
├── trecc-shelter.glb          # Main model
├── trecc-deployed.glb         # Deployed state
├── trecc-stowed.glb           # Stowed state
└── textures/                  # Texture files (if separate)
    ├── shelter_diffuse.ktx2
    ├── shelter_normal.ktx2
    └── shelter_roughness.ktx2
```
