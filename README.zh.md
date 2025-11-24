# ⚡ JIMMY JULIO | 下一代作品集 2026

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"构筑智能。"**
> 一个高性能、赛博朋克主题的作品集，具有零延迟 3D 交互、流畅动画和完全国际化的架构。

---

## ✨ 功能特性

### 🎨 **赛博朋克美学**
- **霓虹黑色主题**：深空黑 (#000000)、电光青 (#00f0ff)、酸性黄 (#ccff00)。
- **电影级揭示**：带有交错动画的“切片列”加载序列。
- **交互式 3D**：集成 React Three Fiber 以实现沉浸式英雄元素。
- **磁性 UI**：自定义磁性光标和按钮交互。

### 🌍 **国际化 (i18n)**
- **支持 6 种语言**：英语、法语、日语、中文、德语、阿拉伯语。
- **自动检测**：基于中间件的区域设置检测。
- **RTL 支持**：完全支持阿拉伯语的从右到左布局。

### 🛡️ **隐私与合规**
- **Cookie 同意**：符合 GDPR 的持久性动画 Cookie 横幅。
- **隐私政策**：全面的多语言隐私协议页面。
- **安全性**：内容安全策略 (CSP) 和安全标头。

### 📧 **联系系统**
- **Nodemailer 集成**：使用自定义 HTML 模板的服务器端邮件发送。
- **Zod 验证**：强大的多语言表单验证。
- **赛博朋克邮件模板**：深色主题的品牌邮件通知。

---

## 🚀 快速开始

###先决条件
- **Node.js**：v18.17.0 或更高版本
- **pnpm**：v8.0.0 或更高版本（推荐）

### 📦 安装

```bash
# 1. 克隆仓库
git clone https://github.com/jimmyjulio007/portfolio.git

# 2. 进入目录
cd portfolio

# 3. 安装依赖
pnpm install

# 4. 设置环境变量
cp .env.example .env.local

# 5. 运行开发服务器
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用程序。

---

## ⚙️ 环境变量

创建一个包含以下键的 `.env.local` 文件：

```env
# 应用 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 邮件配置 (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
```

---

## 📂 项目结构

```
src/
├── app/                 # Next.js 应用路由
│   ├── [locale]/        # 国际化路由
│   │   ├── layout.tsx   # 带提供程序的根布局
│   │   ├── page.tsx     # 主页
│   │   └── privacy/     # 隐私政策页面
│   └── api/             # API 路由 (联系表单)
├── features/            # 基于功能的组件
│   ├── CookieConsent    # GDPR Cookie 横幅
│   ├── CinematicLoader  # 初始加载序列
│   └── PageLoader       # 页面过渡效果
├── widgets/             # 复杂 UI 小部件
│   ├── HeroSection      # 带粒子的 3D 英雄区域
│   ├── Navigation       # 响应式页眉
│   └── ContactSection   # 带验证的联系表单
├── shared/              # 共享实用程序和 UI
│   ├── ui/              # 可重用原子组件 (按钮, 输入框)
│   ├── lib/             # 助手 (邮件, 验证)
│   └── config/          # 常量和配置
└── messages/            # i18n 翻译 JSON
    ├── en.json
    ├── fr.json
    └── ...
```

---

## 🛠️ 脚本

- `pnpm dev`：启动开发服务器
- `pnpm build`：构建生产版本
- `pnpm start`：启动生产服务器
- `pnpm lint`：运行 ESLint

---

**© 2026 Jimmy Julio. 保留所有权利。**
*系统状态：在线 // V3.0* 🚀
