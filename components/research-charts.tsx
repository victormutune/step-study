"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { MapPin, Award, Calendar, Users, TrendingUp, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResearchChartsProps {
  isVisible: boolean
}

export default function ResearchCharts({ isVisible }: ResearchChartsProps) {
  const router = useRouter()

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

    // Redirect to login
    router.push("/login")
  }

  // Custom tooltip component for clickable charts
  const ClickableTooltip = ({ active, payload, label }: any) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Zonal Research Progress */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
        transition={{ delay: 0.2 }}
      >
        <div className="cursor-pointer" onClick={() => handleChartClick("zonal-progress")}>
          <Card className="hover:shadow-xl transition-all duration-300 group">
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
                    <Tooltip content={<ClickableTooltip />} />
                    <Bar dataKey="completed" fill="var(--color-completed)" />
                    <Bar dataKey="ongoing" fill="var(--color-ongoing)" />
                    <Bar dataKey="planned" fill="var(--color-planned)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Research Milestone Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="cursor-pointer" onClick={() => handleChartClick("milestone-distribution")}>
          <Card className="hover:shadow-xl transition-all duration-300 group">
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
                    <Tooltip content={<ClickableTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Project Timeline Progress */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
        transition={{ delay: 0.4 }}
      >
        <div className="cursor-pointer" onClick={() => handleChartClick("timeline-progress")}>
          <Card className="hover:shadow-xl transition-all duration-300 group">
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
                    <Tooltip content={<ClickableTooltip />} />
                    <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" strokeWidth={3} />
                    <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Researchers by Expertise */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        transition={{ delay: 0.5 }}
      >
        <div className="cursor-pointer" onClick={() => handleChartClick("researchers-expertise")}>
          <Card className="hover:shadow-xl transition-all duration-300 group">
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
                    <Tooltip content={<ClickableTooltip />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Active Projects by Area - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.6 }}
        className="lg:col-span-2"
      >
        <div className="cursor-pointer" onClick={() => handleChartClick("projects-by-area")}>
          <Card className="hover:shadow-xl transition-all duration-300 group">
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
                    <Tooltip content={<ClickableTooltip />} />
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
        </div>
      </motion.div>
    </div>
  )
}
