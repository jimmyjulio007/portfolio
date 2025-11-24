# 🚀 Cyber-Fluid Portfolio 2026

A high-voltage, futuristic portfolio website featuring a reactive particle field, fluid smooth scrolling, and a "Neon Noir" aesthetic.

## ✨ Features

### 🎨 **Cyber-Fluid Aesthetic**
- **Theme**: Deep Void Black, Electric Cyan, Acid Lime
- **Typography**: Space Grotesk (Headers) & Outfit (Body)
- **Brutalism**: Asymmetrical layouts, mono fonts, raw borders
- **Glassmorphism**: Dark, frosted glass panels

### 🎭 **Advanced Interactions**
- **"Wizard Mode"**: Zero-latency 3D particles & magnetic UI elements
- **"Slice Column" Reveal**: Cinematic 5-column staggered loading sequence
- **Liquid Physics**: 5000-particle 3D cloud with smooth mouse interpolation
- **Smooth Scroll**: Integrated **Lenis** for buttery smooth momentum
- **Horizontal Gallery**: Responsive horizontal scroll for desktop, vertical for mobile

### 🏗️ **Architecture**
- **FSD Architecture**: Feature-Sliced Design
- **Tech Stack**: Next.js 16, React Three Fiber, GSAP, Tailwind v4
- **Performance**: Optimized WebGL and animations

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

## 📂 Structure

- `src/widgets/HeroSection`: 3D Particle Field & Brutalist Typography
- `src/widgets/WorkSection`: Responsive Horizontal Gallery
- `src/widgets/PlaygroundSection`: Interactive R&D lab with magnetic list
- `src/entities/HeroObject`: The reactive particle system logic
- `src/features/PageLoader`: The "Slice Column" reveal effect
- `src/shared/ui/Magnetic`: Magnetic interaction wrapper

## 🎨 Customization

### Colors
Edit `src/app/globals.css` in the `@theme` block:
```css
--color-cyan-electric: #00f0ff;
--color-lime-acid: #ccff00;
```

### 3D Particles
Edit `src/entities/HeroObject.tsx` to change particle count, colors, or behavior.

---

**2026 • SYSTEM ONLINE** 🚀
