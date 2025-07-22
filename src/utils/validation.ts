export function validateProjectName(name: string): true | string {
    if (!name || name.trim().length === 0) {
        return "Project name cannot be empty.";
    }

    if (name.length > 214) {
        return "Project name cannot exceed 214 characters.";
    }

    if (name.toLowerCase() !== name) {
        return "Project name must be lowercase.";
    }

    if (name.startsWith(".") || name.startsWith("_")) {
        return 'Project name cannot start with "." or "_".';
    }

    if (name.includes(" ")) {
        return "Project name cannot contain spaces.";
    }

    // Check for invalid special characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(name)) {
        return "Project name contains invalid characters.";
    }

    // Reserved names
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
        return `"${name}" is a reserved name and cannot be used.`;
    }

    return true;
}
