# Guide de Publication

## Pré-requis

1. Avoir un compte npm : https://www.npmjs.com/signup
2. Être connecté via `npm login`
3. Le nom `setup-next-project` doit être disponible sur npm

## Vérifications avant publication

1. Tester le CLI localement :

```bash
pnpm run test:cli
```

2. Créer un projet de test :

```bash
node dist/index.js mon-test --yes
cd mon-test
# Les dépendances devraient être automatiquement installées
pnpm dev # ou npm run dev
```

3. Tester sans installation automatique :

```bash
node dist/index.js test-no-install --yes --no-install
cd test-no-install
pnpm install
pnpm dev
```

4. Vérifier que tout fonctionne correctement

## Publication

### Première publication

```bash
# S'assurer d'être connecté
npm whoami

# Build et publier
pnpm build
npm publish
```

### Mises à jour

```bash
# Pour une correction de bug (1.0.0 -> 1.0.1)
pnpm run release:patch

# Pour une nouvelle fonctionnalité (1.0.0 -> 1.1.0)
pnpm run release:minor

# Pour un changement majeur (1.0.0 -> 2.0.0)
pnpm run release:major
```

## Après publication

Les utilisateurs pourront utiliser votre CLI avec :

```bash
# Utilisation directe
pnpm dlx setup-next-project@latest mon-projet

# Installation globale
npm install -g setup-next-project
setup-next-project mon-projet
```

## Conseils

1. Testez toujours avant de publier
2. Utilisez des versions sémantiques (semver)
3. Mettez à jour le README avec les nouvelles fonctionnalités
4. Gardez une trace des changements (CHANGELOG.md)

## Problèmes courants

-   **Erreur de nom déjà pris** : Changez le nom dans package.json
-   **Erreur de permissions** : Vérifiez que vous êtes connecté avec `npm whoami`
-   **Erreur de build** : Vérifiez que `pnpm build` fonctionne sans erreurs
