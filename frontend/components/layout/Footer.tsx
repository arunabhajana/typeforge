import Link from "next/link";

const footerLinks = {
    product: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" }, // Placeholder
        { name: "Practice", href: "#" },
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Privacy", href: "#" },
    ],
    social: [
        { name: "Twitter", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Discord", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-12 mt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tighter">
                            Type<span className="text-primary">Forge</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Master your speed. Forge your skills.
                            <br />
                            The ultimate typing platform for pros.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            {footerLinks.social.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} TypeForge. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Optional extra links */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
