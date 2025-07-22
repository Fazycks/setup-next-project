# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/), et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-07-22

### 🚀 Version de publication

#### ✨ Prêt pour npm publish

-   **Version stable** : CLI optimisé et testé, prêt pour la publication sur npm
-   **Template personnalisé complet** : Template Next.js 15.4.2 avec TypeScript, Tailwind CSS, Radix UI, et next-themes
-   **Architecture nettoyée** : Suppression de tous les fichiers inutiles de développement
-   **Documentation finalisée** : README avec exemples multi-gestionnaires complets

#### 🔧 Corrections importantes

-   **Logique simplifiée** : Suppression de la fonction de secours, utilisation directe du package.json du template
-   **Fidélité totale** : Le projet créé contient exactement les mêmes dépendances que le template choisi
-   **Plus de duplication** : Fin des constantes codées en dur, utilisation à 100% du template sélectionné
-   **Architecture épurée** : Suppression de 200+ lignes de code inutile dans createProject.ts

#### 🎯 Fonctionnalités finales

-   Installation automatique obligatoire des dépendances
-   Support universel : pnpm, npm, yarn, bun
-   Copie intelligente avec exclusion automatique
-   Interface CLI simplifiée et efficace

## [1.3.0] - 2025-07-22

### ✨ Ajouté

-   **Support multi-gestionnaires** : Documentation complète pour pnpm, npm, yarn, bun
-   **Installation obligatoire** : Les dépendances sont maintenant toujours installées automatiquement

### 🔧 Modifié

-   **Suppression de `--no-install`** : L'installation des dépendances est désormais obligatoire
-   **README simplifié** : Exemples clairs pour tous les gestionnaires de paquets
-   **Workflow optimisé** : Projet immédiatement prêt après création

### 🎯 Améliorations UX

-   Interface plus simple sans option d'installation optionnelle
-   Documentation multi-gestionnaires (pnpm, npm, yarn, bun)
-   Exemples pratiques pour tous les cas d'usage

## [1.2.0] - 2025-07-22

### ✨ Ajouté

-   **Templates locaux** : Système simple avec templates dans `/templates/`
-   **Template fullstack** : Template avec Prisma, NextAuth et dépendances avancées
-   **Gestion intelligente des chemins** : Support ESM et déploiement global

### 🔧 Modifié

-   **Architecture simplifiée** : Retour à un système de templates locaux simple et rapide
-   **Suppression de la complexité v2.0.0** : Plus de commandes add-template ou configurations distantes
-   **Focus sur la performance** : Templates directement accessibles, pas de téléchargement

### 🎯 Fonctionnalités maintenues

-   Installation automatique des dépendances (pnpm/yarn/npm)
-   Détection automatique du gestionnaire de paquets
-   Interface interactive ou mode CLI
-   Validation des noms de projets
-   Option `--no-install` pour désactiver l'auto-installation

## [1.1.0] - 2025-07-22

### Ajouté

-   🚀 **Installation automatique des dépendances** après création du projet
-   🎯 **Détection automatique du gestionnaire de paquets** (pnpm, yarn, npm)
-   ⚡ Option `--no-install` pour désactiver l'installation automatique
-   📦 Gestion intelligente des commandes selon le gestionnaire détecté
-   🔧 Messages d'aide contextuels selon le gestionnaire utilisé

### Amélioré

-   Interface utilisateur plus fluide avec spinners pendant l'installation
-   Messages d'erreur plus informatifs en cas d'échec d'installation
-   Documentation mise à jour avec les nouvelles fonctionnalités

## [1.0.0] - 2025-07-22

### Ajouté

-   CLI interactif pour créer des projets Next.js
-   Système de templates extensible (basic, full-stack, ecommerce)
-   Validation des noms de projets
-   Support des arguments en ligne de commande
-   Mode non-interactif avec `--yes`
-   Templates pré-configurés avec TypeScript et Tailwind CSS
-   Documentation complète

### Fonctionnalités

-   Création de projets Next.js 15 avec TypeScript
-   Configuration automatique de Tailwind CSS
-   Templates prêts à l'emploi
-   Validation des noms selon les standards npm
-   Structure de projet optimisée
