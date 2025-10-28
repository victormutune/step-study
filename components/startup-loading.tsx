"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

interface StartupLoadingProps {
  onComplete?: () => void
}

export default function StartupLoading({ onComplete }: StartupLoadingProps) {
  useEffect(() => {
    // Auto-complete after 2.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center">
      {/* Main Loading Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Loading Text with Sequential Dots */}
        <div className="flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white tracking-wide"
          >
            Starting Application
          </motion.h1>

          {/* Sequential Animated Dots */}
          <div className="flex ml-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mx-0.5"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 w-48 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{
              width: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
