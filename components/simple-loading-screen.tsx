"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SimpleLoadingScreenProps {
  onComplete?: () => void
  duration?: number
  showLogo?: boolean
}

export default function SimpleLoadingScreen({
  onComplete,
  duration = 3000,
  showLogo = false,
}: SimpleLoadingScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (onComplete && duration > 0) {
      const timer = setTimeout(() => {
        onComplete()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [onComplete, duration])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center"
    >
      {/* Main Content */}
      <div className="text-center">
        {/* Optional Logo */}
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </motion.div>
        )}

        {/* Loading Text with Animated Dots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: showLogo ? 0.3 : 0 }}
          className="flex items-center justify-center space-x-1"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Starting Application</h1>

          {/* Animated Dots */}
          <div className="flex space-x-1 ml-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Optional Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: showLogo ? 0.6 : 0.3 }}
          className="text-gray-500 dark:text-gray-400 text-sm mt-2"
        >
          Please wait a moment
        </motion.p>
      </div>
    </motion.div>
  )
}
