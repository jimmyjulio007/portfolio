# 🚀 Setup Guide

## Quick Start

Get your stunning portfolio up and running in minutes!

### Prerequisites

- **Node.js**: 20.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Git**: For version control

### Installation Steps

1. **Clone or download the repository**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

🎉 **You should now see your portfolio!**

---

## Configuration

### 1. Update Site Metadata

Edit `src/shared/config/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Your Name",  // Change this
  title: "Portfolio | Creative Developer",  // Change this
  description: "Your custom description here",  // Change this
  url: "https://yourportfolio.com",  // Change this
} as const;
```

### 2. Customize Content

#### Hero Section
- File: `src/widgets/HeroSection.tsx`
- Update the title and subtitle text
- Modify the CTA button labels

#### Projects
- File: `src/widgets/WorkSection.tsx`
- Edit the `PROJECTS` array
- Add your project images to `public/projects/`

Example:
```typescript
const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Your Project Name",
    description: "Project description",
    category: "Category",
    year: 2026,
    tags: ["React", "Next.js"],
    image: "/projects/yourproject.jpg",
    link: "https://yourproject.com",
  },
  // Add more projects...
];
```

#### About & Skills
- File: `src/widgets/AboutSection.tsx`
- Update the bio text
- Modify the `SKILLS` array

```typescript
const SKILLS = [
  { name: "Your Skill", level: 95 },
  // Add more skills...
];
```

### 3. Add Sound Effects

1. Create the sounds directory (if not exists):
   ```bash
   mkdir -p public/sounds
   ```

2. Add your sound files:
   - `public/sounds/hover.mp3` - UI hover effect
   - `public/sounds/click.mp3` - Button click
   - `public/sounds/transition.mp3` - Page transitions
   - `public/sounds/ambient.mp3` - Background ambient (optional)

**Free Sound Resources:**
- [Freesound.org](https://freesound.org/)
- [Mixkit](https://mixkit.co/free-sound-effects/)
- [Pixabay](https://pixabay.com/sound-effects/)

**Tip**: Keep UI sound files under 50KB for better performance.

### 4. Add Project Images

1. Add images to `public/projects/`:
   ```
   public/
   └── projects/
       ├── project1.jpg
       ├── project2.jpg
       └── project3.jpg
   ```

2. Update image paths in `WorkSection.tsx`:
   ```typescript
   image: "/projects/yourproject.jpg"
   ```

**Recommended dimensions**: 800x1000px (4:5 aspect ratio)

### 5. Customize Colors

The portfolio uses a sophisticated purple/indigo color scheme. To customize:

Edit `src/app/globals.css` in the `@theme` section:

```css
@theme {
  --color-purple-400: #c084fc;  /* Change to your color */
  --color-indigo-400: #818cf8;  /* Change to your color */
  /* etc... */
}
```

**Pro Tip**: Use complementary colors and avoid harsh contrasts for a premium feel.

---

## Development

### Available Scripts

```bash
# Development server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

### Development Tips

1. **Hot Reload**: Changes are reflected instantly while dev server is running
2. **Component Structure**: Follow FSD architecture (see `ARCHITECTURE.md`)
3. **SOLID Principles**: Keep components focused and single-purpose
4. **Performance**: Use `React.memo()` for expensive components

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The portfolio is a standard Next.js app and can be deployed to:
- **Netlify**
- **Cloudflare Pages**
- **AWS Amplify**
- **Railway**
- **Self-hosted** (with Node.js)

### Build Command
```bash
pnpm build
```

### Start Command
```bash
pnpm start
```

---

## Troubleshooting

### Issue: Port 3000 already in use

**Solution**:
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
PORT=3001 pnpm dev
```

### Issue: Tailwind classes not working

**Solution**: Make sure you're using Tailwind v4 syntax. This portfolio uses `@theme` directive instead of the traditional `tailwind.config.js`.

### Issue: 3D scene not rendering

**Possible causes**:
- WebGL not supported in browser
- GPU drivers outdated
- Running in incognito mode with hardware acceleration disabled

**Solution**: Test in a modern browser (Chrome, Firefox, Safari, Edge)

### Issue: Sounds not playing

**Causes**:
- Sound files missing from `public/sounds/`
- Browser autoplay policy

**Solution**:
1. Add sound files to correct directory
2. User interaction required for first sound to play

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

**Note**: The 3D features require WebGL 2.0 support.

---

## Performance Optimization

### Production Build
Always use production builds for deployment:
```bash
pnpm build
pnpm start
```

### Image Optimization
- Use Next.js `<Image>` component for automatic optimization
- Compress images before uploading
- Use modern formats (WebP, AVIF)

### 3D Optimization
- The 3D scene is optimized with:
  - Dynamic DPR (Device Pixel Ratio)
  - Efficient geometry
  - Proper lighting setup
  - Post-processing controlled by props

---

## Customization Ideas

🎨 **Visual Enhancements**:
- Add more 3D objects to the hero
- Create additional SVG morph shapes
- Implement parallax scrolling effects

🎭 **Interactive Features**:
- Add a blog section
- Implement form submission (ContactSection)
- Create project filtering

🎵 **Audio Experience**:
- Add background music toggle
- Implement spatial audio for 3D objects
- Create unique sounds for different sections

---

## Support

If you encounter issues:
1. Check this guide
2. Review `ARCHITECTURE.md` for structure
3. Check `README.md` for features
4. Open an issue on GitHub

---

## Next Steps

After setup, you should:
1. ✅ Customize content (name, bio, projects)
2. ✅ Add your images
3. ✅ Test all sections
4. ✅ Deploy to production
5. ✅ Share your amazing portfolio! 🚀

---

**Happy coding!** 🎉
