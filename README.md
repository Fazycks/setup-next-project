# Setup Next Project

CLI pour créer rapidement un projet Next.js pré-configuré av## Templates disponibles

-   **basic** - Next.js 15.4.2 avec TypeScript, Tailwind CSS, Radix UI et next-themes
-   **fullstack** - Next.js avec Prisma, NextAuth et dépendances avancéesos templates préférés.

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
-   Le template à utiliser

**🚀 Installation automatique** : Le CLI détecte automatiquement votre gestionnaire de paquets (pnpm, yarn, npm, bun) et installe les dépendances après la création du projet !

### Utilisation avec arguments

```bash
# Créer un projet avec un nom spécifique
pnpm dlx setup-next-project@latest mon-projet

# Créer un projet avec un template spécifique
pnpm dlx setup-next-project@latest mon-projet --template fullstack

# Utiliser les valeurs par défaut (mode non-interactif)
pnpm dlx setup-next-project@latest mon-projet --yes
```

## Templates disponibles

-   **basic** - Next.js avec TypeScript et Tailwind CSS
-   **fullstack** - Next.js avec Prisma, NextAuth et dépendances avancées

## Options

-   `-t, --template <template>` - Spécifier le template à utiliser
-   `-y, --yes` - Utiliser les valeurs par défaut sans interaction
-   `-h, --help` - Afficher l'aide
-   `-V, --version` - Afficher la version

## Fonctionnalités

### 🎯 Détection automatique du gestionnaire de paquets

Le CLI détecte automatiquement quel gestionnaire de paquets vous utilisez :

-   **pnpm** (priorité la plus haute)
-   **yarn**
-   **npm** (fallback)
-   **bun** (si détecté)

### 📦 Installation automatique obligatoire

Après la création du projet, le CLI installe **automatiquement** les dépendances avec le gestionnaire détecté. Cette étape est obligatoire pour garantir que votre projet soit immédiatement prêt à l'emploi.

## Exemples d'utilisation

### Projet basic rapide

```bash
# Avec pnpm
pnpm dlx setup-next-project@latest mon-blog --template basic --yes

# Avec npm
npx setup-next-project@latest mon-blog --template basic --yes

# Avec yarn
yarn dlx setup-next-project@latest mon-blog --template basic --yes
```

### Projet fullstack avec interaction

```bash
# Le CLI vous guidera à travers les options
pnpm dlx setup-next-project@latest
```

### Après création

```bash
cd mon-projet
pnpm dev    # ou npm run dev, ou yarn dev
```

## License

MIT
