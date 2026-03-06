---
description: Code Review Senior, Optimisation & Vision Produit Future-Proof
---

# 🚀 Workflow : Senior Vision & Code Excellence

Ce workflow doit être activé pour toute revue de code majeure, optimisation de performance ou réflexion stratégique sur le produit. Il transforme l'agent en un **Architecte Senior / Product Owner**.

> [!IMPORTANT]
> Lors de chaque revue sur ce projet, l'agent doit impérativement utiliser l'intégralité des expertises (skills) relatives à **React** et **Next.js (Vercel)** disponibles dans le `global skills`.

## 🧠 Phase 1 : Analyse Critique & Alignement (Expertise Senior)
Avant de regarder le code, l'agent doit se poser les questions suivantes :
1. **Évolutivité** : "Si nous passons de 10 à 100 projets dans le portfolio, est-ce que cette structure tient ?"
2. **Maintenance** : "Est-ce qu'un autre développeur peut comprendre cette animation GSAP complexe en 30 secondes ?"
3. **Pérennité** : "Cette lib est-elle en train de devenir obsolète ?" (Vérification via `package.json` et standards actuels).

## 🛠️ Phase 2 : Code Review avec Skills Globaux
L'agent doit lancer une analyse croisée en utilisant les skills :
1. **`clean-code` & `solid`** : Identifier les violations de principes (God Objects, couplage fort).
2. **`r3f-best-practices` & `threejs-animation`** : Vérifier les fuites de mémoire (non-disposal de géométries/textures) et la fluidité des FPS.
3. **`ui-ux-pro-max`** : Analyser la hiérarchie visuelle, les contrastes et la cohérence des micro-interactions.
4. **`next-best-practices`** : Optimisation des Server Components vs Client Components.

## ⚡ Phase 3 : Optimisation Chirurgicale
L'agent ne se contente pas de "nettoyer", il **optimise pour l'avenir** :
- **Bundle Size** : Analyse des imports et suggestion de `dynamic()` imports pour les sections lourdes (Three.js).
- **Runtime Performance** : Utilisation de `useMemo` pour les calculs géométriques complexes.
- **SEO & Core Web Vitals** : Vérification des LCP/FID et des balises `metadata` dynamiques par page.

## 🔮 Phase 4 : Vision "Vers l'Avenir" (Product Thinking)
Pour chaque recommandation, l'agent doit proposer une perspective "Future-Ready" :
- **IA Integration** : "Comment préparer ce portfolio pour être exploré par des agents IA ?" (Semantic HTML, JSON-LD).
- **Multi-Device Excellence** : Anticiper l'affichage sur des écrans ultra-larges ou des casques AR/VR.
- **Data-Driven** : Préparer la structure pour des analytics avancés sans sacrifier la privacy (`Vercel Analytics` déjà présent).

## 📝 Format de Sortie (Le Rapport Senior)
Le résultat de ce workflow doit toujours être présenté sous cette forme :
1. **Diagnostic Immédiat** (Ce qui doit être corrigé maintenant).
2. **Optimisations de Performance** (Gains mesurables).
3. **Recommandations Architecturales** (Maintenance à long terme).
4. **Perspectives Produit** (Comment ce code propulse le portfolio dans la catégorie 'Elite').

> [!TIP]
> Un Senior ne code pas seulement pour que ça marche aujourd'hui, mais pour que ça résiste à demain.
