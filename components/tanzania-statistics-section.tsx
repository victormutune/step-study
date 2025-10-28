import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Gem } from "lucide-react"

const tanzaniaZones = [
  {
    id: 1,
    zone: "Northern Zone",
    regions: ["Arusha", "Kilimanjaro", "Manyara", "Tanga"],
    population: "7.2 million",
    populationGrowth: "2.8%",
    keyEconomicActivities: [
      "Tourism and wildlife conservation",
      "Coffee and tea production",
      "Horticulture and floriculture",
      "Mining (gemstones)",
    ],
    majorResources: [
      "Mount Kilimanjaro",
      "Serengeti National Park",
      "Ngorongoro Crater",
      "Tanzanite deposits",
      "Agricultural land",
    ],
    urbanization: "28%",
    literacyRate: "78%",
  },
  {
    id: 2,
    zone: "Central Zone",
    regions: ["Dodoma", "Singida"],
    population: "3.1 million",
    populationGrowth: "2.4%",
    keyEconomicActivities: [
      "Livestock keeping",
      "Sunflower and groundnut farming",
      "Government administration",
      "Small-scale mining",
    ],
    majorResources: [
      "Livestock (cattle, goats)",
      "Sunflower oil production",
      "Government institutions",
      "Semi-arid grazing land",
    ],
    urbanization: "22%",
    literacyRate: "71%",
  },
  {
    id: 3,
    zone: "Western Zone",
    regions: ["Tabora", "Kigoma", "Katavi", "Rukwa"],
    population: "4.8 million",
    populationGrowth: "2.6%",
    keyEconomicActivities: ["Tobacco farming", "Fishing (Lake Tanganyika)", "Honey production", "Cross-border trade"],
    majorResources: ["Lake Tanganyika", "Tobacco plantations", "Forest reserves", "Freshwater fisheries"],
    urbanization: "18%",
    literacyRate: "68%",
  },
  {
    id: 4,
    zone: "Lake Zone",
    regions: ["Mwanza", "Shinyanga", "Kagera", "Mara", "Simiyu", "Geita"],
    population: "9.4 million",
    populationGrowth: "3.1%",
    keyEconomicActivities: ["Gold mining", "Cotton production", "Fishing (Lake Victoria)", "Rice cultivation"],
    majorResources: ["Lake Victoria", "Gold deposits", "Cotton fields", "Freshwater fisheries", "Agricultural land"],
    urbanization: "25%",
    literacyRate: "74%",
  },
  {
    id: 5,
    zone: "Southern Zone",
    regions: ["Mtwara", "Lindi", "Ruvuma"],
    population: "3.9 million",
    populationGrowth: "2.2%",
    keyEconomicActivities: ["Cashew nut production", "Natural gas extraction", "Sesame farming", "Coastal fishing"],
    majorResources: ["Natural gas reserves", "Cashew plantations", "Indian Ocean coastline", "Sesame crops"],
    urbanization: "20%",
    literacyRate: "69%",
  },
  {
    id: 6,
    zone: "Southern Highlands",
    regions: ["Iringa", "Njombe", "Mbeya", "Songwe"],
    population: "5.6 million",
    populationGrowth: "2.5%",
    keyEconomicActivities: [
      "Tea and coffee production",
      "Maize and wheat farming",
      "Pyrethrum cultivation",
      "Hydroelectric power",
    ],
    majorResources: ["Highland climate", "Tea estates", "Hydroelectric potential", "Fertile volcanic soils"],
    urbanization: "24%",
    literacyRate: "76%",
  },
  {
    id: 7,
    zone: "Coastal Zone",
    regions: ["Dar es Salaam", "Pwani", "Morogoro"],
    population: "8.7 million",
    populationGrowth: "4.2%",
    keyEconomicActivities: [
      "Port operations and trade",
      "Manufacturing industries",
      "Financial services",
      "Coconut and cashew farming",
    ],
    majorResources: ["Dar es Salaam Port", "Indian Ocean access", "Industrial infrastructure", "Commercial centers"],
    urbanization: "68%",
    literacyRate: "85%",
  },
  {
    id: 8,
    zone: "Eastern Zone",
    regions: ["Manyara (part)", "Morogoro (part)"],
    population: "2.3 million",
    populationGrowth: "2.3%",
    keyEconomicActivities: ["Livestock keeping", "Maize and rice farming", "Small-scale trading", "Beekeeping"],
    majorResources: ["Grazing land", "Water sources", "Agricultural potential", "Livestock corridors"],
    urbanization: "16%",
    literacyRate: "65%",
  },
]

export default function TanzaniaStatisticsSection() {
  const totalPopulation = tanzaniaZones.reduce((sum, zone) => {
    const pop = Number.parseFloat(zone.population.replace(" million", ""))
    return sum + pop
  }, 0)

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tanzania Zonal Statistics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Comprehensive demographic and economic data across Tanzania's administrative zones, supporting
            evidence-based research and policy development.
          </p>

          {/* Summary Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Administrative Zones</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalPopulation.toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Population</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">31</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Administrative Regions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tanzaniaZones.map((zone) => (
            <Card
              key={zone.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{zone.zone}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {zone.regions.length} regions
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{zone.regions.join(", ")}</div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Demographics */}
                <div>
                  <div className="flex items-center mb-3">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Demographics</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Population</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{zone.population}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Growth Rate</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{zone.populationGrowth}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Urbanization</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{zone.urbanization}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Literacy Rate</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{zone.literacyRate}</div>
                    </div>
                  </div>
                </div>

                {/* Economic Activities */}
                <div>
                  <div className="flex items-center mb-3">
                    <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Key Economic Activities</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {zone.keyEconomicActivities.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Major Resources */}
                <div>
                  <div className="flex items-center mb-3">
                    <Gem className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Major Resources</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {zone.majorResources.map((resource, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Source Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Sources & Methodology</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Statistical data compiled from Tanzania National Bureau of Statistics (NBS), Ministry of Finance and
              Planning, and regional development reports. Population estimates based on 2012 Census projections and
              annual growth rates. Economic activity data sourced from sectoral surveys and administrative records.
              <span className="font-medium"> Last updated: 2024</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
