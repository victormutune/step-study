"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import SimpleLoadingScreen from "./simple-loading-screen"

export default function DemoLoadingPage() {
  const [showLoading, setShowLoading] = useState(false)
  const [showWithLogo, setShowWithLogo] = useState(false)

  const startDemo = (withLogo = false) => {
    setShowWithLogo(withLogo)
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setShowWithLogo(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple Loading Screen Demo</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Click the buttons below to see different variations of the clean, minimal loading animation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => startDemo(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Show Basic Loading
          </Button>

          <Button
            onClick={() => startDemo(true)}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg"
          >
            Show with Logo
          </Button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>• Clean and minimal design</p>
          <p>• Animated dots appearing one after another</p>
          <p>• Smooth fade transitions</p>
          <p>• Dark mode support</p>
        </div>
      </div>

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {showLoading && (
          <SimpleLoadingScreen onComplete={handleLoadingComplete} duration={3000} showLogo={showWithLogo} />
        )}
      </AnimatePresence>
    </div>
  )
}
