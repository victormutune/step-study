"use client"

import { useState, useEffect, useMemo, memo } from "react"

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
        className={`block sm:hidden fixed top-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"
        }`}
      >
        <TimeDisplay time={time} isMobile />
      </div>
    </>
  )
}

// Memoized component to prevent unnecessary re-renders
const TimeDisplay = memo(function TimeDisplay({ 
  time, 
  isMobile = false 
}: { 
  time: Date
  isMobile?: boolean 
}) {
  // Memoize formatted values - only recalculate when time changes
  const formattedTime = useMemo(() => 
    time.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }), [time]
  )

  const formattedDate = useMemo(() => 
    time.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }), [time]
  )

  const formattedDay = useMemo(() => 
    time.toLocaleDateString("en-US", {
      weekday: "long",
    }), [time]
  )

  return (
    <div className="time-widget-container relative overflow-hidden group cursor-default">
      {/* Subtle shimmer effect on hover */}
      <div className="time-widget-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content Container */}
      <div className={`relative ${isMobile ? "px-4 py-3" : "px-5 py-4"} text-center`}>
        {/* Live Time Display */}
        <div
          className={`time-display font-mono font-bold text-white drop-shadow-sm tabular-nums tracking-wider mb-2 ${
            isMobile ? "text-lg" : "text-xl"
          }`}
          suppressHydrationWarning
        >
          {formattedTime}
        </div>

        {/* Full Date */}
        <div
          className={`date-display font-medium text-white/90 drop-shadow-sm mb-1 ${
            isMobile ? "text-sm" : "text-base"
          }`}
          suppressHydrationWarning
        >
          {formattedDate}
        </div>

        {/* Day of Week */}
        <div
          className={`day-display font-medium text-white/80 drop-shadow-sm ${
            isMobile ? "text-xs" : "text-sm"
          }`}
          suppressHydrationWarning
        >
          {formattedDay}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full animate-ping" 
           style={{ animationDelay: "1s" }} />
    </div>
  )
})

// Add CSS to your globals.css or component styles
const styles = `
.time-widget-container {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.time-widget-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: skewX(-12deg);
  animation: shimmer 3s ease-in-out infinite;
  animation-play-state: paused;
}

.time-widget-container:hover .time-widget-shimmer {
  animation-play-state: running;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

.time-display {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
}

.date-display,
.day-display {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-family: var(--font-poppins), 'Inter', system-ui, sans-serif;
}

.day-display {
  letter-spacing: 0.025em;
}
`