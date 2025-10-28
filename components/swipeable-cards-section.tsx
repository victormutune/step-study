"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, BookOpen, Users, Target, Award, Lightbulb, TrendingUp } from "lucide-react"

interface CardData {
  id: number
  icon: React.ElementType
  title: string
  description: string
  stats: string
  gradient: string
  bgColor: string
}

const cardData: CardData[] = [
  {
    id: 1,
    icon: BookOpen,
    title: "Research Publications",
    description:
      "Contributing to the global knowledge base with peer-reviewed research on teacher education and curriculum development in East Africa.",
    stats: "15+ Publications",
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 2,
    icon: Users,
    title: "Teachers Trained",
    description:
      "Empowering educators across Tanzania with modern teaching methodologies and professional development programs.",
    stats: "500+ Teachers",
    gradient: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    id: 3,
    icon: Target,
    title: "Active Projects",
    description:
      "Running multiple research initiatives focused on improving educational outcomes and teacher effectiveness.",
    stats: "8 Projects",
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: 4,
    icon: Award,
    title: "Partner Institutions",
    description:
      "Collaborating with leading universities and research centers in Tanzania, Austria, and across East Africa.",
    stats: "12+ Partners",
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: 5,
    icon: Lightbulb,
    title: "Innovation Labs",
    description:
      "Testing and implementing cutting-edge educational technologies and teaching methodologies in real classroom settings.",
    stats: "5 Labs Active",
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Student Impact",
    description: "Improving learning outcomes and academic performance through evidence-based teaching interventions.",
    stats: "10,000+ Students",
    gradient: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
]

export default function SwipeableCardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextCard()
      }
    }, 5000) // Change card every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isDragging])

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length)
  }

  const goToCard = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch and mouse events
  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setTranslateX(diff)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    // Threshold for swipe (30% of container width)
    const threshold = containerRef.current ? containerRef.current.offsetWidth * 0.3 : 100

    if (translateX > threshold) {
      prevCard()
    } else if (translateX < -threshold) {
      nextCard()
    }

    setTranslateX(0)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd()
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Our Impact & Achievements
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our key milestones and ongoing initiatives in transforming education through research and
            collaboration
          </p>
        </div>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="relative select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cards Wrapper */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
              }}
            >
              {cardData.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <Card className="relative overflow-hidden border-0 shadow-2xl bg-white dark:bg-gray-800 h-full min-h-[400px] sm:min-h-[450px]">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                      </div>

                      <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col">
                        {/* Icon */}
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-8 transform hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                        </div>

                        {/* Stats Badge */}
                        <div
                          className={`inline-flex items-center px-4 py-2 rounded-full ${card.bgColor} mb-6 self-start`}
                        >
                          <span
                            className={`text-sm font-semibold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                          >
                            {card.stats}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                          {card.title}
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                          {card.description}
                        </p>

                        {/* Decorative Element */}
                        <div className={`mt-8 h-1 w-24 bg-gradient-to-r ${card.gradient} rounded-full`} />
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          <button
            onClick={prevCard}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
          <button
            onClick={nextCard}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next card"
          >
            <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-gradient-to-r from-blue-600 to-blue-700"
                  : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">👆 Swipe left or right to explore</p>
        </div>
      </div>
    </section>
  )
}
