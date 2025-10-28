"use client"

import { useState, useEffect } from "react"

export default function FloatingTimeWidget() {
  const [time, setTime] = useState(new Date())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show widget with smooth fade-in animation after page loads
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    // Update time every second for live display
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearTimeout(showTimer)
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    })
  }

  return (
    <>
      {/* Desktop & Tablet - Top Right */}
      <div
        className={`hidden sm:block fixed top-28 right-6 z-40 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"
        }`}
      >
        <TimeDisplay time={time} />
      </div>

      {/* Mobile - Top Center */}
      <div
        className={`block sm:hidden fixed top-24 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"
        }`}
      >
        <TimeDisplay time={time} isMobile />
      </div>
    </>
  )
}

function TimeDisplay({ time, isMobile = false }: { time: Date; isMobile?: boolean }) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    })
  }

  return (
    <div
      className="relative overflow-hidden group cursor-default"
      style={{
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `,
      }}
    >
      {/* Subtle shimmer effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          animation: "shimmer 3s ease-in-out infinite",
          animationPlayState: "paused",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "running"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "paused"
        }}
      />

      {/* Content Container */}
      <div className={`relative ${isMobile ? "px-4 py-3" : "px-5 py-4"} text-center`}>
        {/* Live Time Display */}
        <div
          className={`font-mono font-bold text-white drop-shadow-sm tabular-nums tracking-wider mb-2 ${
            isMobile ? "text-lg" : "text-xl"
          }`}
          style={{
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          }}
        >
          {formatTime(time)}
        </div>

        {/* Full Date */}
        <div
          className={`font-medium text-white/90 drop-shadow-sm mb-1 ${isMobile ? "text-sm" : "text-base"}`}
          style={{
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            fontFamily: "var(--font-poppins), 'Inter', system-ui, sans-serif",
          }}
        >
          {formatDate(time)}
        </div>

        {/* Day of Week */}
        <div
          className={`font-medium text-white/80 drop-shadow-sm ${isMobile ? "text-xs" : "text-sm"}`}
          style={{
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            fontFamily: "var(--font-poppins), 'Inter', system-ui, sans-serif",
            letterSpacing: "0.025em",
          }}
        >
          {formatDay(time)}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
      <div
        className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full animate-ping"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
