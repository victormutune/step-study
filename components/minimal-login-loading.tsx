"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

interface MinimalLoginLoadingProps {
  onComplete: () => void
  duration?: number
}

export default function MinimalLoginLoading({ onComplete, duration = 2500 }: MinimalLoginLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [onComplete, duration])

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Main Loading Text */}
        <div className="flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white tracking-wide"
          >
            Starting Step-Study Application
          </motion.h1>

          {/* Animated Dots */}
          <div className="flex ml-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white"
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
        </div>

        {/* Subtle Progress Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 w-64 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            animate={{
              width: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
