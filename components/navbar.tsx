"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Moon,
  Sun,
  ChevronDown,
  X,
  Home,
  Info,
  Search,
  Users,
  BookOpen,
  Newspaper,
  Mail,
  Download,
  Settings,
  FileText,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
    dropdown: [
      {
        name: "Our Mission",
        href: "/about#mission",
        icon: Search,
        description: "Learn about our core mission and values",
      },
      { name: "Vision & Goals", href: "/about#vision", icon: FileText, description: "Discover our future aspirations" },
      { name: "Partners", href: "/about#partners", icon: Users, description: "Meet our institutional partners" },
    ],
  },
  {
    name: "Research",
    href: "/research",
    icon: Search,
    dropdown: [
      {
        name: "Current Projects",
        href: "/research#current",
        icon: Settings,
        description: "Ongoing research initiatives",
      },
      {
        name: "Publications",
        href: "/research#publications",
        icon: FileText,
        description: "Academic papers and findings",
      },
      {
        name: "Methodology",
        href: "/research#methodology",
        icon: BookOpen,
        description: "Research approaches and methods",
      },
    ],
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: Download,
    dropdown: [
      {
        name: "Downloads",
        href: "/resources#downloads",
        icon: Download,
        description: "Educational materials and tools",
      },
      { name: "Toolkits", href: "/resources#toolkits", icon: Settings, description: "Comprehensive resource packages" },
      {
        name: "Guidelines",
        href: "/resources#guidelines",
        icon: FileText,
        description: "Best practices and standards",
      },
    ],
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-black/20 py-2"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl py-4"
        }`}
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Image
                    src="/images/step-study-logo-refined.png"
                    alt="STEP-STUDY Logo"
                    width={isScrolled ? 130 : 150}
                    height={isScrolled ? 65 : 75}
                    className="transition-all duration-500 group-hover:brightness-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.dropdown ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
                            : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : "group-hover:rotate-180"
                          }`}
                        />
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                      </motion.button>
                    ) : (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
                              : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                          {/* Subtle shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                        </Link>
                      </motion.div>
                    )}

                    {/* Glassmorphism Dropdown */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 z-50"
                        >
                          <div
                            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 border border-white/20 dark:border-gray-700/30 overflow-hidden"
                            style={{
                              backdropFilter: "blur(24px)",
                              WebkitBackdropFilter: "blur(24px)",
                            }}
                          >
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 dark:from-gray-800/10 dark:to-blue-500/5 pointer-events-none" />

                            <div className="relative p-3">
                              {item.dropdown.map((subItem, subIndex) => {
                                const SubIcon = subItem.icon
                                return (
                                  <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIndex * 0.05, duration: 0.3 }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      className="group/item flex items-start space-x-3 w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-blue-50/50 dark:hover:from-gray-800/50 dark:hover:to-blue-900/30 rounded-xl transition-all duration-200 relative overflow-hidden"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                                        <SubIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-200">
                                          {subItem.name}
                                        </div>
                                        {subItem.description && (
                                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                                            {subItem.description}
                                          </div>
                                        )}
                                      </div>
                                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-2" />

                                      {/* Subtle shine effect */}
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover/item:translate-x-[100%]" />
                                    </Link>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Authentication Buttons - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20 rounded-xl px-4 py-2 transition-all duration-300"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white font-medium text-sm px-6 py-2 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                  </Button>
                </motion.div>
              </div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-gray-700 dark:text-gray-200" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-gray-700 dark:text-gray-200" />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                </Button>
              </motion.div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden w-10 h-10 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20 transition-all duration-300 relative overflow-hidden group"
                    >
                      <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-l border-white/20 dark:border-gray-700/30 p-0"
                  style={{
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                  }}
                >
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200/30 dark:border-gray-700/30">
                    <Image
                      src="/images/step-study-logo-refined.png"
                      alt="STEP-STUDY Logo"
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-2 p-6">
                    {/* Mobile Auth Buttons */}
                    <div className="flex flex-col space-y-3 pb-6 border-b border-gray-200/30 dark:border-gray-700/30">
                      <Button
                        asChild
                        variant="ghost"
                        className="justify-start text-left font-medium hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-800/30 dark:hover:to-gray-700/20 rounded-xl"
                      >
                        <Link href="/login">
                          <User className="w-4 h-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg">
                        Get Started
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    {navigation.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="space-y-2"
                        >
                          <Link
                            href={item.href}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-blue-50/50 dark:hover:from-gray-800/50 dark:hover:to-blue-900/30 rounded-xl transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.name}</span>
                          </Link>
                          {item.dropdown && (
                            <div className="ml-6 space-y-1">
                              {item.dropdown.map((subItem) => {
                                const SubIcon = subItem.icon
                                return (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-gray-50/30 dark:hover:from-gray-800/30 dark:hover:to-gray-900/20 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <SubIcon className="w-3 h-3" />
                                    <span>{subItem.name}</span>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}
