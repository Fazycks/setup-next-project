import { exec } from "child_process";
import fs from "fs-extra";
import * as path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export type PackageManager = "pnpm" | "yarn" | "npm";

export interface PackageManagerInfo {
    name: PackageManager;
    version?: string;
    installCommand: string;
    runCommand: string;
}

/**
 * Détecte le gestionnaire de paquets disponible sur le système
 */
export async function detectPackageManager(): Promise<PackageManagerInfo> {
    // Vérifier pnpm en premier
    try {
        const { stdout } = await execAsync("pnpm --version");
        return {
            name: "pnpm",
            version: stdout.trim(),
            installCommand: "pnpm install",
            runCommand: "pnpm",
        };
    } catch {
        // pnpm n'est pas disponible
    }

    // Vérifier yarn
    try {
        const { stdout } = await execAsync("yarn --version");
        return {
            name: "yarn",
            version: stdout.trim(),
            installCommand: "yarn install",
            runCommand: "yarn",
        };
    } catch {
        // yarn n'est pas disponible
    }

    // Fallback vers npm (toujours disponible avec Node.js)
    try {
        const { stdout } = await execAsync("npm --version");
        return {
            name: "npm",
            version: stdout.trim(),
            installCommand: "npm install",
            runCommand: "npm run",
        };
    } catch {
        // Si même npm n'est pas disponible, quelque chose ne va pas
        throw new Error(
            "Aucun gestionnaire de paquets détecté (npm, yarn, pnpm)",
        );
    }
}

/**
 * Détecte le gestionnaire de paquets utilisé dans le projet courant
 * basé sur les fichiers de lock présents
 */
export function detectProjectPackageManager(
    projectPath: string,
): PackageManager {
    if (fs.existsSync(path.join(projectPath, "pnpm-lock.yaml"))) {
        return "pnpm";
    }

    if (fs.existsSync(path.join(projectPath, "yarn.lock"))) {
        return "yarn";
    }

    if (fs.existsSync(path.join(projectPath, "package-lock.json"))) {
        return "npm";
    }

    // Par défaut, utiliser le gestionnaire détecté sur le système
    return "npm";
}

/**
 * Execute une commande dans un répertoire spécifique
 */
export async function runCommand(
    command: string,
    cwd: string,
): Promise<string> {
    try {
        const { stdout } = await execAsync(command, { cwd });
        return stdout;
    } catch (error: any) {
        throw new Error(
            `Erreur lors de l'exécution de "${command}": ${error.message}`,
        );
    }
}
