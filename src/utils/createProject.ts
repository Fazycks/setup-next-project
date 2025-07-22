import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import * as path from "path";
import { detectPackageManager, runCommand } from "./packageManager.js";
import { getTemplate } from "./templates.js";

export interface CreateProjectOptions {
    projectName: string;
    template: string;
    projectPath: string;
    autoInstall?: boolean;
}

// Dossiers et fichiers à exclure lors de la copie de templates
const EXCLUDED_ITEMS = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    ".turbo",
    "pnpm-lock.yaml",
    "yarn.lock",
    "package-lock.json",
    ".DS_Store",
    "Thumbs.db",
];

async function copyTemplateFiles(
    sourcePath: string,
    targetPath: string,
): Promise<void> {
    const items = await fs.readdir(sourcePath);

    for (const item of items) {
        if (EXCLUDED_ITEMS.includes(item)) {
            continue; // Ignorer les éléments exclus
        }

        const sourceItemPath = path.join(sourcePath, item);
        const targetItemPath = path.join(targetPath, item);

        const stat = await fs.stat(sourceItemPath);

        if (stat.isDirectory()) {
            await fs.ensureDir(targetItemPath);
            await copyTemplateFiles(sourceItemPath, targetItemPath);
        } else {
            await fs.copy(sourceItemPath, targetItemPath);
        }
    }
}

export async function createProject(
    options: CreateProjectOptions,
): Promise<void> {
    const { projectName, template, projectPath } = options;

    const spinner = ora("Création du projet...").start();

    try {
        // Obtenir le template
        const templateData = await getTemplate(template);
        if (!templateData) {
            throw new Error(`Template "${template}" introuvable.`);
        }

        spinner.text = "Copie des fichiers du template...";

        // Créer le dossier du projet
        await fs.ensureDir(projectPath);

        // Vérifier si le template existe physiquement
        if (await fs.pathExists(templateData.path)) {
            // Copier les fichiers du template en excluant certains dossiers
            await copyTemplateFiles(templateData.path, projectPath);
        } else {
            throw new Error(
                `Le dossier template "${templateData.path}" n'existe pas.`,
            );
        }

        spinner.text = "Mise à jour du package.json...";

        // Mettre à jour le package.json avec le nom du projet
        const packageJsonPath = path.join(projectPath, "package.json");
        if (await fs.pathExists(packageJsonPath)) {
            const packageJson = await fs.readJson(packageJsonPath);
            packageJson.name = projectName;
            await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        }

        spinner.succeed(chalk.green("Projet créé avec succès !"));

        // Initialisation Git
        await initializeGitRepository(projectPath);

        // Installation automatique des dépendances si demandée
        if (options.autoInstall !== false) {
            await installDependencies(projectPath, projectName);
        }
    } catch (error) {
        spinner.fail(chalk.red("Erreur lors de la création du projet"));
        throw error;
    }
}

async function initializeGitRepository(projectPath: string): Promise<void> {
    const spinner = ora("Initialisation du repository Git...").start();

    try {
        // Initialiser le repo Git
        await runCommand("git init", projectPath);

        // Ajouter tous les fichiers
        await runCommand("git add .", projectPath);

        // Faire le premier commit
        await runCommand(
            'git commit -m "Initial commit from setup-next-project"',
            projectPath,
        );

        spinner.succeed(chalk.green("✅ Repository Git initialisé !"));

        console.log(chalk.cyan("🔗 Prêt pour GitHub Desktop ou push manuel"));
    } catch (error) {
        spinner.warn(chalk.yellow("⚠️  Initialisation Git échouée"));
        console.log(
            chalk.gray(
                "Vous pouvez initialiser Git manuellement si nécessaire",
            ),
        );

        // Ne pas faire échouer le processus pour une erreur Git
        console.log(
            chalk.gray(
                `Erreur: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            ),
        );
    }
}

async function installDependencies(
    projectPath: string,
    projectName: string,
): Promise<void> {
    const spinner = ora("Détection du gestionnaire de paquets...").start();

    try {
        // Détecter le gestionnaire de paquets disponible
        const packageManager = await detectPackageManager();

        spinner.text = `Installation des dépendances avec ${packageManager.name}...`;
        spinner.color = "blue";

        // Installer les dépendances
        await runCommand(packageManager.installCommand, projectPath);

        spinner.succeed(
            chalk.green(
                `✅ Dépendances installées avec ${packageManager.name} !`,
            ),
        );

        console.log(chalk.cyan("\n🎉 Projet prêt ! Commandes disponibles :"));
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white(`  ${packageManager.runCommand} dev`));
    } catch (error) {
        spinner.warn(chalk.yellow("⚠️  Installation automatique échouée"));
        console.log(
            chalk.yellow(
                "Vous pouvez installer manuellement les dépendances avec :",
            ),
        );
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white("  pnpm install # ou npm install"));

        // Ne pas faire échouer tout le processus pour une erreur d'installation
        console.log(
            chalk.gray(
                `Erreur: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            ),
        );
    }
}
