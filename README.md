# ⚡ JIMMY JULIO | NEXT-GEN PORTFOLIO 2026

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"Architecting Intelligence."**
> A high-performance, cyberpunk-themed portfolio featuring zero-latency 3D interactions, fluid animations, and a fully internationalized architecture.

---

## ✨ Features

### 🎨 **Cyberpunk Aesthetic**
- **Neon Noir Theme**: Deep Void Black (#000000), Electric Cyan (#00f0ff), Acid Lime (#ccff00).
- **Cinematic Reveal**: "Slice Column" loading sequence with staggered animations.
- **Interactive 3D**: React Three Fiber integration for immersive hero elements.
- **Magnetic UI**: Custom magnetic cursor and button interactions.

### � **Internationalization (i18n)**
- **6 Languages Supported**: English, French, Japanese, Chinese, German, Arabic.
- **Auto-Detection**: Middleware-based locale detection.
- **RTL Support**: Full Right-to-Left layout support for Arabic.

### 🛡️ **Privacy & Compliance**
- **Cookie Consent**: GDPR-compliant, persistent cookie banner with animations.
- **Privacy Policy**: Comprehensive, multi-language privacy protocol page.
- **Security**: Content Security Policy (CSP) and secure headers.

### 📧 **Contact System**
- **Nodemailer Integration**: Server-side email sending with custom HTML templates.
- **Zod Validation**: Robust, multi-language form validation.
- **Cyberpunk Email Templates**: Dark-themed, branded email notifications.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **pnpm**: v8.0.0 or higher (recommended)

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/jimmyjulio007/portfolio.git

# 2. Navigate to directory
cd portfolio

# 3. Install dependencies
pnpm install

# 4. Set up environment variables
cp .env.example .env.local

# 5. Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌍 International Installation Guides

<details>
<summary><strong>🇫🇷 Français (French)</strong></summary>

### Installation
1.  **Cloner le dépôt** : `git clone https://github.com/jimmyjulio007/portfolio.git`
2.  **Installer les dépendances** : `pnpm install`
3.  **Configurer l'environnement** : Copiez `.env.example` vers `.env.local` et remplissez les variables.
4.  **Lancer le serveur** : `pnpm dev`

</details>

<details>
<summary><strong>🇯🇵 日本語 (Japanese)</strong></summary>

### インストール手順
1.  **リポジトリをクローン**：`git clone https://github.com/jimmyjulio007/portfolio.git`
2.  **依存関係をインストール**：`pnpm install`
3.  **環境設定**：`.env.example` を `.env.local` にコピーし、変数を設定します。
4.  **サーバー起動**：`pnpm dev`

</details>

<details>
<summary><strong>🇨🇳 中文 (Chinese)</strong></summary>

### 安装指南
1.  **克隆仓库**：`git clone https://github.com/jimmyjulio007/portfolio.git`
2.  **安装依赖**：`pnpm install`
3.  **配置环境**：将 `.env.example` 复制为 `.env.local` 并填写变量。
4.  **启动服务器**：`pnpm dev`

</details>

<details>
<summary><strong>🇩🇪 Deutsch (German)</strong></summary>

### Installation
1.  **Repository klonen**: `git clone https://github.com/jimmyjulio007/portfolio.git`
2.  **Abhängigkeiten installieren**: `pnpm install`
3.  **Umgebung einrichten**: Kopieren Sie `.env.example` nach `.env.local` und füllen Sie die Variablen aus.
4.  **Server starten**: `pnpm dev`

</details>

<details>
<summary><strong>🇸🇦 العربية (Arabic)</strong></summary>

### دليل التثبيت
1.  **استنساخ المستودع**: `git clone https://github.com/jimmyjulio007/portfolio.git`
2.  **تثبيت التبعيات**: `pnpm install`
3.  **إعداد البيئة**: انسخ `.env.example` إلى `.env.local` واملأ المتغيرات.
4.  **تشغيل الخادم**: `pnpm dev`

</details>

---

## ⚙️ Environment Variables

Create a `.env.local` file with the following keys:

```env
# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
```

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/        # Internationalized routes
│   │   ├── layout.tsx   # Root layout with providers
│   │   ├── page.tsx     # Home page
│   │   └── privacy/     # Privacy Policy page
│   └── api/             # API Routes (Contact form)
├── features/            # Feature-based components
│   ├── CookieConsent    # GDPR Cookie Banner
│   ├── CinematicLoader  # Initial loading sequence
│   └── PageLoader       # Page transition effects
├── widgets/             # Complex UI widgets
│   ├── HeroSection      # 3D Hero with Particles
│   ├── Navigation       # Responsive Header
│   └── ContactSection   # Contact Form with Validation
├── shared/              # Shared utilities & UI
│   ├── ui/              # Reusable atoms (Button, Input)
│   ├── lib/             # Helpers (Email, Validation)
│   └── config/          # Constants & Config
└── messages/            # i18n Translation JSONs
    ├── en.json
    ├── fr.json
    └── ...
```

---

## 🛠️ Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint

---

**© 2025 Jimmy Julio. All Rights Reserved.**
*System Status: ONLINE // V3.0* 🚀
