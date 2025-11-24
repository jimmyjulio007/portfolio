# 🏗️ Architecture Documentation

## FSD (Feature-Sliced Design) Implementation

This project follows the **Feature-Sliced Design** architecture, a methodology for structuring frontend applications that emphasizes scalability, maintainability, and clear separation of concerns.

## 📂 Directory Structure

```
src/
├── app/                    # Application Layer (Next.js specific)
├── widgets/                # Large, self-contained UI blocks
├── features/               # User-facing functionality
├── entities/               # Business entities
└── shared/                 # Reusable resources
    ├── ui/                 # UI components
    ├── lib/                # Utilities and helpers
    ├── config/             # Configuration
    ├── types/              # TypeScript types
    └── assets/             # Static assets
```

## 🎯 Layer Descriptions

### 1. **App Layer** (`src/app/`)
- **Purpose**: Application-level configuration and routing
- **Next.js specific**: App Router pages, layouts, global styles
- **Files**:
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Main home page
  - `globals.css` - Global styles and design tokens

**Responsibility**: Orchestrate the entire application, define routes, and apply global configurations.

---

### 2. **Widgets Layer** (`src/widgets/`)
- **Purpose**: Complete, self-contained UI sections
- **Characteristics**:
  - Independent blocks that can be used on pages
  - Combine multiple features and entities
  - Contain their own state and logic
  
**Examples**:
- `Navigation.tsx` - Top navigation bar
- `HeroSection.tsx` - Hero section with 3D scene
- `WorkSection.tsx` - Project showcase grid
- `AboutSection.tsx` - About section with skills
- `ContactSection.tsx` - Contact form section

**Rule**: Widgets can import from features, entities, and shared, but not from other widgets.

---

### 3. **Features Layer** (`src/features/`)
- **Purpose**: User-facing functionality
- **Characteristics**:
  - Focused on specific user actions
  - Reusable across different widgets
  - Business logic tied to user interactions
  
**Examples**:
- `SVGMorph.tsx` - SVG morphing animations
- `CustomCursor.tsx` - Custom cursor follower
- `PageLoader.tsx` - Page loading animation

**Rule**: Features can import from entities and shared, but not from widgets or other features.

---

### 4. **Entities Layer** (`src/entities/`)
- **Purpose**: Business entities and domain models
- **Characteristics**:
  - Represent core business concepts
  - Independent of features and widgets
  - Contain entity-specific logic
  
**Examples**:
- `HeroObject.tsx` - 3D hero object entity

**Rule**: Entities can only import from shared layer.

---

### 5. **Shared Layer** (`src/shared/`)
- **Purpose**: Reusable code across the entire application
- **Characteristics**:
  - No business logic
  - Pure utilities and components
  - Can be extracted to a separate library
  
**Subdirectories**:

#### `ui/`
- **Purpose**: Reusable UI components
- **Examples**:
  - `Button.tsx` - Premium button component
  - `Scene3D.tsx` - 3D scene wrapper

#### `lib/`
- **Purpose**: Utilities and helper functions
- **Examples**:
  - `utils.ts` - Common utilities (cn, lerp, clamp)
  - `sound-manager.ts` - Sound system singleton

#### `config/`
- **Purpose**: Application configuration
- **Examples**:
  - `constants.ts` - App-wide constants

#### `types/`
- **Purpose**: Shared TypeScript types
- **Examples**:
  - `index.ts` - Common interfaces and types

#### `assets/`
- **Purpose**: Static assets (fonts, sounds, etc.)

**Rule**: Shared layer has no dependencies on other layers.

---

## 🔄 Import Rules

```
app → widgets → features → entities → shared
```

- **App** can import from: widgets, features, entities, shared
- **Widgets** can import from: features, entities, shared
- **Features** can import from: entities, shared
- **Entities** can import from: shared
- **Shared** cannot import from any layer

This one-directional dependency flow ensures:
- ✅ No circular dependencies
- ✅ Clear mental model
- ✅ Easy to test and refactor
- ✅ Scalable architecture

---

## 🎨 SOLID Principles Implementation

### **S - Single Responsibility Principle**
Each component/module has one clear purpose:
- `SoundManager` - Only manages sounds
- `Button` - Only renders a button
- `HeroSection` - Only renders hero section

### **O - Open/Closed Principle**
Components are open for extension via props but closed for modification:
```typescript
<Button variant="primary" size="lg" withSound={true} />
```

### **L - Liskov Substitution Principle**
TypeScript interfaces ensure proper substitutability:
```typescript
interface AnimationConfig {
  duration?: number;
  ease?: string;
}
```

### **I - Interface Segregation Principle**
Small, focused interfaces:
```typescript
interface SoundEffect {
  name: string;
  url: string;
  volume?: number;
}
```

### **D - Dependency Inversion Principle**
Components depend on abstractions (props/interfaces):
```typescript
function Scene3D({ children, enablePostProcessing }: Scene3DProps)
```

---

## 🚀 Benefits of This Architecture

### **Scalability**
- Easy to add new features without affecting existing code
- Clear structure for team collaboration
- Predictable file locations

### **Maintainability**
- One-directional dependencies prevent spaghetti code
- Easy to understand component relationships
- Clear separation of concerns

### **Testability**
- Isolated components are easy to test
- No circular dependencies
- Pure functions in shared layer

### **Developer Experience**
- Clear mental model
- Fast onboarding for new developers
- Consistent patterns throughout

---

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Constants**: camelCase (e.g., `constants.ts`)

### Folders
- **Layers**: camelCase (e.g., `widgets/`, `features/`)
- **Shared subdirectories**: camelCase (e.g., `ui/`, `lib/`)

### Code
- **Components**: PascalCase (e.g., `export function Button()`)
- **Functions**: camelCase (e.g., `function soundManager()`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `SOUND_CONFIG`)

---

## 🔍 Example: Adding a New Feature

Let's say we want to add a "Theme Switcher" feature:

1. **Create the feature**:
   ```
   src/features/ThemeSwitcher.tsx
   ```

2. **Add shared utilities if needed**:
   ```
   src/shared/lib/theme-manager.ts
   ```

3. **Import in a widget**:
   ```typescript
   // src/widgets/Navigation.tsx
   import { ThemeSwitcher } from "@/features/ThemeSwitcher";
   ```

4. **Use in the app**:
   ```typescript
   // src/app/page.tsx
   <Navigation /> // Contains ThemeSwitcher
   ```

This flow maintains the layer hierarchy and keeps dependencies one-directional.

---

## 🎯 Best Practices

1. **Keep layers isolated**
   - Don't create cross-layer dependencies
   - Follow the import rules strictly

2. **Prefer composition over inheritance**
   - Use props for configuration
   - Leverage TypeScript interfaces

3. **Keep shared layer pure**
   - No business logic
   - Only reusable utilities and components

4. **Document complex logic**
   - Add JSDoc comments
   - Explain non-obvious decisions

5. **Follow SOLID principles**
   - Single responsibility per file
   - Open for extension, closed for modification

---

## 📚 Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Last Updated**: 2026
**Architecture**: FSD (Feature-Sliced Design)
**Principles**: SOLID, Clean Code, DRY
