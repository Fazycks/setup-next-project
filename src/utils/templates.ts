import fs from "fs-extra";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export interface Template {
    id: string;
    name: string;
    description: string;
    path: string;
}

export async function getAvailableTemplates(): Promise<Template[]> {
    // Use the CLI project's templates directory
    // We look for the templates folder from the CLI directory
    let templatesDir: string;

    if (process.cwd().includes("setup-next-project")) {
        // If we're executing from the CLI directory
        templatesDir = path.join(process.cwd(), "templates");
    } else {
        // If we're executing the globally installed CLI, use the module directory
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        templatesDir = path.join(__dirname, "../../templates");
    }

    const templates: Template[] = [
        {
            id: "basic",
            name: "Basic",
            description:
                "Next.js 15 with TypeScript, Tailwind CSS v4, Shadcn UI components and dark/light theme",
            path: path.join(templatesDir, "basic"),
        },
    ];

    // Filter templates that actually exist
    const existingTemplates = [];
    for (const template of templates) {
        if (await fs.pathExists(template.path)) {
            existingTemplates.push(template);
        }
    }

    return existingTemplates.length > 0 ? existingTemplates : templates;
}

export async function getTemplate(
    templateId: string,
): Promise<Template | null> {
    const templates = await getAvailableTemplates();
    return templates.find((t) => t.id === templateId) || null;
}
