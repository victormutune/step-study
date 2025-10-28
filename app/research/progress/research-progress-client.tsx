"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MapPin,
  TrendingUp,
  BookOpen,
  Database,
  Target,
  Activity,
  Award,
  Lightbulb,
  Globe,
  Cpu,
  Leaf,
  Wrench,
  Mail,
  Phone,
  CheckCircle,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"

// Zonal Research Data
const zonalData = [
  {
    id: 1,
    name: "Northern Zone",
    regions: ["Arusha", "Kilimanjaro", "Manyara"],
    population: "3.2M",
    coordinator: "Dr. Anna Aleksanyan",
    dataCollection: 85,
    analysis: 72,
    reporting: 45,
    keyActivities: ["Agriculture", "Tourism", "Mining"],
    resources: ["Mount Kilimanjaro", "Serengeti", "Coffee Plantations"],
    completionDate: "2024-06-15",
    color: "from-blue-500 to-blue-600",
    lightColor: "from-blue-50 to-blue-100",
    darkColor: "from-blue-900/20 to-blue-800/30",
  },
  {
    id: 2,
    name: "Central Zone",
    regions: ["Dodoma", "Singida"],
    population: "2.8M",
    coordinator: "Dr. Ignasia Mligo",
    dataCollection: 92,
    analysis: 88,
    reporting: 65,
    keyActivities: ["Agriculture", "Livestock", "Government"],
    resources: ["Capital City", "Agricultural Land", "Government Institutions"],
    completionDate: "2024-05-20",
    color: "from-green-500 to-green-600",
    lightColor: "from-green-50 to-green-100",
    darkColor: "from-green-900/20 to-green-800/30",
  },
  {
    id: 3,
    name: "Western Zone",
    regions: ["Tabora", "Kigoma"],
    population: "2.1M",
    coordinator: "Dr. Labani Kanyonga",
    dataCollection: 78,
    analysis: 65,
    reporting: 40,
    keyActivities: ["Agriculture", "Mining", "Transport"],
    resources: ["Railway Hub", "Mineral Deposits", "Lake Tanganyika"],
    completionDate: "2024-07-10",
    color: "from-purple-500 to-purple-600",
    lightColor: "from-purple-50 to-purple-100",
    darkColor: "from-purple-900/20 to-purple-800/30",
  },
  {
    id: 4,
    name: "Lake Zone",
    regions: ["Mwanza", "Shinyanga", "Simiyu", "Geita"],
    population: "4.5M",
    coordinator: "Dr. Alcuin Mwalongo",
    dataCollection: 88,
    analysis: 75,
    reporting: 55,
    keyActivities: ["Fishing", "Mining", "Agriculture"],
    resources: ["Lake Victoria", "Gold Mines", "Cotton Farms"],
    completionDate: "2024-06-30",
    color: "from-cyan-500 to-cyan-600",
    lightColor: "from-cyan-50 to-cyan-100",
    darkColor: "from-cyan-900/20 to-cyan-800/30",
  },
  {
    id: 5,
    name: "Southern Zone",
    regions: ["Mtwara", "Lindi"],
    population: "1.9M",
    coordinator: "Dr. Naisujaki Lyimo",
    dataCollection: 70,
    analysis: 58,
    reporting: 35,
    keyActivities: ["Agriculture", "Fishing", "Gas Extraction"],
    resources: ["Natural Gas", "Cashew Nuts", "Indian Ocean"],
    completionDate: "2024-08-15",
    color: "from-orange-500 to-orange-600",
    lightColor: "from-orange-50 to-orange-100",
    darkColor: "from-orange-900/20 to-orange-800/30",
  },
  {
    id: 6,
    name: "Southern Highlands",
    regions: ["Iringa", "Njombe", "Mbeya", "Songwe", "Rukwa"],
    population: "3.7M",
    coordinator: "Dr. Abdallah Seni",
    dataCollection: 82,
    analysis: 70,
    reporting: 50,
    keyActivities: ["Agriculture", "Mining", "Hydropower"],
    resources: ["Tea Plantations", "Hydroelectric Dams", "Mineral Deposits"],
    completionDate: "2024-07-25",
    color: "from-emerald-500 to-emerald-600",
    lightColor: "from-emerald-50 to-emerald-100",
    darkColor: "from-emerald-900/20 to-emerald-800/30",
  },
  {
    id: 7,
    name: "Coastal Zone",
    regions: ["Dar es Salaam", "Pwani", "Morogoro"],
    population: "6.8M",
    coordinator: "Dr. Nicodemus Mbwambo",
    dataCollection: 95,
    analysis: 90,
    reporting: 75,
    keyActivities: ["Commerce", "Industry", "Port Services"],
    resources: ["Dar es Salaam Port", "Industrial Areas", "Indian Ocean"],
    completionDate: "2024-04-30",
    color: "from-indigo-500 to-indigo-600",
    lightColor: "from-indigo-50 to-indigo-100",
    darkColor: "from-indigo-900/20 to-indigo-800/30",
  },
  {
    id: 8,
    name: "Eastern Zone",
    regions: ["Tanga", "Pemba", "Unguja"],
    population: "2.3M",
    coordinator: "Dr. Luka Mkonongwa",
    dataCollection: 75,
    analysis: 62,
    reporting: 42,
    keyActivities: ["Tourism", "Agriculture", "Fishing"],
    resources: ["Spice Islands", "Historical Sites", "Marine Resources"],
    completionDate: "2024-08-05",
    color: "from-rose-500 to-rose-600",
    lightColor: "from-rose-50 to-rose-100",
    darkColor: "from-rose-900/20 to-rose-800/30",
  },
]

// Tutor Projects Data
const tutorProjects = [
  {
    id: 1,
    title: "Digital Literacy Assessment Framework",
    description:
      "Development of comprehensive assessment tools for measuring digital literacy among primary and secondary school teachers across Tanzania.",
    leader: "Dr. Anna Aleksanyan",
    stage: "Data Collection",
    progress: 65,
    startDate: "2023-08-15",
    expectedCompletion: "2024-09-30",
    funding: "$45,000",
    collaborators: ["University of Graz", "Ministry of Education"],
    expectedOutcomes: [
      "Standardized digital literacy assessment tool",
      "Teacher competency baseline data",
      "Training recommendations",
    ],
    impact: "Will inform national digital education policy affecting 180,000+ teachers",
  },
  {
    id: 2,
    title: "Competence-Based Curriculum Implementation Study",
    description:
      "Longitudinal research examining the effectiveness of competence-based curriculum implementation in Tanzanian primary schools.",
    leader: "Dr. Ignasia Mligo",
    stage: "Analysis",
    progress: 78,
    startDate: "2023-03-10",
    expectedCompletion: "2024-07-15",
    funding: "$62,000",
    collaborators: ["UDOM", "Tanzania Institute of Education"],
    expectedOutcomes: ["Implementation effectiveness report", "Best practices documentation", "Policy recommendations"],
    impact: "Direct impact on curriculum delivery for 8.5M primary school students",
  },
  {
    id: 3,
    title: "Cross-Cultural Teaching Methodologies",
    description:
      "Comparative study of teaching methodologies between Austrian and Tanzanian educational systems to identify transferable best practices.",
    leader: "Prof. Dr. Heike Wendt",
    stage: "Planning",
    progress: 25,
    startDate: "2024-01-20",
    expectedCompletion: "2025-03-30",
    funding: "$38,000",
    collaborators: ["University of Graz", "Arusha Technical College"],
    expectedOutcomes: [
      "Cross-cultural methodology framework",
      "Teacher exchange program design",
      "Adaptation guidelines",
    ],
    impact: "Will enhance international collaboration in teacher training programs",
  },
  {
    id: 4,
    title: "Rural Education Technology Integration",
    description:
      "Research on effective strategies for integrating educational technology in rural Tanzanian schools with limited infrastructure.",
    leader: "Dr. Labani Kanyonga",
    stage: "Data Collection",
    progress: 55,
    startDate: "2023-11-05",
    expectedCompletion: "2024-12-20",
    funding: "$52,000",
    collaborators: ["Vodacom Foundation", "Rural Schools Network"],
    expectedOutcomes: ["Technology integration model", "Infrastructure requirements guide", "Teacher training modules"],
    impact: "Will benefit 450+ rural schools and 25,000+ students",
  },
  {
    id: 5,
    title: "Teacher Professional Development Impact Assessment",
    description:
      "Evaluation of the long-term impact of professional development programs on teacher performance and student outcomes.",
    leader: "Dr. Abdallah Seni",
    stage: "Completed",
    progress: 100,
    startDate: "2022-09-15",
    expectedCompletion: "2024-02-28",
    funding: "$41,000",
    collaborators: ["Teachers Service Commission", "UNICEF Tanzania"],
    expectedOutcomes: ["Impact assessment report", "ROI analysis of PD programs", "Scaling recommendations"],
    impact: "Influenced national teacher development policy affecting 200,000+ teachers",
  },
  {
    id: 6,
    title: "STEM Education Gender Gap Analysis",
    description:
      "Comprehensive analysis of gender disparities in STEM education and development of intervention strategies to promote female participation.",
    leader: "Dr. Naisujaki Lyimo",
    stage: "Analysis",
    progress: 70,
    startDate: "2023-06-01",
    expectedCompletion: "2024-10-15",
    funding: "$48,000",
    collaborators: ["UN Women", "Tanzania Women Scientists"],
    expectedOutcomes: ["Gender gap analysis report", "Intervention strategy framework", "Mentorship program design"],
    impact: "Will support 10,000+ female students in STEM pathways",
  },
]

// Expertise Areas Data
const expertiseAreas = [
  {
    id: 1,
    title: "Data Science & Statistics",
    icon: Database,
    description: "Advanced statistical analysis, machine learning, and data visualization for educational research.",
    keyContributors: [
      { name: "Dr. Anna Aleksanyan", expertise: "Statistical Modeling, Survey Design" },
      { name: "Dr. Ignasia Mligo", expertise: "Educational Data Mining, Predictive Analytics" },
      { name: "Dr. Labani Kanyonga", expertise: "Quantitative Research Methods, Data Visualization" },
    ],
    projects: 15,
    tools: ["R", "Python", "SPSS", "Tableau", "Power BI"],
    recentAchievements: [
      "Published 8 peer-reviewed papers on educational statistics",
      "Developed predictive models for student performance",
      "Created interactive dashboards for policy makers",
    ],
    color: "from-blue-500 to-blue-600",
    lightColor: "from-blue-50 to-blue-100",
    darkColor: "from-blue-900/20 to-blue-800/30",
  },
  {
    id: 2,
    title: "Environmental Studies",
    icon: Leaf,
    description:
      "Environmental impact assessment, sustainability research, and climate change adaptation in education.",
    keyContributors: [
      { name: "Dr. Alcuin Mwalongo", expertise: "Environmental Education, Sustainability" },
      { name: "Dr. Naisujaki Lyimo", expertise: "Climate Change Adaptation, Green Schools" },
      { name: "Dr. Nicodemus Mbwambo", expertise: "Environmental Policy, Resource Management" },
    ],
    projects: 12,
    tools: ["GIS", "Remote Sensing", "Environmental Modeling", "Field Equipment"],
    recentAchievements: [
      "Established 25 green school initiatives",
      "Conducted environmental impact assessments for 50+ schools",
      "Developed climate-resilient education infrastructure guidelines",
    ],
    color: "from-green-500 to-green-600",
    lightColor: "from-green-50 to-green-100",
    darkColor: "from-green-900/20 to-green-800/30",
  },
  {
    id: 3,
    title: "ICT & Innovation",
    icon: Cpu,
    description: "Educational technology integration, digital innovation, and ICT infrastructure development.",
    keyContributors: [
      { name: "Prof. Dr. Heike Wendt", expertise: "Educational Technology, Digital Pedagogy" },
      { name: "Dr. Luka Mkonongwa", expertise: "ICT Infrastructure, Digital Literacy" },
      { name: "Dr. Abdallah Seni", expertise: "Innovation Management, Tech Integration" },
    ],
    projects: 18,
    tools: ["Learning Management Systems", "Mobile Apps", "Cloud Platforms", "IoT Devices"],
    recentAchievements: [
      "Deployed digital learning platforms in 100+ schools",
      "Trained 5,000+ teachers in digital tools",
      "Developed mobile learning applications",
    ],
    color: "from-purple-500 to-purple-600",
    lightColor: "from-purple-50 to-purple-100",
    darkColor: "from-purple-900/20 to-purple-800/30",
  },
  {
    id: 4,
    title: "Engineering & Technical Research",
    icon: Wrench,
    description:
      "Technical education research, engineering solutions, and infrastructure development for educational institutions.",
    keyContributors: [
      { name: "Dr. Abdallah Seni", expertise: "Technical Education, Engineering Solutions" },
      { name: "Dr. Alcuin Mwalongo", expertise: "Infrastructure Development, Project Management" },
      { name: "Dr. Labani Kanyonga", expertise: "Technical Training, Equipment Design" },
    ],
    projects: 10,
    tools: ["CAD Software", "Project Management Tools", "Technical Equipment", "Simulation Software"],
    recentAchievements: [
      "Designed technical training facilities for 15 institutions",
      "Developed equipment maintenance protocols",
      "Created technical curriculum frameworks",
    ],
    color: "from-orange-500 to-orange-600",
    lightColor: "from-orange-50 to-orange-100",
    darkColor: "from-orange-900/20 to-orange-800/30",
  },
]

// Research Milestones
const researchMilestones = [
  {
    date: "2023-01-15",
    title: "Project Initiation",
    description: "STEP Study research project officially launched with international partnerships",
    status: "completed",
  },
  {
    date: "2023-06-30",
    title: "Phase 1 Data Collection",
    description: "Completed baseline data collection across all 8 zones",
    status: "completed",
  },
  {
    date: "2023-12-15",
    title: "Mid-term Review",
    description: "Comprehensive review of progress and methodology adjustments",
    status: "completed",
  },
  {
    date: "2024-03-30",
    title: "Phase 2 Analysis",
    description: "Advanced statistical analysis and preliminary findings",
    status: "completed",
  },
  {
    date: "2024-08-15",
    title: "Policy Recommendations",
    description: "Development of evidence-based policy recommendations",
    status: "current",
  },
  {
    date: "2024-12-31",
    title: "Final Report",
    description: "Comprehensive final report and dissemination",
    status: "upcoming",
  },
]

const stageColors = {
  Planning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Data Collection": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Analysis: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
}

const stageIcons = {
  Planning: PlayCircle,
  "Data Collection": Activity,
  Analysis: TrendingUp,
  Completed: CheckCircle,
}

export default function ResearchProgressClient() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId && !visibleSections.includes(sectionId)) {
              setVisibleSections((prev) => [...prev, sectionId])
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleSections])

  const setSectionRef = (sectionId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[sectionId] = el
  }

  const getOverallProgress = (zone: (typeof zonalData)[0]) => {
    return Math.round((zone.dataCollection + zone.analysis + zone.reporting) / 3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/research" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Research
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Progress & Expertise</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Research Progress & Expertise
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Comprehensive overview of our research progress across Tanzanian zones, ongoing tutor projects, and the
            expertise that drives our educational research initiatives.
          </p>
        </div>

        {/* Zonal Statistics Research Progress */}
        <section
          ref={setSectionRef("zonal")}
          data-section="zonal"
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.includes("zonal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Zonal Statistics Research Progress
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Track the progress of our comprehensive research across Tanzania's eight zones, covering data collection,
              analysis, and reporting phases.
            </p>
          </div>

          {/* Zone Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {zonalData.map((zone, index) => (
              <Card
                key={zone.id}
                className={`cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedZone === zone.id ? "ring-2 ring-blue-500" : ""
                } ${visibleSections.includes("zonal") ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              >
                <CardHeader className={`bg-gradient-to-r ${zone.color} text-white rounded-t-lg`}>
                  <CardTitle className="text-lg font-bold">{zone.name}</CardTitle>
                  <div className="text-sm opacity-90">Population: {zone.population}</div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Coordinator:</strong> {zone.coordinator}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-semibold">{getOverallProgress(zone)}%</span>
                      </div>
                      <Progress value={getOverallProgress(zone)} className="h-2" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Expected completion: {new Date(zone.completionDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Zone Information */}
          {selectedZone && (
            <Card className="mb-8 border-0 shadow-xl animate-fade-in">
              {(() => {
                const zone = zonalData.find((z) => z.id === selectedZone)!
                return (
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {zone.name} - Detailed Progress
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Data Collection</span>
                              <span className="text-sm font-semibold">{zone.dataCollection}%</span>
                            </div>
                            <Progress value={zone.dataCollection} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Analysis</span>
                              <span className="text-sm font-semibold">{zone.analysis}%</span>
                            </div>
                            <Progress value={zone.analysis} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Reporting</span>
                              <span className="text-sm font-semibold">{zone.reporting}%</span>
                            </div>
                            <Progress value={zone.reporting} className="h-3" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Regions Covered</h4>
                            <div className="flex flex-wrap gap-2">
                              {zone.regions.map((region) => (
                                <Badge key={region} variant="secondary">
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Key Economic Activities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {zone.keyActivities.map((activity) => (
                                <Badge
                                  key={activity}
                                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                >
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Major Resources</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {zone.resources.map((resource, idx) => (
                                <li key={idx} className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )
              })()}
            </Card>
          )}

          {/* Research Milestones Timeline */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Research Milestones & Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {researchMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "current"
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h4>
                        <Badge
                          variant={
                            milestone.status === "completed"
                              ? "default"
                              : milestone.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{milestone.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(milestone.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tutor Projects */}
        <section
          ref={setSectionRef("projects")}
          data-section="projects"
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.includes("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Tutor Projects</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Academic and practical projects led by our experienced tutors and lecturers, driving innovation in
              educational research and practice.
            </p>
          </div>

          {/* Project Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Projects</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">$286K</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Funding</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Collaborating Organizations</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">400K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">People Impacted</div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tutorProjects.map((project, index) => {
              const StageIcon = stageIcons[project.stage as keyof typeof stageIcons]
              return (
                <Card
                  key={project.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    visibleSections.includes("projects") ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={stageColors[project.stage as keyof typeof stageColors]}>
                        <StageIcon className="h-3 w-3 mr-1" />
                        {project.stage}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{project.funding}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Led by <strong>{project.leader}</strong>
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{project.description}</p>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span className="font-semibold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Started:</span>
                          <div className="font-medium">{new Date(project.startDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Expected:</span>
                          <div className="font-medium">{new Date(project.expectedCompletion).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          Collaborating Organizations
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.collaborators.map((collab) => (
                            <Badge key={collab} variant="outline" className="text-xs">
                              {collab}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Expected Outcomes</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {project.expectedOutcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 text-sm">Expected Impact</h4>
                        <p className="text-xs text-blue-800 dark:text-blue-200">{project.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Expertise & Contributions */}
        <section
          ref={setSectionRef("expertise")}
          data-section="expertise"
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.includes("expertise") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Expertise & Contributions
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our multidisciplinary team brings together diverse expertise areas to drive innovation in educational
              research and development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <Card
                  key={area.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    visibleSections.includes("expertise") ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className={`bg-gradient-to-r ${area.color} text-white rounded-t-lg`}>
                    <div className="flex items-center mb-2">
                      <IconComponent className="h-8 w-8 mr-3" />
                      <CardTitle className="text-xl font-bold">{area.title}</CardTitle>
                    </div>
                    <p className="text-sm opacity-90">{area.description}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Key Contributors */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Key Contributors
                        </h4>
                        <div className="space-y-2">
                          {area.keyContributors.map((contributor, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="font-medium text-gray-900 dark:text-white text-sm">
                                {contributor.name}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">{contributor.expertise}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Project Statistics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{area.projects}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">Active Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{area.tools.length}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">Tools & Technologies</div>
                        </div>
                      </div>

                      {/* Tools & Technologies */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          Tools & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {area.tools.map((tool) => (
                            <Badge key={tool} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Recent Achievements */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Recent Achievements
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {area.recentAchievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Collaboration Call-to-Action */}
        <section className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-12">
              <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join our research initiatives and contribute to transforming education across Tanzania. We welcome
                partnerships, consultations, and collaborative research opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Research Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
              <div className="mt-8 text-sm opacity-75">
                <p>Email: research@stepstudy.org | Phone: +255 123 456 789</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
