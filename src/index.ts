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
    .description("CLI to quickly create a pre-configured Next.js project")
    .version("1.8.8");

program
    .argument("[project-name]", "Project name")
    .option("-t, --template <template>", "Template to use")
    .option("-y, --yes", "Use default values")
    .option("--no-code", "Don't open VS Code after installation")
    .action(async (projectName, options) => {
        try {
            console.log(chalk.cyan.bold("\n🚀 Setup Next Project\n"));

            let finalProjectName = projectName;
            let selectedTemplate = options.template;

            // If no project name provided, ask for it
            if (!finalProjectName) {
                const { name } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is your project name?",
                        default: "my-next-project",
                        validate: validateProjectName,
                    },
                ]);
                finalProjectName = name;
            }

            // Validate project name
            const validationResult = validateProjectName(finalProjectName);
            if (validationResult !== true) {
                console.error(chalk.red(`❌ ${validationResult}`));
                process.exit(1);
            }

            // Check if folder already exists
            const projectPath = path.resolve(process.cwd(), finalProjectName);
            if (fs.existsSync(projectPath)) {
                const { overwrite } = await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "overwrite",
                        message: `The folder "${finalProjectName}" already exists. Do you want to replace it?`,
                        default: false,
                    },
                ]);

                if (!overwrite) {
                    console.log(chalk.yellow("❌ Operation cancelled."));
                    process.exit(0);
                }

                await fs.remove(projectPath);
            }

            // Get available templates
            const templates = await getAvailableTemplates();

            // If no template specified and not --yes mode, ask for it
            if (!selectedTemplate && !options.yes) {
                const { template } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "template",
                        message: "Which template would you like to use?",
                        choices: templates.map((t) => ({
                            name: `${t.name} - ${t.description}`,
                            value: t.id,
                        })),
                    },
                ]);
                selectedTemplate = template;
            }

            // Default template if not specified
            if (!selectedTemplate) {
                selectedTemplate = templates[0]?.id || "basic";
            }

            // Create project
            await createProject({
                projectName: finalProjectName,
                template: selectedTemplate,
                projectPath,
                autoInstall: true, // Installation always enabled
                openVSCode: options.code !== false, // Open VS Code by default, unless --no-code is specified
            });

            // The project is created and dependencies are installed automatically
        } catch (error) {
            console.error(chalk.red("\n❌ Error creating project:"));
            console.error(
                chalk.red(
                    error instanceof Error ? error.message : String(error),
                ),
            );
            process.exit(1);
        }
    });

program.parse();
