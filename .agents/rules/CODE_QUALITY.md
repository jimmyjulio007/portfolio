# 📜 Project Development Rules & Standards

Ce document définit les règles de qualité de code et le processus systématique que l'agent AI doit suivre pour toute intervention sur ce projet.

## 🏗️ 1. Architecture: Feature-Sliced Design (FSD)
Toute modification doit respecter strictement la hiérarchie des couches FSD définie dans `ARCHITECTURE.md`.

- **Interdiction Formelle de Dépendances Circulaires** : Une couche ne peut importer que des couches "plus basses" dans la hiérarchie.
  - ✅ `widgets` -> `features` -> `entities` -> `shared`
  - ❌ `shared` -> `entities` (Interdit)
  - ❌ `features` -> `widgets` (Interdit)
- **Isolation des Widgets** : Un widget ne doit jamais importer un autre widget. S'il y a duplication, extraire la logique commune dans `features` ou `shared`.
- **Public API** : Chaque module/tranche doit avoir un fichier `index.ts` (ou équivalent) qui expose uniquement ce qui est nécessaire. Évitez les "Deep Imports".

## 🛠️ 2. Qualité de Code & Standards (SOLID)
Le code doit être "Senior Level", propre et auto-documenté.

- **Clean Code & Propreté** : 
  - **Auto-documenté** : Écrire du code si clair que les commentaires deviennent inutiles. Nommer les variables et fonctions de manière explicite.
  - **Zéro Commentaire Superflu** : Supprimer les commentaires qui expliquent "ce que fait le code" (le code doit le dire lui-même). Ne laisser que les commentaires expliquant le "pourquoi" de décisions complexes ou non-évidentes.
  - **Zéro console.log en Production** : Interdiction de laisser des `console.log` dans le code final. Ils sont réservés uniquement au débogage temporaire et doivent être supprimés avant toute validation.
- **Utilisation des Skills Globaux** : L'agent doit activer et consulter les instructions des `skills` installés dans `C:\Users\JULIO\.agents\skills` dès qu'une tâche correspond à leur domaine d'expertise :
  - **Animations** : Utiliser `gsap-react` et `threejs-animation`.
  - **Core 3D** : Utiliser `threejs-fundamentals` et `r3f-best-practices`.
  - **Architecture & Design** : Utiliser `solid`, `clean-code`, `frontend-design` et `ui-ux-pro-max`.
  - **Next.js & React** : Utiliser `next-best-practices` et `vercel-react-best-practices`.
  - **Internationalisation** : Respecter les patterns définis pour `next-intl`.
- **S (Single Responsibility)** : Un fichier = Un composant ou une fonction logique. Si un composant dépasse 200 lignes, envisagez une décomposition.
- **Typage Strict** : Pas de `any`. Utilisez des interfaces explicites. Préférez les types `Zod` pour la validation des données externes.
- **Animations (GSAP/Framer)** : 
  - Centralisez les configurations d'animation.
  - Utilisez toujours le hook `useGSAP` pour un nettoyage (cleanup) automatique des timelines.
- **Internationalisation (i18n)** : 
  - Ne jamais coder de texte en dur (Hardcoded text).
  - Toute chaîne de caractères doit passer par `next-intl` (`t('key')`).
  - Mettre à jour les fichiers dans `/messages` pour chaque nouvelle langue supportée.
- **Performance** : 
  - Utilisez `useMemo` et `useCallback` judicieusement pour éviter les re-renders inutiles dans les scènes 3D (R3F).
  - Optimisez le chargement des assets 3D (GLTF/Textures) via `useGLTF.preload`.

## 🔄 3. Processus Systématique d'Intervention
L'agent doit suivre ces étapes pour chaque tâche :

1. **Analyse d'Impact** : Avant de coder, identifier les couches FSD impactées.
2. **Consultation de la Documentation** : Vérifier `ARCHITECTURE.md` et les fichiers `.md` de correctifs (ex: `BUILD_FIXES.md`) pour ne pas reproduire d'anciennes erreurs.
3. **Implémentation Chirurgicale** : Faire des modifications précises. Ne pas reformater tout un fichier si ce n'est pas demandé.
4. **Vérification i18n** : Si du texte est ajouté, créer les clés de traduction correspondantes.
5. **Validation Biome** : Toujours lancer `npm run lint` ou `npx biome check --write` après modification pour garantir la conformité du style.
6. **Rapport de Modification** : Terminer par un résumé clair des changements et de leur position dans l'architecture FSD.

## 🎨 4. Design & UI
Le portfolio est une vitrine "Premium". 

- **Token de Design** : Utilisez les variables CSS de `globals.css` et les utilitaires Tailwind configurés.
- **Accessibilité** : Maintenir un score Lighthouse élevé. Utilisez des labels ARIA et respectez le contraste des couleurs.
- **Micro-interactions** : Chaque action utilisateur (hover, click) doit avoir un feedback visuel ou sonore (via `SoundManager`).

---
> [!IMPORTANT]
> Le non-respect de l'architecture FSD ou l'introduction de "Spaghetti Code" est considéré comme un échec de la mission.
