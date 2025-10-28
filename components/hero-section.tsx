"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

const slideImages = [
  {
    src: "/images/slide1.jpg",
    alt: "STEP-STUDY Research Excellence",
    animation: "zoom-in",
  },
  {
    src: "/images/slide2.jpg",
    alt: "Teacher Professional Development",
    animation: "zoom-out",
  },
  {
    src: "/images/slide3.jpg",
    alt: "International Collaboration",
    animation: "pan-left",
  },
  {
    src: "/images/slide4.jpg",
    alt: "Educational Innovation",
    animation: "pan-right",
  },
  {
    src: "/images/slide5.jpg",
    alt: "Academic Research",
    animation: "zoom-in",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const mainText = "Strengthening Teachers, Transforming Education"

  useEffect(() => {
    // Slideshow auto-advance
    const slideInterval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev + 1) % slideImages.length)
        setTimeout(() => setIsTransitioning(false), 1500)
      }
    }, 6000) // Change slide every 6 seconds

    // Typing animation for main text
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setDisplayedText(mainText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)

        // Start blinking cursor after typing is complete
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev)
        }, 500)

        return () => clearInterval(cursorInterval)
      }
    }, 80)

    return () => {
      clearInterval(slideInterval)
      clearInterval(typingInterval)
    }
  }, [isTransitioning])

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 1500)
    }
  }

  const getAnimationClass = (animation: string, isActive: boolean) => {
    if (!isActive) return "scale-100"

    switch (animation) {
      case "zoom-in":
        return "scale-108"
      case "zoom-out":
        return "scale-95"
      case "pan-left":
        return "scale-105 -translate-x-2"
      case "pan-right":
        return "scale-105 translate-x-2"
      default:
        return "scale-108"
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
      {/* Modern Slideshow Container */}
      <div className="absolute inset-0 z-0">
        {slideImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Ken Burns Effect Container - Clear Images */}
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-6000 ease-out ${getAnimationClass(
                slide.animation,
                index === currentSlide,
              )}`}
              style={{
                backgroundImage: `url(${slide.src})`,
              }}
            />

            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-black/30" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
        {/* Animated Main Headline */}
        <div className="mb-12">
          <h1 className="text-white font-bold leading-tight mb-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl drop-shadow-2xl">
            <span className="inline-block">
              {displayedText}
              <span
                className={`inline-block w-1 ml-1 bg-white transition-opacity duration-100 ${
                  isTypingComplete ? (showCursor ? "opacity-100" : "opacity-0") : "animate-pulse opacity-100"
                }`}
                style={{
                  height: "1em",
                }}
              >
                |
              </span>
            </span>
          </h1>
        </div>

        {/* CTA Buttons - Show after typing is complete */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-500 ${
            isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <Link href="/research">
              <span className="relative z-10">Explore Our Research</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-full text-lg font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <Link href="/about">
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </Button>
        </div>

        {/* Floating Cards Preview - Show after typing is complete */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${
            isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { title: "Research Excellence", desc: "Evidence-based educational solutions" },
            { title: "Teacher Empowerment", desc: "Professional development programs" },
            { title: "Global Collaboration", desc: "International partnerships" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 border-2 border-white/60 rounded-full transition-all duration-400 relative ${
              index === currentSlide ? "bg-white" : "bg-transparent hover:bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
