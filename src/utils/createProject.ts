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

// Folders and files to exclude when copying templates
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
            continue; // Ignore excluded items
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

    const spinner = ora("Creating project...").start();

    try {
        // Get template
        const templateData = await getTemplate(template);
        if (!templateData) {
            throw new Error(`Template "${template}" not found.`);
        }

        spinner.text = "Copying template files...";

        // Create project folder
        await fs.ensureDir(projectPath);

        // Check if template physically exists
        if (await fs.pathExists(templateData.path)) {
            // Copy template files excluding certain folders
            await copyTemplateFiles(templateData.path, projectPath);
        } else {
            throw new Error(
                `Template folder "${templateData.path}" does not exist.`,
            );
        }

        spinner.text = "Updating package.json...";

        // Update package.json with project name
        const packageJsonPath = path.join(projectPath, "package.json");
        if (await fs.pathExists(packageJsonPath)) {
            const packageJson = await fs.readJson(packageJsonPath);
            packageJson.name = projectName;
            await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        }

        spinner.succeed(chalk.green("Project created successfully!"));

        // Git initialization
        await initializeGitRepository(projectPath);

        // Automatic dependency installation if requested
        if (options.autoInstall !== false) {
            await installDependencies(projectPath, projectName);
        }
    } catch (error) {
        spinner.fail(chalk.red("Error creating project"));
        throw error;
    }
}

async function initializeGitRepository(projectPath: string): Promise<void> {
    const spinner = ora("Initializing Git repository...").start();

    try {
        // Initialize Git repo
        await runCommand("git init", projectPath);

        // Add all files
        await runCommand("git add .", projectPath);

        // Make first commit
        await runCommand(
            'git commit -m "Initial commit from setup-next-project"',
            projectPath,
        );

        spinner.succeed(chalk.green("✅ Git repository initialized!"));

        console.log(chalk.cyan("🔗 Ready for GitHub Desktop or manual push"));
    } catch (error) {
        spinner.warn(chalk.yellow("⚠️  Git initialization failed"));
        console.log(chalk.gray("You can initialize Git manually if needed"));

        // Don't fail the process for a Git error
        console.log(
            chalk.gray(
                `Error: ${
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
    const spinner = ora("Detecting package manager...").start();

    try {
        // Detect available package manager
        const packageManager = await detectPackageManager();

        spinner.text = `Installing dependencies with ${packageManager.name}...`;
        spinner.color = "blue";

        // Install dependencies
        await runCommand(packageManager.installCommand, projectPath);

        spinner.succeed(
            chalk.green(
                `✅ Dependencies installed with ${packageManager.name}!`,
            ),
        );

        console.log(chalk.cyan("\n🎉 Project ready! Available commands:"));
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white(`  ${packageManager.runCommand} dev`));
    } catch (error) {
        spinner.warn(chalk.yellow("⚠️  Automatic installation failed"));
        console.log(
            chalk.yellow("You can install dependencies manually with:"),
        );
        console.log(chalk.white(`  cd ${projectName}`));
        console.log(chalk.white("  pnpm install # or npm install"));

        // Don't fail the entire process for an installation error
        console.log(
            chalk.gray(
                `Error: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            ),
        );
    }
}
