# ⚡ JIMMY JULIO | PORTFOLIO NOUVELLE GÉNÉRATION 2026

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"Architecturer l'Intelligence."**
> Un portfolio haute performance au thème cyberpunk, proposant des interactions 3D sans latence, des animations fluides et une architecture entièrement internationalisée.

---

## ✨ Fonctionnalités

### 🎨 **Esthétique Cyberpunk**
- **Thème Neon Noir** : Noir Vide Profond (#000000), Cyan Électrique (#00f0ff), Citron Acide (#ccff00).
- **Révélation Cinématographique** : Séquence de chargement "Slice Column" avec animations décalées.
- **3D Interactif** : Intégration React Three Fiber pour des éléments héroïques immersifs.
- **UI Magnétique** : Interactions personnalisées de curseur et de boutons magnétiques.

### 🌍 **Internationalisation (i18n)**
- **6 Langues Supportées** : Anglais, Français, Japonais, Chinois, Allemand, Arabe.
- **Détection Auto** : Détection locale basée sur le middleware.
- **Support RTL** : Mise en page complète de droite à gauche pour l'Arabe.

### 🛡️ **Confidentialité & Conformité**
- **Consentement aux Cookies** : Bannière de cookies persistante et animée, conforme au RGPD.
- **Politique de Confidentialité** : Page de protocole de confidentialité complète et multilingue.
- **Sécurité** : Politique de Sécurité du Contenu (CSP) et en-têtes sécurisés.

### 📧 **Système de Contact**
- **Intégration Nodemailer** : Envoi d'e-mails côté serveur avec modèles HTML personnalisés.
- **Validation Zod** : Validation de formulaire robuste et multilingue.
- **Modèles d'E-mail Cyberpunk** : Notifications par e-mail au thème sombre et marqué.

---

## 🚀 Commencer

### Prérequis
- **Node.js** : v18.17.0 ou supérieur
- **pnpm** : v8.0.0 ou supérieur (recommandé)

### 📦 Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/jimmyjulio007/portfolio.git

# 2. Naviguer vers le répertoire
cd portfolio

# 3. Installer les dépendances
pnpm install

# 4. Configurer les variables d'environnement
cp .env.example .env.local

# 5. Lancer le serveur de développement
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

---

## ⚙️ Variables d'Environnement

Créez un fichier `.env.local` avec les clés suivantes :

```env
# URL de l'application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Configuration E-mail (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre-email@gmail.com
MAIL_PASS=votre-mot-de-passe-application
```

---

## 📂 Structure du Projet

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/        # Routes internationalisées
│   │   ├── layout.tsx   # Mise en page racine avec fournisseurs
│   │   ├── page.tsx     # Page d'accueil
│   │   └── privacy/     # Page de Politique de Confidentialité
│   └── api/             # Routes API (Formulaire de contact)
├── features/            # Composants basés sur les fonctionnalités
│   ├── CookieConsent    # Bannière de Cookies RGPD
│   ├── CinematicLoader  # Séquence de chargement initiale
│   └── PageLoader       # Effets de transition de page
├── widgets/             # Widgets UI complexes
│   ├── HeroSection      # Hero 3D avec Particules
│   ├── Navigation       # En-tête réactif
│   └── ContactSection   # Formulaire de contact avec validation
├── shared/              # Utilitaires & UI partagés
│   ├── ui/              # Atomes réutilisables (Bouton, Entrée)
│   ├── lib/             # Aides (E-mail, Validation)
│   └── config/          # Constantes & Config
└── messages/            # JSONs de traduction i18n
    ├── en.json
    ├── fr.json
    └── ...
```

---

## 🛠️ Scripts

- `pnpm dev` : Démarrer le serveur de développement
- `pnpm build` : Construire pour la production
- `pnpm start` : Démarrer le serveur de production
- `pnpm lint` : Exécuter ESLint

---

**© 2026 Jimmy Julio. Tous droits réservés.**
*État du Système : EN LIGNE // V3.0* 🚀
