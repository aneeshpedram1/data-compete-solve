import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Sample data for leaderboard
const weeklyLeaderboardData = [
  { id: 1, name: "Alex Johnson", challenges: 12, points: 940, badge: "Data Wizard" },
  { id: 2, name: "Maria Garcia", challenges: 10, points: 860, badge: "Insight Master" },
  { id: 3, name: "David Chen", challenges: 9, points: 780, badge: "Pattern Spotter" },
  { id: 4, name: "Priya Patel", challenges: 8, points: 720, badge: "Analytics Pro" },
  { id: 5, name: "James Wilson", challenges: 7, points: 650, badge: "Data Explorer" },
  { id: 6, name: "Sarah Miller", challenges: 7, points: 610, badge: "Data Detective" },
  { id: 7, name: "Michael Brown", challenges: 6, points: 570, badge: "Insights Champion" },
  { id: 8, name: "Emma Rodriguez", challenges: 5, points: 490, badge: "Analytics Ace" },
  { id: 9, name: "Daniel Kim", challenges: 5, points: 460, badge: "Data Dynamo" },
  { id: 10, name: "Olivia Lee", challenges: 4, points: 420, badge: "Pattern Pioneer" }
];

const monthlyLeaderboardData = [
  { id: 1, name: "Alex Johnson", challenges: 42, points: 3840, badge: "Data Wizard" },
  { id: 2, name: "Maria Garcia", challenges: 38, points: 3560, badge: "Insight Master" },
  { id: 3, name: "David Chen", challenges: 35, points: 3250, badge: "Pattern Spotter" },
  { id: 4, name: "Priya Patel", challenges: 31, points: 2980, badge: "Analytics Pro" },
  { id: 5, name: "James Wilson", challenges: 29, points: 2760, badge: "Data Explorer" },
  { id: 6, name: "Sarah Miller", challenges: 27, points: 2590, badge: "Data Detective" },
  { id: 7, name: "Michael Brown", challenges: 26, points: 2470, badge: "Insights Champion" },
  { id: 8, name: "Emma Rodriguez", challenges: 24, points: 2340, badge: "Analytics Ace" },
  { id: 9, name: "Daniel Kim", challenges: 22, points: 2180, badge: "Data Dynamo" },
  { id: 10, name: "Olivia Lee", challenges: 20, points: 2050, badge: "Pattern Pioneer" }
];

const allTimeLeaderboardData = [
  { id: 1, name: "Alex Johnson", challenges: 183, points: 16840, badge: "Data Wizard" },
  { id: 2, name: "Maria Garcia", challenges: 172, points: 15560, badge: "Insight Master" },
  { id: 3, name: "David Chen", challenges: 158, points: 14250, badge: "Pattern Spotter" },
  { id: 4, name: "Priya Patel", challenges: 142, points: 12980, badge: "Analytics Pro" },
  { id: 5, name: "James Wilson", challenges: 136, points: 11760, badge: "Data Explorer" },
  { id: 6, name: "Sarah Miller", challenges: 129, points: 10590, badge: "Data Detective" },
  { id: 7, name: "Michael Brown", challenges: 118, points: 10470, badge: "Insights Champion" },
  { id: 8, name: "Emma Rodriguez", challenges: 105, points: 9340, badge: "Analytics Ace" },
  { id: 9, name: "Daniel Kim", challenges: 98, points: 8180, badge: "Data Dynamo" },
  { id: 10, name: "Olivia Lee", challenges: 92, points: 7050, badge: "Pattern Pioneer" }
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBadge, setFilterBadge] = useState("all");
  const { toast } = useToast();

  // Choose which dataset to use based on active tab
  const getLeaderboardData = () => {
    switch(activeTab) {
      case "weekly":
        return weeklyLeaderboardData;
      case "monthly":
        return monthlyLeaderboardData;
      case "allTime":
        return allTimeLeaderboardData;
      default:
        return monthlyLeaderboardData;
    }
  };

  // Filter leaderboard data based on search and badge filter
  const filteredLeaderboardData = getLeaderboardData().filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadge = filterBadge === "all" || person.badge === filterBadge;
    return matchesSearch && matchesBadge;
  });

  // Get unique badges for filter options
  const uniqueBadges = [...new Set([
    ...weeklyLeaderboardData.map(p => p.badge),
    ...monthlyLeaderboardData.map(p => p.badge),
    ...allTimeLeaderboardData.map(p => p.badge)
  ])];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  DataComp Leaderboard
                </h1>
                <p className="text-lg text-blue-100 mb-4">
                  See the top performers and how you rank among the community
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-0 inset-x-0 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-white">
              <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Analysts</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-yellow-500 mr-3" />
                  <h3 className="text-lg font-bold">Most Points</h3>
                </div>
                <p className="text-2xl font-bold mb-2">{allTimeLeaderboardData[0].name}</p>
                <p className="text-gray-600">{allTimeLeaderboardData[0].points.toLocaleString()} points</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-lg font-bold">Most Active</h3>
                </div>
                <p className="text-2xl font-bold mb-2">{allTimeLeaderboardData[0].name}</p>
                <p className="text-gray-600">{allTimeLeaderboardData[0].challenges} challenges completed</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-purple-500 mr-3" />
                  <h3 className="text-lg font-bold">Rising Star</h3>
                </div>
                <p className="text-2xl font-bold mb-2">{weeklyLeaderboardData[2].name}</p>
                <p className="text-gray-600">+{weeklyLeaderboardData[2].points} points this week</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="w-full md:w-64">
                <Input
                  type="text"
                  placeholder="Search analysts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select
                value={filterBadge}
                onValueChange={setFilterBadge}
              >
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filter by badge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Badges</SelectItem>
                  {uniqueBadges.map((badge) => (
                    <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="allTime">All Time</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Analyst</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Challenges</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Points</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredLeaderboardData.length > 0 ? (
                  filteredLeaderboardData.map((person, index) => (
                    <tr key={person.id} className={index === 0 ? "bg-yellow-50" : ""}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {index === 0 ? (
                          <span className="inline-flex items-center">
                            <Award className="h-5 w-5 text-yellow-500 mr-1" />
                            {index + 1}
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{person.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.challenges}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{person.points.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {person.badge}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-sm text-gray-500">
                      No analysts matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">How Points Are Calculated</h2>
            <p className="text-gray-600 mb-4">
              Points are earned based on the difficulty of challenges completed, the time taken to complete them, 
              and the quality of your analysis. Here's a breakdown:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><span className="font-semibold">Beginner challenges:</span> 50-100 points</li>
              <li><span className="font-semibold">Intermediate challenges:</span> 100-200 points</li>
              <li><span className="font-semibold">Advanced challenges:</span> 200-300 points</li>
              <li><span className="font-semibold">Time bonus:</span> Up to 50 additional points for fast completions</li>
              <li><span className="font-semibold">Quality bonus:</span> Up to 100 additional points for exceptional analysis</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
