# 3D Models Directory

This directory contains all 3D models used in the Weatherhaven Shelter Configurator.

## Model Structure

```
models/
├── trecc-main.glb          # Main TRECC shelter model
├── hercon-main.glb         # Main HERCON shelter model
├── mts-main.glb            # Modular Tentage System
├── series-main.glb         # Series shelters
├── mex26-main.glb          # MEX-26 maintenance shelter
├── polar-main.glb          # Polar shelters
├── rdmss-main.glb          # Rapidly Deployed Modular Shelter System
├── ateps-main.glb          # Air-Transportable Expandable Pallet Shelter
├── mecc-main.glb           # Mobile Expandable Container Configuration
├── interiors/              # Interior customization options
│   ├── trecc-command.glb    # TRECC command post interior
│   ├── trecc-medical.glb    # TRECC medical unit interior
│   ├── trecc-living.glb     # TRECC living quarters interior
│   ├── trecc-communications.glb  # TRECC communications hub interior
│   ├── trecc-storage.glb    # TRECC equipment storage interior
│   ├── trecc-kitchen.glb    # TRECC field kitchen interior
│   ├── trecc-drone-manufacturing.glb # TRECC drone manufacturing interior
│   ├── hercon-command.glb   # HERCON command post interior
│   ├── hercon-medical.glb   # HERCON medical facility interior
│   ├── hercon-living.glb    # HERCON living quarters interior
│   ├── hercon-storage.glb   # HERCON equipment storage interior
│   ├── mts-standard.glb     # MTS standard interior
│   ├── mts-medical.glb      # MTS medical interior
│   ├── series-standard.glb  # Series standard interior
│   ├── series-tropical.glb  # Series tropical interior
│   ├── series-shop.glb      # Series shop interior
│   ├── mex26-maintenance.glb # MEX-26 maintenance interior
│   ├── polar-standard.glb   # Polar standard interior
│   ├── rdmss-standard.glb   # RDMSS standard interior
│   ├── ateps-standard.glb   # ATEPS standard interior
│   └── mecc-standard.glb    # MECC standard interior
└── accessories/            # Additional equipment
    ├── solar-panels.glb
    ├── hvac-system.glb
    └── lighting.glb
```

## Adding Your 3D Models

### Step 1: Prepare Your Models
- Export your models as **GLB format** for optimal web performance
- Ensure models are properly scaled (1 unit = 1 meter recommended)
- Optimize polygon count for web rendering
- Include embedded textures in GLB files

### Step 2: File Naming Convention
Use the exact file names shown above. The application looks for these specific names:
- Main shelter models: `[shelter-type]-main.glb`
- Interior models: `[shelter-type]-[configuration].glb`

### Step 3: Place Models in Correct Folders
- **Main shelter models**: Place directly in `public/models/`
- **Interior models**: Place in `public/models/interiors/`
- **Accessories**: Place in `public/models/accessories/`

### Step 4: Model Requirements

#### Main Shelter Models
- **Format**: GLB (GL Binary)
- **Scale**: Properly scaled for the scene
- **Materials**: PBR materials for best visual quality
- **Optimization**: Compressed textures, reasonable polygon count

#### Interior Models
- **Format**: GLB
- **Scale**: Match the main shelter scale
- **Positioning**: Properly positioned within shelter bounds
- **Materials**: Compatible with main shelter materials

#### Animation Support
For deployment animations, ensure your model includes:
- Separate meshes for deployable sections
- Proper bone structure for skeletal animations
- Named objects for easy identification

## Current Status

**⚠️ PLACEHOLDER MODELS IN USE**
The application currently uses procedural geometry for demonstration. Replace these with your actual GLB models when ready.

## Integration Notes

When you add your models:
1. The application will automatically detect and load them
2. Color customization will be applied to your model materials
3. Interior switching will load the appropriate interior models
4. Deployment animations will work if your models include them

## Performance Tips

- **Model Size**: Keep individual GLB files under 10MB for fast loading
- **Texture Compression**: Use compressed textures (KTX2, DDS, or compressed PNG/JPG)
- **Level of Detail**: Consider adding LOD systems for complex models
- **Progressive Loading**: Large models can be loaded progressively

## Troubleshooting

### Model Not Loading
- Check file path and naming
- Ensure GLB format is valid
- Verify file permissions

### Performance Issues
- Optimize model geometry
- Compress textures
- Reduce polygon count if needed

### Material Issues
- Ensure materials are PBR-compatible
- Check texture file paths
- Verify material naming conventions

## Support

For integration assistance, refer to the main application documentation or contact the development team.
