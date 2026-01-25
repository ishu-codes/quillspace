import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Bookmark,
    ChevronRight,
    Menu,
    Search,
    Star,
    TrendingUp,
    X,
    Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const categories = ["All", "Design", "Tech", "Culture", "Business", "Self"];

    const featuredArticles = [
        {
            id: 1,
            title: "The Art of Slow Writing in a Fast World",
            excerpt:
                "Why deliberate creation is becoming the ultimate competitive advantage for modern thinkers.",
            author: "Elena Rossi",
            date: "Jan 24, 2026",
            category: "Culture",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
        },
        {
            id: 2,
            title: "Future of Neural Interfaces",
            excerpt:
                "How the next decade will redefine what it means to be connected to our tools.",
            author: "Marcus Chen",
            date: "Jan 22, 2026",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        },
    ];

    const articles = [
        {
            id: 3,
            title: "Building Resilient Systems",
            author: "Sarah Jenkins",
            category: "Engineering",
            date: "Jan 20",
        },
        {
            id: 4,
            title: "Minimalism as a Strategy",
            author: "David Blur",
            category: "Design",
            date: "Jan 19",
        },
        {
            id: 5,
            title: "The Feedback Loop of Creativity",
            author: "Aris Thorne",
            category: "Business",
            date: "Jan 18",
        },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
                    isScrolled
                        ? "bg-background/80 backdrop-blur-xl border-b border-border py-3"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Logo to="/" />

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a
                            href="#"
                            className="hover:text-muted-foreground transition-colors"
                        >
                            Stories
                        </a>
                        <a
                            href="#"
                            className="hover:text-muted-foreground transition-colors"
                        >
                            Authors
                        </a>
                        <a
                            href="#"
                            className="hover:text-muted-foreground transition-colors"
                        >
                            Pricing
                        </a>
                        <div className="h-4 w-px bg-border mx-2" />
                        <Link
                            to="/auth/login"
                            className="hover:text-muted-foreground transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link to="/auth/login">
                            <Button size="sm" className="rounded-full px-6">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.05),transparent)] pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium mb-8"
                    >
                        <Zap className="w-3 h-3 fill-foreground" />
                        <span>Redefining the digital writing experience</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-8"
                    >
                        Where ideas <br />
                        <span className="italic text-muted-foreground">
                            take shape.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        A minimal space for deep thinkers and quality writers.
                        No noise, just your words and the people who value them.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <div className="relative group">
                            <Input
                                placeholder="Find stories..."
                                className="w-full sm:w-[400px] h-14 pl-12 pr-6 rounded-full border-2 border-border focus:border-foreground transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-foreground transition-colors" />
                        </div>
                        <Link to="/auth/login">
                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-full text-lg group"
                            >
                                Start Writing
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Grid */}
            <section className="px-6 py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-serif font-bold mb-2">
                                Editor's Picks
                            </h2>
                            <p className="text-muted-foreground">
                                Handpicked stories for the curious mind.
                            </p>
                        </div>
                        <Link
                            to="/auth/login"
                            className="flex items-center gap-2 font-medium hover:underline"
                        >
                            View all <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {featuredArticles.map((article) => (
                            <motion.div
                                key={article.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={itemVariants}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-muted-foreground transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground text-lg mb-4 line-clamp-2 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-border" />
                                        <span className="text-sm font-semibold">
                                            {article.author}
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {article.date}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento List Section */}
            <section className="px-6 py-24 border-t border-border">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-5 py-2 rounded-full border border-border text-sm font-medium whitespace-nowrap transition-all ${
                                        cat === "All"
                                            ? "bg-foreground text-background"
                                            : "hover:bg-muted"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-12">
                            {articles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col md:flex-row gap-8 pb-12 border-b border-border group last:border-0"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                            <span>{article.category}</span>
                                            <span>•</span>
                                            <span>{article.date}</span>
                                        </div>
                                        <h3 className="text-4xl font-serif font-bold mb-4 group-hover:italic transition-all cursor-pointer">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium">
                                                By {article.author}
                                            </span>
                                            <Bookmark className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-12 group"
                            >
                                Read more stories
                                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    <aside className="lg:col-span-4 space-y-16">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Trending now
                            </h4>
                            <div className="space-y-8">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex gap-6 group cursor-pointer"
                                    >
                                        <span className="text-4xl font-serif font-bold text-border group-hover:text-foreground transition-colors">
                                            0{i}
                                        </span>
                                        <div>
                                            <h5 className="font-bold leading-tight mb-2">
                                                How to build a creative career
                                                without burnout
                                            </h5>
                                            <p className="text-sm text-muted-foreground">
                                                Alex Volkov in Creativity
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-foreground text-background rounded-3xl">
                            <Star className="w-8 h-8 mb-6 fill-background" />
                            <h4 className="text-2xl font-serif font-bold mb-4">
                                Support Independent Writing
                            </h4>
                            <p className="text-background/80 mb-8 leading-relaxed">
                                Unlock full access to all stories and support
                                the writers you love for just $5/month.
                            </p>
                            <Button
                                variant="secondary"
                                className="w-full rounded-xl py-6 font-bold"
                            >
                                Learn more
                            </Button>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">
                                Writers you should follow
                            </h4>
                            <div className="space-y-6">
                                {[
                                    "James Clear",
                                    "Maria Popova",
                                    "Seth Godin",
                                ].map((name) => (
                                    <div
                                        key={name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted" />
                                            <span className="font-semibold">
                                                {name}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full text-xs px-4"
                                        >
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-20 border-t border-border">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <Logo to="/" className="mb-6" />
                        <p className="text-muted-foreground max-w-sm mb-8">
                            A premium space for stories that matter. Join 100k+
                            readers and writers today.
                        </p>
                        <div className="flex gap-4">
                            {/* Social icons would go here */}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 uppercase text-xs tracking-widest">
                            Platform
                        </h5>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Write
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Library
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Creators
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6 uppercase text-xs tracking-widest">
                            Company
                        </h5>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <span>&copy; 2026 QuillSpace. All rights reserved.</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-foreground">
                            Twitter
                        </a>
                        <a href="#" className="hover:text-foreground">
                            Instagram
                        </a>
                        <a href="#" className="hover:text-foreground">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
