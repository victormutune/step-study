"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "./splash-screen"

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Don't show splash during SSR
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? <SplashScreen key="splash" onComplete={handleSplashComplete} /> : <div key="app">{children}</div>}
      </AnimatePresence>
    </>
  )
}
