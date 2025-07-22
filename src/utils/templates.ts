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
    // Utiliser le répertoire templates du projet CLI
    // On cherche le dossier templates à partir du répertoire du CLI
    let templatesDir: string;

    if (process.cwd().includes("setup-next-project")) {
        // Si on exécute depuis le répertoire du CLI
        templatesDir = path.join(process.cwd(), "templates");
    } else {
        // Si on exécute le CLI installé globalement, on utilise le répertoire du module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        templatesDir = path.join(__dirname, "../../templates");
    }

    const templates: Template[] = [
        {
            id: "basic",
            name: "Basic",
            description: "Next.js avec TypeScript et Tailwind CSS",
            path: path.join(templatesDir, "basic"),
        },
        {
            id: "fullstack",
            name: "Full Stack",
            description: "Next.js avec Prisma, NextAuth et base de données",
            path: path.join(templatesDir, "fullstack"),
        },
        {
            id: "ecommerce",
            name: "E-commerce",
            description: "Template e-commerce avec Stripe et gestion produits",
            path: path.join(templatesDir, "ecommerce"),
        },
    ];

    // Filtrer les templates qui existent réellement
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
