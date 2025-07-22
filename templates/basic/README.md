# 🚀 Projet Next.js Moderne

Un template Next.js 15 moderne avec TypeScript, Tailwind CSS, et shadcn/ui pré-configuré pour un développement rapide et efficace.

## ✨ Fonctionnalités

-   ⚡ **Next.js 15** avec App Router
-   🎨 **Tailwind CSS** pour le styling
-   🔧 **TypeScript** pour la sécurité des types
-   🎭 **shadcn/ui** composants UI modernes
-   🌙 **Mode sombre/clair** intégré
-   📱 **Design responsive** par défaut
-   🎯 **ESLint** configuration optimisée
-   🚀 **Optimisations de performance** intégrées

## 🛠️ Technologies utilisées

-   [Next.js](https://nextjs.org/) - Framework React
-   [TypeScript](https://www.typescriptlang.org/) - Typage statique
-   [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
-   [shadcn/ui](https://ui.shadcn.com/) - Composants UI
-   [Lucide React](https://lucide.dev/) - Icônes modernes

## 🚀 Installation et démarrage rapide

1. **Clonez le projet** (ou utilisez ce template)
2. **Installez les dépendances**:

    ```bash
    pnpm install
    # ou
    npm install
    # ou
    yarn install
    ```

3. **Lancez le serveur de développement**:

    ```bash
    pnpm dev
    # ou
    npm run dev
    # ou
    yarn dev
    ```

4. **Ouvrez votre navigateur** sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
├── app/                    # App Router de Next.js
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── src/
│   ├── components/        # Composants React
│   │   ├── features/      # Composants métier
│   │   ├── layout/        # Composants de mise en page
│   │   ├── theme/         # Composants de thème
│   │   └── ui/            # Composants UI (shadcn/ui)
│   └── lib/               # Utilitaires et helpers
├── public/                # Assets statiques
└── ...                   # Fichiers de configuration
```

## 🎨 Personnalisation

### Thème

Le projet inclut un système de thème sombre/clair configurable. Modifiez les couleurs dans:

-   `app/globals.css` - Variables CSS personnalisées
-   `tailwind.config.js` - Configuration Tailwind

### Composants

Ajoutez facilement de nouveaux composants shadcn/ui:

```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

## 📝 Scripts disponibles

-   `pnpm dev` - Démarre le serveur de développement
-   `pnpm build` - Construit l'application pour la production
-   `pnpm start` - Démarre le serveur de production
-   `pnpm lint` - Exécute ESLint
-   `pnpm lint:fix` - Corrige automatiquement les erreurs ESLint

## 🚢 Déploiement

### Vercel (recommandé)

Le moyen le plus simple de déployer votre application Next.js est d'utiliser [Vercel](https://vercel.com/new):

1. Connectez votre repository GitHub
2. Vercel détectera automatiquement Next.js
3. Votre app sera déployée en quelques secondes

### Autres plateformes

-   **Netlify**: Compatible avec Next.js
-   **Railway**: Déploiement simple avec Git
-   **Docker**: Dockerfile inclus pour la conteneurisation

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Pushlez sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

-   📖 [Documentation Next.js](https://nextjs.org/docs)
-   🎨 [Documentation Tailwind CSS](https://tailwindcss.com/docs)
-   🔧 [Documentation shadcn/ui](https://ui.shadcn.com/)
-   💬 [Discussions GitHub](https://github.com/vercel/next.js/discussions)

---

**Fait avec ❤️ et Next.js**
