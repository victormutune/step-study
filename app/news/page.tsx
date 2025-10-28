import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, ExternalLink, Images } from "lucide-react"
import Link from "next/link"
import ImageGallery from "@/components/image-gallery"

const newsItems = [
  {
    id: 1,
    title: "STEP-STUDY Research Findings Published in International Journal",
    excerpt:
      "Our latest research on teacher professional development has been published in the Journal of Educational Research, highlighting innovative approaches to curriculum implementation.",
    date: "2024-01-15",
    category: "Research",
    image: "/placeholder.svg?height=200&width=400&text=Research+Publication",
  },
  {
    id: 2,
    title: "International Workshop on Competence-Based Training Held in Arusha",
    excerpt:
      "A successful three-day workshop brought together educators from Tanzania and Austria to share best practices in competence-based curriculum development.",
    date: "2024-01-10",
    category: "Workshop",
    image: "/placeholder.svg?height=200&width=400&text=Workshop+Arusha",
  },
  {
    id: 3,
    title: "New Partnership Agreement Signed with UNESCO-UNEVOC",
    excerpt:
      "STEP-STUDY expands its global reach through a strategic partnership with UNESCO-UNEVOC, enhancing technical and vocational education initiatives.",
    date: "2024-01-05",
    category: "Partnership",
    image: "/placeholder.svg?height=200&width=400&text=UNESCO+Partnership",
  },
  {
    id: 4,
    title: "STEP-STUDY Team Collaboration Updates",
    excerpt:
      "Follow our latest project updates and team collaborations on LinkedIn. Stay connected with our research progress and educational initiatives.",
    date: "2024-01-20",
    category: "Social Media",
    image: "/images/step-study-logo.png",
    externalLink: "https://www.linkedin.com/feed/update/urn:li:activity:7353068360751820800",
  },
]

const categoryColors = {
  Research: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Workshop: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Partnership: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "Social Media": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
}

export default function NewsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Latest News & Updates
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stay informed about our latest research findings, workshops, partnerships, and achievements in educational
              transformation.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <div className="flex space-x-2">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
                  News
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full px-6 py-2"
                >
                  <Link href="/news/gallery">
                    <Images className="w-4 h-4 mr-2" />
                    Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <div
                    className={`w-full h-48 flex items-center justify-center ${
                      item.category === "Social Media" ? "bg-white" : ""
                    }`}
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className={`${
                        item.category === "Social Media"
                          ? "max-w-full max-h-full object-contain p-4"
                          : "w-full h-full object-cover"
                      } group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={
                        categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"
                      }
                    >
                      {item.category}
                    </Badge>
                  </div>
                  {item.externalLink && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 rounded-full p-2">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>

                  {item.externalLink ? (
                    <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                        View on LinkedIn
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Built-in Photo Gallery Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Photo Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore moments from our workshops, research activities, and collaborative meetings that showcase the
              STEP-STUDY project in action. Click any image to view it in full screen.
            </p>
          </div>

          <ImageGallery />
        </section>

        {/* Load More Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
          >
            Load More News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
