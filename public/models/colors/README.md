# Color-Specific 3D Models

This directory contains different 3D models for each color variant of the TRECC shelter system.

## Model Naming Convention

### TRECC Models (Closed/Packed)
- `trecc.glb` - Default model (fallback)
- `trecc-desert.glb` - Desert Tan variant
- `trecc-green.glb` - OD Green variant  
- `trecc-white.glb` - Arctic White variant

### TRECC Models (Open/Deployed)
- `trecc-open.glb` - Default deployed model (fallback)
- `trecc-open-desert.glb` - Desert Tan deployed variant
- `trecc-open-green.glb` - OD Green deployed variant
- `trecc-open-white.glb` - Arctic White deployed variant

### Interior Models
- `interior.glb` - Default interior model (fallback)
- `interior-desert.glb` - Desert Tan interior variant
- `interior-green.glb` - OD Green interior variant
- `interior-white.glb` - Arctic White interior variant

## Color Values
- **Desert Tan**: `#8B7355`
- **OD Green**: `#4A5D23`
- **Arctic White**: `#F5F5F5`

## File Organization
```
public/models/
├── trecc.glb (default)
├── trecc-desert.glb
├── trecc-green.glb
├── trecc-white.glb
├── trecc-open.glb (default)
├── trecc-open-desert.glb
├── trecc-open-green.glb
├── trecc-open-white.glb
├── interiors/
│   ├── interior.glb (default)
│   ├── interior-desert.glb
│   ├── interior-green.glb
│   └── interior-white.glb
└── colors/
    └── README.md (this file)
```

## Benefits
- **Better Visual Quality**: Colors are baked into the models with proper materials
- **Realistic Materials**: Each color can have different textures, reflections, and properties
- **Performance**: No runtime color application needed
- **Professional Look**: More realistic and polished appearance

## Adding New Colors
1. Create the new color variant models with the appropriate suffix
2. Add the color to the `colorOptions` array in `ShelterConfigurator.tsx`
3. Add the color case to the `getColorSuffix` function
4. Update this README with the new color information
