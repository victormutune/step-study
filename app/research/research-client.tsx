"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Clock, Users, MapPin, TrendingUp, Calendar, Award, BookOpen, Target, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

// Access Tool Modal Component
const AccessToolModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Research Data Access Tools</h2>
                  <p className="text-blue-100">Advanced analytics and data visualization platform</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* KoboToolbox Integration */}
              <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">KoboToolbox Integration</h3>
                    <p className="text-gray-600 dark:text-gray-400">Real-time data collection and analysis platform</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our integrated KoboToolbox platform enables real-time data collection, survey management, and
                  automated analysis for the STEP-STUDY research project across all participating zones in Tanzania.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Real-time Sync</Badge>
                  <Badge variant="secondary">Mobile Data Collection</Badge>
                  <Badge variant="secondary">Automated Reports</Badge>
                  <Badge variant="secondary">Multi-language Support</Badge>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <BarChart className="w-6 h-6" />,
                    title: "Advanced Analytics",
                    description: "Deep statistical analysis and trend identification",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Geographic Mapping",
                    description: "Interactive maps with zone-specific data visualization",
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: "Participant Tracking",
                    description: "Comprehensive participant management and follow-up",
                  },
                  {
                    icon: <Calendar className="w-6 h-6" />,
                    title: "Timeline Management",
                    description: "Project milestone tracking and scheduling",
                  },
                  {
                    icon: <BookOpen className="w-6 h-6" />,
                    title: "Research Documentation",
                    description: "Automated report generation and documentation",
                  },
                  {
                    icon: <Target className="w-6 h-6" />,
                    title: "Goal Tracking",
                    description: "Progress monitoring against research objectives",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3 text-white">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Access Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Access Requirements</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Registered researcher account
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Institutional affiliation verification
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Data usage agreement acceptance
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Request Access
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Learn More
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Coming Soon Button Component
const ComingSoonButton = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl"
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/50 via-purple-400/50 to-pink-400/50 rounded-2xl blur-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative flex items-center space-x-3">
          <span>Access Tools Coming Soon</span>

          {/* Bouncing Dots */}
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Spinning Clock Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Clock className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function ResearchClient() {
  const [showAccessModal, setShowAccessModal] = useState(false)
  const router = useRouter()

  // Show access modal after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAccessModal(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Sample data for charts
  const zonalData = [
    { zone: "Northern", completed: 85, ongoing: 12, planned: 3 },
    { zone: "Central", completed: 72, ongoing: 18, planned: 10 },
    { zone: "Southern", completed: 68, ongoing: 22, planned: 10 },
    { zone: "Eastern", completed: 79, ongoing: 15, planned: 6 },
    { zone: "Western", completed: 63, ongoing: 25, planned: 12 },
  ]

  const milestoneData = [
    { name: "Planning", value: 25, color: "#3B82F6" },
    { name: "Data Collection", value: 35, color: "#10B981" },
    { name: "Analysis", value: 20, color: "#F59E0B" },
    { name: "Reporting", value: 15, color: "#EF4444" },
    { name: "Dissemination", value: 5, color: "#8B5CF6" },
  ]

  const timelineData = [
    { month: "Jan", planned: 20, actual: 18 },
    { month: "Feb", planned: 35, actual: 32 },
    { month: "Mar", planned: 50, actual: 48 },
    { month: "Apr", planned: 65, actual: 62 },
    { month: "May", planned: 80, actual: 75 },
    { month: "Jun", planned: 90, actual: 85 },
  ]

  const expertiseData = [
    { expertise: "Epidemiology", count: 12 },
    { expertise: "Biostatistics", count: 8 },
    { expertise: "Public Health", count: 15 },
    { expertise: "Clinical Research", count: 10 },
    { expertise: "Data Science", count: 6 },
  ]

  const projectAreaData = [
    { month: "Jan", infectious: 5, chronic: 3, maternal: 2 },
    { month: "Feb", infectious: 7, chronic: 4, maternal: 3 },
    { month: "Mar", infectious: 9, chronic: 5, maternal: 4 },
    { month: "Apr", infectious: 11, chronic: 6, maternal: 5 },
    { month: "May", infectious: 13, chronic: 7, maternal: 6 },
    { month: "Jun", infectious: 15, chronic: 8, maternal: 7 },
  ]

  // Handle chart clicks
  const handleChartClick = (chartType: string) => {
    // Store the chart selection in sessionStorage
    sessionStorage.setItem("selectedChart", chartType)
    sessionStorage.setItem("redirectedFromChart", "true")

    // Redirect to login with chart parameter
    router.push("/login?redirect=research-details&chart=" + chartType)
  }

  // Custom tooltip component for clickable charts
  const ClickableTooltip = ({ active, payload, label, chartType }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Click to view detailed data
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Research Progress</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive overview of STEP-STUDY research activities, milestones, and achievements across Tanzania
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Calendar className="w-4 h-4 mr-2" />
                Updated Daily
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="w-4 h-4 mr-2" />5 Research Zones
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Award className="w-4 h-4 mr-2" />
                51+ Researchers
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Button */}
        <ComingSoonButton />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Projects", value: "47", icon: <Target className="w-6 h-6" />, color: "blue" },
            { title: "Active Researchers", value: "51", icon: <Users className="w-6 h-6" />, color: "green" },
            { title: "Research Zones", value: "5", icon: <MapPin className="w-6 h-6" />, color: "purple" },
            { title: "Completion Rate", value: "73%", icon: <TrendingUp className="w-6 h-6" />, color: "orange" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                      <div className={`text-${metric.color}-600 dark:text-${metric.color}-400`}>{metric.icon}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Zonal Research Progress */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleChartClick("zonal-progress")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Zonal Research Progress
                    </CardTitle>
                    <CardDescription>Progress status across research zones</CardDescription>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: { label: "Completed", color: "hsl(var(--chart-1))" },
                    ongoing: { label: "Ongoing", color: "hsl(var(--chart-2))" },
                    planned: { label: "Planned", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={zonalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="zone" />
                      <YAxis />
                      <Tooltip content={<ClickableTooltip chartType="zonal-progress" />} />
                      <Bar dataKey="completed" fill="var(--color-completed)" />
                      <Bar dataKey="ongoing" fill="var(--color-ongoing)" />
                      <Bar dataKey="planned" fill="var(--color-planned)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Research Milestone Distribution */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleChartClick("milestone-distribution")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      Research Milestone Distribution
                    </CardTitle>
                    <CardDescription>Current phase distribution of projects</CardDescription>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    planning: { label: "Planning", color: "#3B82F6" },
                    collection: { label: "Data Collection", color: "#10B981" },
                    analysis: { label: "Analysis", color: "#F59E0B" },
                    reporting: { label: "Reporting", color: "#EF4444" },
                    dissemination: { label: "Dissemination", color: "#8B5CF6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={milestoneData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {milestoneData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<ClickableTooltip chartType="milestone-distribution" />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Timeline Progress */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleChartClick("timeline-progress")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      Project Timeline Progress
                    </CardTitle>
                    <CardDescription>Planned vs actual progress over time</CardDescription>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    planned: { label: "Planned", color: "hsl(var(--chart-1))" },
                    actual: { label: "Actual", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ClickableTooltip chartType="timeline-progress" />} />
                      <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" strokeWidth={3} />
                      <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Researchers by Expertise */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleChartClick("researchers-expertise")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      Researchers by Expertise
                    </CardTitle>
                    <CardDescription>Distribution of research expertise</CardDescription>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Researchers", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expertiseData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="expertise" type="category" width={100} />
                      <Tooltip content={<ClickableTooltip chartType="researchers-expertise" />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Projects by Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card
            className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleChartClick("projects-by-area")}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Active Projects by Research Area
                  </CardTitle>
                  <CardDescription>Monthly progression of projects across different research areas</CardDescription>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  infectious: { label: "Infectious Diseases", color: "hsl(var(--chart-1))" },
                  chronic: { label: "Chronic Diseases", color: "hsl(var(--chart-2))" },
                  maternal: { label: "Maternal Health", color: "hsl(var(--chart-3))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectAreaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ClickableTooltip chartType="projects-by-area" />} />
                    <Area
                      type="monotone"
                      dataKey="infectious"
                      stackId="1"
                      stroke="var(--color-infectious)"
                      fill="var(--color-infectious)"
                    />
                    <Area
                      type="monotone"
                      dataKey="chronic"
                      stackId="1"
                      stroke="var(--color-chronic)"
                      fill="var(--color-chronic)"
                    />
                    <Area
                      type="monotone"
                      dataKey="maternal"
                      stackId="1"
                      stroke="var(--color-maternal)"
                      fill="var(--color-maternal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Research Impact Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Research Impact & Achievements</CardTitle>
              <CardDescription className="text-center">
                Key outcomes and milestones achieved through STEP-STUDY
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
                  <div className="text-gray-600 dark:text-gray-400">Participants Enrolled</div>
                  <Progress value={85} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">23</div>
                  <div className="text-gray-600 dark:text-gray-400">Publications</div>
                  <Progress value={92} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">15</div>
                  <div className="text-gray-600 dark:text-gray-400">Policy Recommendations</div>
                  <Progress value={75} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Access Tool Modal */}
      <AccessToolModal isOpen={showAccessModal} onClose={() => setShowAccessModal(false)} />
    </div>
  )
}
