# Trauma In A Can™

Put your trauma-related images, logos, and other static assets here.

## Suggested Assets

- `logo.png` - Main logo (512x512)
- `favicon.ico` - Browser favicon
- `og-image.png` - Open Graph image for social sharing (1200x630)
- `can-placeholder.png` - Default product image

## Image Guidelines

- Use high-quality images
- Optimize for web (compress before uploading)
- Use descriptive filenames
- Transparent backgrounds for logos (PNG)

## Usage in Components

```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Trauma In A Can" 
  width={512} 
  height={512} 
/>
```

Or direct reference:
```html
<img src="/logo.png" alt="Logo" />
```
