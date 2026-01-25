import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="px-6 py-20 border-t border-border bg-background">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
                <div className="md:col-span-2">
                    <Logo to="/" className="mb-6" />
                    <p className="text-muted-foreground max-w-sm mb-8">
                        A premium space for stories that matter. Join 100k+
                        readers and writers today.
                    </p>
                </div>
                <div>
                    <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-foreground">
                        Platform
                    </h5>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Write
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Library
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Creators
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-foreground">
                        Company
                    </h5>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Terms
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-foreground transition-colors"
                            >
                                Careers
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <span>&copy; 2026 QuillSpace. All rights reserved.</span>
                <div className="flex gap-8">
                    <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                    >
                        Twitter
                    </a>
                    <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                    >
                        Instagram
                    </a>
                    <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
