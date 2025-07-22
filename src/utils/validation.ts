export function validateProjectName(name: string): true | string {
    if (!name || name.trim().length === 0) {
        return "Le nom du projet ne peut pas être vide.";
    }

    if (name.length > 214) {
        return "Le nom du projet ne peut pas dépasser 214 caractères.";
    }

    if (name.toLowerCase() !== name) {
        return "Le nom du projet doit être en minuscules.";
    }

    if (name.startsWith(".") || name.startsWith("_")) {
        return 'Le nom du projet ne peut pas commencer par "." ou "_".';
    }

    if (name.includes(" ")) {
        return "Le nom du projet ne peut pas contenir d'espaces.";
    }

    // Vérifier les caractères spéciaux non autorisés
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(name)) {
        return "Le nom du projet contient des caractères non autorisés.";
    }

    // Noms réservés
    const reservedNames = [
        "con",
        "prn",
        "aux",
        "nul",
        "com1",
        "com2",
        "com3",
        "com4",
        "com5",
        "com6",
        "com7",
        "com8",
        "com9",
        "lpt1",
        "lpt2",
        "lpt3",
        "lpt4",
        "lpt5",
        "lpt6",
        "lpt7",
        "lpt8",
        "lpt9",
    ];

    if (reservedNames.includes(name.toLowerCase())) {
        return `"${name}" est un nom réservé et ne peut pas être utilisé.`;
    }

    return true;
}
