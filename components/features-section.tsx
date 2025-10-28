"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Globe, Target, Lightbulb, Award } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Research Excellence",
    description:
      "Conducting cutting-edge educational research to develop evidence-based solutions for teacher training and curriculum development.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Teacher Strengthening",
    description:
      "Empowering educators through comprehensive professional development programs and innovative training methodologies.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description:
      "Building bridges between institutions in Tanzania and Austria to share knowledge and best practices in education.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Target,
    title: "Impact-Driven Solutions",
    description:
      "Developing practical tools and strategies that create measurable improvements in educational outcomes.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation in Education",
    description:
      "Pioneering new approaches to teaching and learning that prepare students for the challenges of tomorrow.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "Ensuring the highest standards in educational research and implementation through rigorous evaluation processes.",
    color: "from-red-500 to-red-600",
  },
]

export default function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...prev, cardIndex])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Transforming Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive approach combines research excellence, teacher empowerment, and global collaboration to
            create lasting impact in educational systems.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleCards.includes(index)

            return (
              <Card
                key={index}
                data-index={index}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } hover:-translate-y-2`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>

                {/* Hover Effect Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
