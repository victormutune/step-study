import type { Metadata } from "next"
import ResearchClientPage from "./research-client"

export const metadata: Metadata = {
  title: "Research - STEP Study",
  description: "Explore our comprehensive research data and analytics from the STEP Study project across Tanzania.",
}

export default function ResearchPage() {
  return <ResearchClientPage />
}
