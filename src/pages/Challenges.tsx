
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChallengeCard, { ChallengeProps } from "@/components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Sample challenges data
const challengesData: ChallengeProps[] = [
  {
    id: "1",
    title: "Customer Churn Analysis",
    description: "Analyze customer data to identify key factors contributing to churn. Create visualizations to present your findings.",
    difficulty: "Beginner",
    duration: 60,
    participants: 324
  },
  {
    id: "2",
    title: "Sales Forecasting",
    description: "Use historical sales data to forecast future sales. Identify seasonal patterns and trends.",
    difficulty: "Intermediate",
    duration: 90,
    participants: 218
  },
  {
    id: "3",
    title: "Health Outcomes Prediction",
    description: "Analyze patient data and identify risk factors for specific health conditions.",
    difficulty: "Advanced",
    duration: 120,
    participants: 156
  },
  {
    id: "4",
    title: "Marketing Campaign Analysis",
    description: "Evaluate the effectiveness of different marketing campaigns and identify the best-performing channels.",
    difficulty: "Beginner",
    duration: 45,
    participants: 287
  },
  {
    id: "5",
    title: "Supply Chain Optimization",
    description: "Analyze supply chain data to identify bottlenecks and suggest improvements.",
    difficulty: "Intermediate",
    duration: 75,
    participants: 189
  },
  {
    id: "6",
    title: "Financial Fraud Detection",
    description: "Identify patterns in transaction data that might indicate fraudulent activity.",
    difficulty: "Advanced",
    duration: 120,
    participants: 143
  },
  {
    id: "7",
    title: "Customer Segmentation",
    description: "Segment customers based on their purchasing behavior and demographics.",
    difficulty: "Intermediate",
    duration: 90,
    participants: 231
  },
  {
    id: "8",
    title: "Product Recommendation Analysis",
    description: "Analyze purchase history to create product recommendations for customers.",
    difficulty: "Beginner",
    duration: 60,
    participants: 298
  },
  {
    id: "9",
    title: "Pricing Strategy Optimization",
    description: "Analyze sales data to determine optimal pricing strategies for different products.",
    difficulty: "Advanced",
    duration: 105,
    participants: 125
  }
];

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter challenges based on search query and filters
  const filteredChallenges = challengesData.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "all" || challenge.difficulty === difficultyFilter;
    
    const matchesDuration = durationFilter === "all" || 
                           (durationFilter === "short" && challenge.duration <= 60) ||
                           (durationFilter === "medium" && challenge.duration > 60 && challenge.duration <= 90) ||
                           (durationFilter === "long" && challenge.duration > 90);
    
    return matchesSearch && matchesDifficulty && matchesDuration;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Data Analysis Challenges</h1>
          
          {/* Search and filters */}
          <div className="mb-8 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={durationFilter}
              onValueChange={setDurationFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">Short (≤ 60 min)</SelectItem>
                <SelectItem value="medium">Medium (61-90 min)</SelectItem>
                <SelectItem value="long">Long (> 90 min)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-6">
              {filteredChallenges.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No challenges found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges
                  .sort((a, b) => b.participants - a.participants)
                  .slice(0, 6)
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="newest" className="pt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges
                  .slice()
                  .reverse()
                  .slice(0, 6)
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">Sign in to view your completed challenges.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
