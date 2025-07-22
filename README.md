# Setup Next Project

CLI pour créer rapidement un projet Next.js pré-configuré avec les meilleures pratiques et vos outils préférés.

## Installation et utilisation

Vous pouvez utiliser ce CLI directement avec votre gestionnaire de paquets préféré :

### 📦 Avec pnpm (recommandé)

```bash
# Utilisation directe (recommandée)
pnpm dlx setup-next-project@latest mon-projet

# Ou installation globale
pnpm install -g setup-next-project
setup-next-project mon-projet
```

### 📦 Avec npm

```bash
# Utilisation directe
npx setup-next-project@latest mon-projet

# Ou installation globale
npm install -g setup-next-project
setup-next-project mon-projet
```

### 📦 Avec yarn

```bash
# Utilisation directe
yarn dlx setup-next-project@latest mon-projet

# Ou installation globale
yarn global add setup-next-project
setup-next-project mon-projet
```

### 📦 Avec bun

```bash
# Utilisation directe
bunx setup-next-project@latest mon-projet

# Ou installation globale
bun add -g setup-next-project
setup-next-project mon-projet
```

## Usage

### Mode interactif

```bash
pnpm dlx setup-next-project@latest
# ou
npx setup-next-project@latest
# ou
yarn dlx setup-next-project@latest
```

Le CLI vous demandera :

-   Le nom du projet
-   Le template à utiliser (si plusieurs disponibles)
-   Confirmation si un dossier existe déjà

**🚀 Installation automatique** : Le CLI détecte automatiquement votre gestionnaire de paquets (pnpm, yarn, npm, bun) et installe les dépendances après la création du projet !

### Utilisation avec arguments

```bash
# Créer un projet avec un nom spécifique
pnpm dlx setup-next-project@latest mon-projet

# Créer un projet avec un template spécifique
pnpm dlx setup-next-project@latest mon-projet --template basic

# Utiliser les valeurs par défaut (mode non-interactif)
pnpm dlx setup-next-project@latest mon-projet --yes

# Créer sans ouvrir VS Code automatiquement
pnpm dlx setup-next-project@latest mon-projet --no-code
```

## Templates disponibles

### 🎨 Basic Template

-   **Next.js 15.4.2** (latest) avec **Turbopack** pour le développement ultra-rapide
-   **TypeScript** pour un code type-safe
-   **Tailwind CSS v4** (dernière version) avec PostCSS
-   **Shadcn UI** - composants React modernes et accessibles
-   **next-themes** - système de thèmes dark/light
-   **Lucide React** - icônes modernes
-   **ESLint** configuré pour Next.js
-   **React 19.1.0** et **React DOM 19.1.0**

## Options

-   `-t, --template <template>` - Spécifier le template à utiliser
-   `-y, --yes` - Utiliser les valeurs par défaut sans interaction
-   `--no-code` - Ne pas ouvrir VS Code après la création du projet
-   `-h, --help` - Afficher l'aide
-   `-V, --version` - Afficher la version

## ✨ Fonctionnalités avancées

### 🎯 Détection automatique du gestionnaire de paquets

Le CLI détecte automatiquement quel gestionnaire de paquets vous utilisez dans cet ordre de priorité :

1.  **pnpm** (priorité la plus haute)
2.  **yarn**
3.  **bun** (si détecté)
4.  **npm** (fallback)

### 📦 Installation automatique des dépendances

Après la création du projet, le CLI installe **automatiquement** les dépendances avec le gestionnaire détecté. Cette étape garantit que votre projet soit immédiatement prêt à l'emploi.

### 🎨 Personnalisation automatique

Le CLI personnalise automatiquement votre projet avec le nom choisi :

-   **Header** - Le titre de l'application dans `src/components/layout/header.tsx`
-   **Metadata** - Les métadonnées SEO dans `app/layout.tsx`
-   **Page d'accueil** - Le titre de bienvenue dans `app/page.tsx`
-   **package.json** - Le nom du package

### 🗂️ Initialisation Git

-   Initialise automatiquement un dépôt Git
-   Crée le commit initial avec un message descriptif
-   Configure le `.gitignore` approprié
-   Prêt pour GitHub Desktop ou push manuel

### 🔧 Ouverture automatique de VS Code

-   Ouvre automatiquement VS Code dans le nouveau projet
-   Peut être désactivé avec l'option `--no-code`
-   Ferme proprement le terminal après ouverture

## Exemples d'utilisation

### Projet rapide avec nom personnalisé

```bash
# Avec pnpm
pnpm dlx setup-next-project@latest mon-blog --yes

# Avec npm
npx setup-next-project@latest mon-portfolio --yes

# Avec yarn
yarn dlx setup-next-project@latest ma-startup --yes
```

### Mode interactif complet

```bash
# Le CLI vous guidera à travers toutes les options
pnpm dlx setup-next-project@latest
```

### Création sans VS Code

```bash
# Pour les environnements serveur ou CI/CD
pnpm dlx setup-next-project@latest mon-projet --no-code --yes
```

### Après création

```bash
cd mon-projet
pnpm dev          # Démarre le serveur de développement avec Turbopack
# ou npm run dev
# ou yarn dev
```

Votre projet sera accessible sur `http://localhost:3000` avec :

-   Hot reload ultra-rapide grâce à Turbopack
-   Thème dark/light fonctionnel
-   Composants Shadcn UI prêts à utiliser
-   TypeScript configuré
-   Tailwind CSS v4 opérationnel

## Structure du projet généré

```
mon-projet/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Styles Tailwind + variables CSS
│   ├── layout.tsx           # Layout principal avec metadata personnalisées
│   └── page.tsx             # Page d'accueil personnalisée
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   └── providers.tsx    # Providers (theme, etc.)
│   │   ├── layout/
│   │   │   └── header.tsx       # Header avec nom du projet
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx
│   │   │   └── theme-mode-toggle.tsx
│   │   └── ui/                  # Composants Shadcn UI
│   │       ├── button.tsx
│   │       └── dropdown-menu.tsx
│   └── lib/
│       └── utils.ts         # Utilitaires (cn, etc.)
├── .gitignore               # Gitignore configuré
├── components.json          # Configuration Shadcn UI
├── eslint.config.mjs        # Configuration ESLint
├── next.config.ts           # Configuration Next.js
├── package.json             # Dependencies avec nom personnalisé
├── postcss.config.mjs       # Configuration PostCSS pour Tailwind
├── README.md                # Documentation du projet
└── tsconfig.json            # Configuration TypeScript
```

## License

MIT
