#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { createProject } from "./utils/createProject.js";
import { getAvailableTemplates } from "./utils/templates.js";
import { validateProjectName } from "./utils/validation.js";

const program = new Command();

program
    .name("setup-next-project")
    .description("CLI pour créer rapidement un projet Next.js pré-configuré")
    .version("1.5.0");

program
    .argument("[project-name]", "Nom du projet")
    .option("-t, --template <template>", "Template à utiliser")
    .option("-y, --yes", "Utiliser les valeurs par défaut")
    .action(async (projectName, options) => {
        try {
            console.log(chalk.cyan.bold("\n🚀 Setup Next Project\n"));

            let finalProjectName = projectName;
            let selectedTemplate = options.template;

            // Si pas de nom de projet fourni, demander
            if (!finalProjectName) {
                const { name } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Quel est le nom de votre projet ?",
                        default: "mon-projet-next",
                        validate: validateProjectName,
                    },
                ]);
                finalProjectName = name;
            }

            // Valider le nom du projet
            const validationResult = validateProjectName(finalProjectName);
            if (validationResult !== true) {
                console.error(chalk.red(`❌ ${validationResult}`));
                process.exit(1);
            }

            // Vérifier si le dossier existe déjà
            const projectPath = path.resolve(process.cwd(), finalProjectName);
            if (fs.existsSync(projectPath)) {
                const { overwrite } = await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "overwrite",
                        message: `Le dossier "${finalProjectName}" existe déjà. Voulez-vous le remplacer ?`,
                        default: false,
                    },
                ]);

                if (!overwrite) {
                    console.log(chalk.yellow("❌ Opération annulée."));
                    process.exit(0);
                }

                await fs.remove(projectPath);
            }

            // Obtenir les templates disponibles
            const templates = await getAvailableTemplates();

            // Si pas de template spécifié et pas de mode --yes, demander
            if (!selectedTemplate && !options.yes) {
                const { template } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "template",
                        message: "Quel template voulez-vous utiliser ?",
                        choices: templates.map((t) => ({
                            name: `${t.name} - ${t.description}`,
                            value: t.id,
                        })),
                    },
                ]);
                selectedTemplate = template;
            }

            // Template par défaut si pas spécifié
            if (!selectedTemplate) {
                selectedTemplate = templates[0]?.id || "basic";
            }

            // Créer le projet
            await createProject({
                projectName: finalProjectName,
                template: selectedTemplate,
                projectPath,
                autoInstall: true, // Installation toujours activée
            });

            // Le projet est créé et les dépendances sont installées automatiquement
        } catch (error) {
            console.error(
                chalk.red("\n❌ Erreur lors de la création du projet :"),
            );
            console.error(
                chalk.red(
                    error instanceof Error ? error.message : String(error),
                ),
            );
            process.exit(1);
        }
    });

program.parse();
