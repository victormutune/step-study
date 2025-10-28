"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  TrendingUp,
  ArrowLeft,
  Download,
  Share2,
  RefreshCw,
  BarChart3,
  Activity,
  Target,
  Clock,
  Database,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResearchDetailsPage() {
  const [selectedChart, setSelectedChart] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userAuth = sessionStorage.getItem("userAuthenticated")
    if (userAuth !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)

    // Get selected chart
    const chart = sessionStorage.getItem("selectedChart")
    if (chart) {
      setSelectedChart(chart)
    }
  }, [router])

  // Detailed data for each chart type
  const detailedData = {
    "zonal-progress": {
      title: "Zonal Research Progress Analysis",
      description: "Comprehensive breakdown of research activities across all zones",
      data: [
        { zone: "Northern", completed: 85, ongoing: 12, planned: 3, total: 100, efficiency: 92 },
        { zone: "Central", completed: 72, ongoing: 18, planned: 10, total: 100, efficiency: 85 },
        { zone: "Southern", completed: 68, ongoing: 22, planned: 10, total: 100, efficiency: 82 },
        { zone: "Eastern", completed: 79, ongoing: 15, planned: 6, total: 100, efficiency: 88 },
        { zone: "Western", completed: 63, ongoing: 25, planned: 12, total: 100, efficiency: 78 },
      ],
      insights: [
        "Northern zone shows highest completion rate at 85%",
        "Western zone requires additional support with 63% completion",
        "Overall project efficiency averages 85% across all zones",
      ],
    },
    "milestone-distribution": {
      title: "Research Milestone Distribution",
      description: "Current phase distribution across all active projects",
      data: [
        { name: "Planning", value: 25, projects: 12, avgDuration: "2.3 months" },
        { name: "Data Collection", value: 35, projects: 17, avgDuration: "4.1 months" },
        { name: "Analysis", value: 20, projects: 10, avgDuration: "3.2 months" },
        { name: "Reporting", value: 15, projects: 7, avgDuration: "1.8 months" },
        { name: "Dissemination", value: 5, projects: 2, avgDuration: "2.5 months" },
      ],
      insights: [
        "35% of projects are in active data collection phase",
        "Analysis phase shows optimal resource allocation",
        "Dissemination phase needs acceleration for knowledge transfer",
      ],
    },
    "timeline-progress": {
      title: "Project Timeline Analysis",
      description: "Planned versus actual progress tracking over time",
      data: [
        { month: "Jan", planned: 20, actual: 18, variance: -2, efficiency: 90 },
        { month: "Feb", planned: 35, actual: 32, variance: -3, efficiency: 91 },
        { month: "Mar", planned: 50, actual: 48, variance: -2, efficiency: 96 },
        { month: "Apr", planned: 65, actual: 62, variance: -3, efficiency: 95 },
        { month: "May", planned: 80, actual: 75, variance: -5, efficiency: 94 },
        { month: "Jun", planned: 90, actual: 85, variance: -5, efficiency: 94 },
      ],
      insights: [
        "Consistent 94-96% efficiency in recent months",
        "Minor delays averaging 3-5% behind schedule",
        "Improvement trend observed from January to March",
      ],
    },
    "researchers-expertise": {
      title: "Researcher Expertise Distribution",
      description: "Breakdown of research team by specialization areas",
      data: [
        { expertise: "Epidemiology", count: 12, experience: "8.2 years", publications: 45 },
        { expertise: "Biostatistics", count: 8, experience: "6.8 years", publications: 32 },
        { expertise: "Public Health", count: 15, experience: "7.5 years", publications: 58 },
        { expertise: "Clinical Research", count: 10, experience: "9.1 years", publications: 41 },
        { expertise: "Data Science", count: 6, experience: "5.2 years", publications: 18 },
      ],
      insights: [
        "Public Health expertise represents largest team segment",
        "Clinical Research team has highest average experience",
        "Data Science team is newest but rapidly growing",
      ],
    },
    "projects-by-area": {
      title: "Research Areas Progress",
      description: "Monthly progression across different research focus areas",
      data: [
        { month: "Jan", infectious: 5, chronic: 3, maternal: 2, total: 10 },
        { month: "Feb", infectious: 7, chronic: 4, maternal: 3, total: 14 },
        { month: "Mar", infectious: 9, chronic: 5, maternal: 4, total: 18 },
        { month: "Apr", infectious: 11, chronic: 6, maternal: 5, total: 22 },
        { month: "May", infectious: 13, chronic: 7, maternal: 6, total: 26 },
        { month: "Jun", infectious: 15, chronic: 8, maternal: 7, total: 30 },
      ],
      insights: [
        "Infectious diseases research shows strongest growth trajectory",
        "Maternal health projects doubled from January to June",
        "Chronic diseases maintain steady 2-project monthly increase",
      ],
    },
  }

  const currentData = selectedChart ? detailedData[selectedChart as keyof typeof detailedData] : null

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/research"
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Research
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Research Analytics</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentData ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Chart Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentData.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">{currentData.description}</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <Database className="w-4 h-4 mr-1" />
                  Live Data
                </Badge>
              </div>

              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentData.insights.map((insight, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-sm text-blue-900 dark:text-blue-100">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Primary Data Visualization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          primary: { label: "Primary", color: "hsl(var(--chart-1))" },
                          secondary: { label: "Secondary", color: "hsl(var(--chart-2))" },
                          tertiary: { label: "Tertiary", color: "hsl(var(--chart-3))" },
                        }}
                        className="h-[400px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          {selectedChart === "milestone-distribution" ? (
                            <PieChart>
                              <Pie
                                data={currentData.data}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {currentData.data.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          ) : selectedChart === "timeline-progress" ? (
                            <LineChart data={currentData.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="planned" stroke="#3B82F6" strokeWidth={3} />
                              <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} />
                            </LineChart>
                          ) : selectedChart === "projects-by-area" ? (
                            <AreaChart data={currentData.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Area type="monotone" dataKey="infectious" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                              <Area type="monotone" dataKey="chronic" stackId="1" stroke="#10B981" fill="#10B981" />
                              <Area type="monotone" dataKey="maternal" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                            </AreaChart>
                          ) : (
                            <BarChart data={currentData.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={selectedChart === "researchers-expertise" ? "expertise" : "zone"} />
                              <YAxis />
                              <Tooltip />
                              <Bar
                                dataKey={selectedChart === "researchers-expertise" ? "count" : "completed"}
                                fill="#3B82F6"
                              />
                              {selectedChart !== "researchers-expertise" && (
                                <>
                                  <Bar dataKey="ongoing" fill="#10B981" />
                                  <Bar dataKey="planned" fill="#F59E0B" />
                                </>
                              )}
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Summary Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedChart === "zonal-progress" && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Average Completion</span>
                            <span className="font-semibold">73.4%</span>
                          </div>
                          <Progress value={73.4} className="h-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Projects</span>
                            <span className="font-semibold">500</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active Zones</span>
                            <span className="font-semibold">5</span>
                          </div>
                        </>
                      )}
                      {selectedChart === "researchers-expertise" && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Researchers</span>
                            <span className="font-semibold">51</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Experience</span>
                            <span className="font-semibold">7.4 years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Publications</span>
                            <span className="font-semibold">194</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        Recent Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm font-medium">Data collection completed in Northern zone</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm font-medium">New researcher joined Public Health team</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm font-medium">Analysis phase started for 3 projects</p>
                          <p className="text-xs text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Data Table</CardTitle>
                    <CardDescription>Complete breakdown of all data points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            {Object.keys(currentData.data[0]).map((key) => (
                              <th key={key} className="text-left p-3 font-medium text-gray-900 dark:text-white">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.data.map((row: any, index: number) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              {Object.values(row).map((value: any, cellIndex: number) => (
                                <td key={cellIndex} className="p-3 text-gray-700 dark:text-gray-300">
                                  {typeof value === "number" ? value.toLocaleString() : value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trend Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          trend: { label: "Trend", color: "hsl(var(--chart-1))" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={currentData.data.slice(0, 6)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={Object.keys(currentData.data[0])[0]} />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey={Object.keys(currentData.data[0])[1]}
                              stroke="#3B82F6"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Growth Rate</span>
                          <span className="text-sm font-medium text-green-600">+12.5%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Efficiency</span>
                          <span className="text-sm font-medium text-blue-600">94.2%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Quality Score</span>
                          <span className="text-sm font-medium text-purple-600">8.7/10</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Positive Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentData.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Increase resource allocation to underperforming zones
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Implement best practices from high-performing areas
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Schedule quarterly review meetings for progress tracking
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Chart Selected</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please select a chart from the research page to view detailed analytics.
              </p>
              <Link href="/research">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Research
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
