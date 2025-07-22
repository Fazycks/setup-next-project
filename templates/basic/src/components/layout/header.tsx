import Link from "next/link";
import { ModeToggle } from "../theme/theme-mode-toggle";

const Links = [
    {
        href: "/about",
        label: "About",
    },
    {
        href: "/contact",
        label: "Contact",
    },
];

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-accent gap-4">
            <Link href="/">
                <h1 className="text-lg font-bold">My App</h1>
            </Link>
            <nav>
                <ul className="flex items-center gap-4">
                    {Links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="hover:text-primary hover:underline"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <ModeToggle />
        </header>
    );
}
