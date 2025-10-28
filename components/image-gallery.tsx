"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  category?: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/gallery/gallery-1.jpg",
    alt: "STEP-STUDY project leader presenting at conference",
    title: "Project Leadership Presentation",
    category: "Conference",
  },
  {
    id: 2,
    src: "/images/gallery/gallery-2.jpg",
    alt: "Large conference room meeting with STEP-STUDY participants",
    title: "International Workshop Session",
    category: "Workshop",
  },
  {
    id: 3,
    src: "/images/gallery/gallery-3.jpg",
    alt: "University of Dodoma meeting with international collaborators",
    title: "University Collaboration Meeting",
    category: "Meeting",
  },
  {
    id: 4,
    src: "/images/gallery/gallery-4.jpg",
    alt: "STEP-STUDY team member in formal presentation",
    title: "Research Presentation",
    category: "Research",
  },
  {
    id: 5,
    src: "/images/gallery/gallery-5-new.jpg",
    alt: "STEP-STUDY researcher working on project analysis",
    title: "Research Analysis Session",
    category: "Research",
  },
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "Escape") closeLightbox()
  }

  return (
    <>
      {/* Gallery Grid - Responsive and Scalable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            onClick={() => openLightbox(image, index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">{image.title}</h3>
                  {image.category && (
                    <span className="inline-block px-2 py-1 bg-blue-600/80 text-white text-xs rounded-full">
                      {image.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Click indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Stats */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Showing {galleryImages.length} photos from STEP-STUDY project activities
        </p>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent
          className="max-w-[95vw] w-full h-full max-h-[95vh] p-0 bg-black/95 border-0 rounded-lg overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Header with controls */}
              <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
                    <p className="text-white/80 text-sm">
                      {currentIndex + 1} of {galleryImages.length}
                      {selectedImage.category && ` • ${selectedImage.category}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full"
                      onClick={() => {
                        /* Add share functionality */
                      }}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full"
                      onClick={closeLightbox}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-16">
                <div className="relative max-w-full max-h-full">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Thumbnail Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
                <div className="flex space-x-2 max-w-full overflow-x-auto px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                  {galleryImages.map((img, index) => (
                    <button
                      key={img.id}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? "border-white shadow-lg scale-110"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      onClick={() => {
                        setCurrentIndex(index)
                        setSelectedImage(img)
                      }}
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
