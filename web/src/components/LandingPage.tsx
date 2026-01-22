import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Apple, BookOpen, Check, Eye, Menu, MessageSquare, Play, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Newest", "Popular", "Work", "Machine Learning", "Artificial Intelligence"];

  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      date: "Jan 7, 2024",
      category: "Python",
      title: "Python for Blockchain: A Quick Guide",
      description: "Learn how Python simplifies blockchain development.",
      author: "Brooklyn Simmons",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brooklyn",
      views: "15.8k",
      comments: "15.8k",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      date: "Jan 3, 2024",
      category: "Artificial Intelligence",
      title: "How AI is Revolutionizing Blockchain Security: Insights and Innovations",
      description: "Explore how AI enhances blockchain security.",
      author: "Cody Fisher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cody",
      views: "15.8k",
      comments: "15.8k",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
      date: "Mar 5, 2024",
      category: "Machine Learning",
      title: "Python & Machine Learning",
      description: "Explore building intelligent systems with Python.",
      author: "Jacob Jones",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jacob",
      views: "15.8k",
      comments: "15.8k",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
      date: "Oct 25, 2024",
      category: "Blockchain",
      title: "Machine Learning Meets Blockchain",
      description: "See how machine learning enhances blockchain tech.",
      author: "Devon Lane",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devon",
      views: "15.8k",
      comments: "15.8k",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      date: "Jan 7, 2024",
      category: "Blockchain",
      title: "The Future of Decentralized AI: Combine Machine Learning with Blockchain",
      description: "Discover the potential of decentralized AI.",
      author: "Marvin McKinney",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marvin",
      views: "15.8k",
      comments: "15.8k",
    },
  ];

  const topics = [
    { name: "Data Privacy & Protection", articles: "289 articles" },
    { name: "Cloud Computing", articles: "78 articles" },
    { name: "Health tech", articles: "45 articles" },
    { name: "Analytics", articles: "828 articles" },
  ];

  const writers = [
    {
      name: "Guy Hawkins",
      role: "Top Writer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guy",
    },
    {
      name: "Cameron Williamson",
      role: "Medical Assistant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cameron",
    },
    {
      name: "Theresa Webb",
      role: "President of Sales",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=theresa",
    },
    {
      name: "Esther Howard",
      role: "Banking Analyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=esther",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Read unlimited articles",
        "Follow up to 10 writers",
        "Basic search functionality",
        "Community access",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "$9",
      period: "/month",
      description: "For serious readers and writers",
      features: [
        "Everything in Free",
        "Ad-free reading experience",
        "Unlimited follows",
        "Advanced search & filters",
        "Download articles offline",
        "Priority support",
        "Exclusive content access",
      ],
      popular: true,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For professional writers",
      features: [
        "Everything in Premium",
        "Analytics dashboard",
        "Custom author profile",
        "Monetize your content",
        "Early access to features",
        "Dedicated account manager",
        "API access",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/95 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QuillSpace</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-gray-300 hover:text-white transition text-sm">
                Home
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition text-sm">
                About Us
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition text-sm">
                Pricing
              </a>
              <a href="#download" className="text-gray-300 hover:text-white transition text-sm">
                Download
              </a>
              {/*<Link to="/auth/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white text-sm">
                  Sign In
                </Button>
              </Link>*/}
              <Link to="/auth/login">
                <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white" type="button">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-900/95 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-gray-300 hover:text-white py-2">
                Home
              </a>
              <a href="#about" className="block text-gray-300 hover:text-white py-2">
                About Us
              </a>
              <a href="#pricing" className="block text-gray-300 hover:text-white py-2">
                Pricing
              </a>
              <a href="#download" className="block text-gray-300 hover:text-white py-2">
                Download
              </a>
              {/*<Link to="/auth/login">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>*/}
              <Link to="/auth/login">
                <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 md:py-32"
      >
        {/* Floating avatars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg"
              initial={{
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1000,
                y: Math.random() * 600,
                scale: 0.5,
              }}
              animate={{
                y: [Math.random() * 600, Math.random() * 600, Math.random() * 600],
                x: [
                  typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1000,
                  typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1000,
                ],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                alt=""
                className="w-full h-full rounded-full ring-4 ring-amber-400/30"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-amber-400">Discover</span> <span className="text-white">Insights.</span>
              <br />
              <span className="text-white">Fuel Your</span> <span className="text-amber-400">Curiosity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Dive into a world of insightful articles, expert opinions, and inspiring stories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-2xl">
                <Input
                  placeholder="Search Article"
                  className="flex-1 border-0 bg-white! focus-visible:ring-0 text-gray-800 px-6"
                />
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 h-11 w-11"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Article Post</h2>
                <p className="text-gray-600">Get started today and take your reading experience wherever you go!</p>
              </div>

              {/* Category Tabs */}
              <div className="mb-8 overflow-x-auto">
                <div className="flex gap-2 min-w-max pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                        activeCategory === category
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="space-y-6">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    <Card className="overflow-hidden bg-white border-0 transition-shadow">
                      <div className="md:flex gap-4 px-6">
                        <div className="md:w-1/3">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                            <span>{article.date}</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-500 transition cursor-pointer">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{article.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={article.avatar} alt={article.author} className="w-8 h-8 rounded-full" />
                              <span className="text-sm font-medium text-gray-700">{article.author}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{article.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 rounded-full">Load More</Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recommended Topics */}
              <Card className="bg-white border-0">
                <CardContent className="px-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Topics</h3>
                  <div className="space-y-3">
                    {topics.map((topic) => (
                      <div key={topic.name} className="flex items-center justify-between py-2 cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 text-lg">#</span>
                          <div>
                            <p className="font-medium text-gray-900 group-hover:text-amber-500 transition">
                              {topic.name}
                            </p>
                            <p className="text-sm text-gray-500">{topic.articles}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-4 text-amber-500 hover:text-amber-600 p-0">
                    See more topics
                  </Button>
                </CardContent>
              </Card>

              {/* Inspired Writers */}
              <Card className="bg-white border-0">
                <CardContent className="px-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Inspired Writer</h3>
                  <div className="space-y-4">
                    {writers.map((writer) => (
                      <div key={writer.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={writer.avatar}
                            alt={writer.name}
                            className="w-10 h-10 rounded-full ring-2 ring-amber-400"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{writer.name}</p>
                            <p className="text-sm text-gray-500">{writer.role}</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-4">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-4 text-amber-500 hover:text-amber-600 p-0">
                    See more suggestion
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Membership */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Sparkles className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Become a Premium Member</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Unlock exclusive content, insightful articles, and ad-free reading by becoming a Premium Member
                    </p>
                    <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white w-full rounded-full">
                      See All Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Select the perfect plan for your reading and writing journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Card className={`relative h-full ${plan.popular ? "ring-2 ring-amber-400" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-500 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white"
                          : "bg-gray-600 hover:bg-gray-800 text-white"
                      }`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section id="download" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-amber-500 font-medium mb-2">+ DOWNLOAD OUR APP</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Read Anywhere and Anytime</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Experience seamless access to our latest content on the go
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-xl flex items-center gap-3">
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-xl flex items-center gap-3">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="flex justify-center items-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600&fit=crop"
                alt="App Screenshot 1"
                className="w-1/4 rounded-3xl shadow-2xl transform rotate-6"
              />
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600&fit=crop"
                alt="App Screenshot 2"
                className="w-1/3 rounded-3xl shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600&fit=crop"
                alt="App Screenshot 3"
                className="w-1/4 rounded-3xl shadow-2xl transform -rotate-6"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">QuillSpace</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Quality articles from talented writers and thinkers on topics that matter
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Programming
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blockchain
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    User Experience
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Menu</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Write
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Get In Touch With Us!</h3>
              <p className="text-sm text-gray-400 mb-4">We provide best information from us exclusively</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-full"
                />
                <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 rounded-full">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>Copyright 2026 QuillSpace. All Rights Reserved</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
