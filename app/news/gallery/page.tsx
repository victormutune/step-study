"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Images, Calendar, Users, MapPin } from "lucide-react"
import Link from "next/link"

const photoAlbums = [
  {
    id: 1,
    title: "STEP-STUDY Workshop Sessions",
    description:
      "Interactive workshops designed to enhance teacher capabilities and promote collaborative learning across institutions.",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Workshop+Sessions",
    category: "Workshop",
    date: "2024",
    photoCount: "25+ Photos",
  },
  {
    id: 2,
    title: "Research Team Meetings",
    description: "Behind-the-scenes moments from our collaborative research sessions and team meetings.",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Team+Meetings",
    category: "Team Activities",
    date: "2023-2024",
    photoCount: "30+ Photos",
  },
  {
    id: 3,
    title: "University Collaborations",
    description: "Educational activities, seminars, and research presentations across partner universities.",
    thumbnail: "/placeholder.svg?height=300&width=400&text=University+Events",
    category: "University Events",
    date: "2024",
    photoCount: "40+ Photos",
  },
  {
    id: 4,
    title: "International Conferences",
    description: "International collaboration activities, presentations, and joint research discussions.",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Conferences",
    category: "International",
    date: "2023-2024",
    photoCount: "35+ Photos",
  },
]

const categoryColors = {
  Workshop: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Team Activities": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "University Events": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  International: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our visual journey through workshops, research activities, and collaborative moments that define
              the STEP-STUDY project.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <div className="flex space-x-2">
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full px-6 py-2"
                >
                  <Link href="/news">News</Link>
                </Button>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
                  <Images className="w-4 h-4 mr-2" />
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoAlbums.map((album) => (
            <Card
              key={album.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-0">
                {/* Thumbnail Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={album.thumbnail || "/placeholder.svg"}
                    alt={album.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={categoryColors[album.category as keyof typeof categoryColors]}>
                      {album.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date and Photo Count */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {album.date}
                    </div>
                    <div className="flex items-center">
                      <Images className="w-4 h-4 mr-1" />
                      {album.photoCount}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {album.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                    {album.description}
                  </p>

                  {/* View Album Button */}
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white group-hover:shadow-lg transition-all duration-200"
                    onClick={() => {
                      // Navigate to main news page gallery
                      window.location.href = "/news#gallery"
                    }}
                  >
                    View Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore Our Visual Story</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
              Each collection captures important moments in our educational research journey. All photos are now hosted
              directly on our website for fast, reliable access.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Team Collaborations
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Multi-Location Events
              </div>
              <div className="flex items-center">
                <Images className="w-4 h-4 mr-1" />
                130+ Photos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
