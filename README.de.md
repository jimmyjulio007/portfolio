# ⚡ JIMMY JULIO | NEXT-GEN PORTFOLIO 2026

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"Intelligenz Architektieren."**
> Ein leistungsstarkes Portfolio im Cyberpunk-Stil mit latenzfreien 3D-Interaktionen, flüssigen Animationen und einer vollständig internationalisierten Architektur.

---

## ✨ Funktionen

### 🎨 **Cyberpunk-Ästhetik**
- **Neon Noir Theme**: Tiefes Leere-Schwarz (#000000), Elektrisches Cyan (#00f0ff), Säure-Limette (#ccff00).
- **Cinematic Reveal**: "Slice Column" Ladesequenz mit versetzten Animationen.
- **Interaktives 3D**: React Three Fiber Integration für immersive Hero-Elemente.
- **Magnetische UI**: Benutzerdefinierte magnetische Cursor- und Button-Interaktionen.

### 🌍 **Internationalisierung (i18n)**
- **6 Unterstützte Sprachen**: Englisch, Französisch, Japanisch, Chinesisch, Deutsch, Arabisch.
- **Automatische Erkennung**: Middleware-basierte Standorterkennung.
- **RTL-Unterstützung**: Vollständige Rechts-nach-Links-Layout-Unterstützung für Arabisch.

### 🛡️ **Datenschutz & Compliance**
- **Cookie-Einwilligung**: DSGVO-konformer, dauerhafter Cookie-Banner mit Animationen.
- **Datenschutzrichtlinie**: Umfassende, mehrsprachige Datenschutzprotokoll-Seite.
- **Sicherheit**: Content Security Policy (CSP) und sichere Header.

### 📧 **Kontakt-System**
- **Nodemailer Integration**: Serverseitiger E-Mail-Versand mit benutzerdefinierten HTML-Vorlagen.
- **Zod Validierung**: Robuste, mehrsprachige Formularvalidierung.
- **Cyberpunk E-Mail-Vorlagen**: Dunkle, gebrandete E-Mail-Benachrichtigungen.

---

## 🚀 Erste Schritte

### Voraussetzungen
- **Node.js**: v18.17.0 oder höher
- **pnpm**: v8.0.0 oder höher (empfohlen)

### 📦 Installation

```bash
# 1. Repository klonen
git clone https://github.com/jimmyjulio007/portfolio.git

# 2. In das Verzeichnis wechseln
cd portfolio

# 3. Abhängigkeiten installieren
pnpm install

# 4. Umgebungsvariablen einrichten
cp .env.example .env.local

# 5. Entwicklungsserver starten
pnpm dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000), um die Anwendung anzuzeigen.

---

## ⚙️ Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei mit den folgenden Schlüsseln:

```env
# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# E-Mail-Konfiguration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=ihre-email@gmail.com
MAIL_PASS=ihr-app-spezifisches-passwort
```

---

## 📂 Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/        # Internationalisierte Routen
│   │   ├── layout.tsx   # Root-Layout mit Providern
│   │   ├── page.tsx     # Startseite
│   │   └── privacy/     # Datenschutzrichtlinien-Seite
│   └── api/             # API-Routen (Kontaktformular)
├── features/            # Feature-basierte Komponenten
│   ├── CookieConsent    # DSGVO Cookie-Banner
│   ├── CinematicLoader  # Initiale Ladesequenz
│   └── PageLoader       # Seitenübergangseffekte
├── widgets/             # Komplexe UI-Widgets
│   ├── HeroSection      # 3D Hero mit Partikeln
│   ├── Navigation       # Responsiver Header
│   └── ContactSection   # Kontaktformular mit Validierung
├── shared/              # Gemeinsame Utilities & UI
│   ├── ui/              # Wiederverwendbare Atome (Button, Input)
│   ├── lib/             # Helfer (E-Mail, Validierung)
│   └── config/          # Konstanten & Konfiguration
└── messages/            # i18n Übersetzungs-JSONs
    ├── en.json
    ├── fr.json
    └── ...
```

---

## 🛠️ Skripte

- `pnpm dev`: Entwicklungsserver starten
- `pnpm build`: Für Produktion bauen
- `pnpm start`: Produktionsserver starten
- `pnpm lint`: ESLint ausführen

---

**© 2026 Jimmy Julio. Alle Rechte vorbehalten.**
*Systemstatus: ONLINE // V3.0* 🚀
