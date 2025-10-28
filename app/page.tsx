import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import StatsSection from "@/components/stats-section"
import SwipeableCardsSection from "@/components/swipeable-cards-section"
import NewsSection from "@/components/news-section"
import CTASection from "@/components/cta-section"
import FloatingTimeWidget from "@/components/floating-time-widget"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <FloatingTimeWidget />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <SwipeableCardsSection />
      <NewsSection />
      <CTASection />
    </div>
  )
}
