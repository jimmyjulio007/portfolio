---
description: Run accessibility and visual design review
---

# 🎨 Workflow : Design Review & Visual Excellence

Ce workflow est conçu pour garantir que chaque composant ou page atteint un niveau de qualité "Premium" et une accessibilité impeccable, en s'appuyant sur les skills de design avancés.

## 🌈 Phase 1 : Alignement Esthétique (Skill `ui-ux-pro-max`)
L'agent doit analyser l'interface selon les standards de design modernes :
1. **Harmonie des Couleurs** : Vérifier que la palette (HSL/Grayscale) est cohérente et ne fatigue pas l'œil.
2. **Typographie** : Utilisation de polices modernes (Inter, Outfit, etc.) avec une hiérarchie claire (H1 vs H2 vs Body).
3. **Effets Premium** : Analyse de l'usage du glassmorphism, des dégradés subtils et des ombres douces.
4. **Espacement (Bento Grid / Layout)** : Vérifier que le rythme visuel et les marges sont constants et équilibrés.

## ✨ Phase 2 : Micro-interactions & Dynamisme (Skills `gsap-react` & `frontend-design`)
Le portfolio doit se sentir "vivant" :
1. **Hover States** : Chaque élément interactif doit avoir une transition fluide (GSAP ou CSS transition).
2. **Entrées Dynamiques** : Les éléments doivent apparaître avec des animations de "reveal" élégantes (pas d'apparition brusque).
3. **Feedback Sonore (UX)** : Si pertinent, vérifier l'intégration avec le `SoundManager` pour une immersion totale.
4. **Fluidité du Scroll** : S'assurer que les animations sont synchronisées avec le smooth scrolling de Lenis.

## ♿ Phase 3 : Accessibilité & Inclusion (Skill `solid` & `clean-code`)
Le design premium ne doit pas sacrifier l'accessibilité :
1. **Contraste** : Vérifier que le texte est lisible sur tous les fonds (WCAG 2.1).
2. **Sémantique HTML** : Utilisation correcte de `<nav>`, `<main>`, `<section>`, `<footer>`.
3. **Navigation au Clavier** : S'assurer que le `focus` est visible et que le `CustomCursor` ne cache pas les éléments interactifs.
4. **Aria Labels** : Vérifier que les icônes (Lucide) ont des descriptions pour les lecteurs d'écran.

## 📱 Phase 4 : Adaptabilité Multi-dispositifs
1. **Responsive Design** : Tester les transitions entre Desktop, Tablette et Mobile (Bento grids flexibles).
2. **Touch-Ready** : S'assurer que les zones de clic sont assez grandes sur mobile (44x44px minimum).
3. **Performance Perçue** : Utiliser des skeletons ou des loaders progressifs (`PageLoader`) pour les connexions lentes.

## 📝 Rapport de Design Review
L'agent doit retourner une analyse structurée :
1. **Note Esthétique** (Global /10).
2. **Points de Friction UX** (Ce qui pourrait gêner l'utilisateur).
3. **Améliorations Visuelles suggérées** (Ex: "Ajouter un flou gaussien sur le header").
4. **Checklist Accessibilité** (Vérifié / Non vérifié).

> [!IMPORTANT]
> Un design qui ne "WOW" pas l'utilisateur dès la première seconde est considéré comme incomplet.
