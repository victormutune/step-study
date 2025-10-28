import type { Metadata } from "next"
import ResearchProgressClient from "./research-progress-client"

export const metadata: Metadata = {
  title: "Research Progress & Expertise - STEP Study",
  description:
    "Explore our research progress across Tanzanian zones, tutor projects, and team expertise in the STEP Study project.",
}

export default function ResearchProgressPage() {
  return <ResearchProgressClient />
}
