
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChallengeCard, { ChallengeProps } from "@/components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, BarChart, Clock, Award, Database, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Sample data for challenges
const dummyChallenges: ChallengeProps[] = [
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
    title: "Market Basket Analysis",
    description: "Discover product associations and patterns in retail transaction data to improve store layout and recommendations.",
    difficulty: "Intermediate",
    duration: 75,
    participants: 187
  },
  {
    id: "5",
    title: "Sentiment Analysis Challenge",
    description: "Analyze customer reviews to determine sentiment and identify improvement opportunities.",
    difficulty: "Beginner",
    duration: 45,
    participants: 412
  },
  {
    id: "6",
    title: "Financial Fraud Detection",
    description: "Identify patterns and anomalies in transaction data to flag potentially fraudulent activities.",
    difficulty: "Advanced",
    duration: 120,
    participants: 132
  },
  {
    id: "7",
    title: "Supply Chain Optimization",
    description: "Analyze supply chain data to identify inefficiencies and recommend optimization strategies.",
    difficulty: "Intermediate",
    duration: 90,
    participants: 165
  },
  {
    id: "8",
    title: "Customer Segmentation",
    description: "Group customers into segments based on purchasing behavior and demographics.",
    difficulty: "Beginner",
    duration: 60,
    participants: 278
  },
  {
    id: "9",
    title: "Predictive Maintenance",
    description: "Use sensor data to predict equipment failures before they occur.",
    difficulty: "Advanced",
    duration: 105,
    participants: 142
  }
];

// Sample data for leaderboard
const leaderboardData = [
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

const fetchChallenges = async () => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*");
    
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        difficulty: task.difficulty === "beginner" ? "Beginner" : 
                  task.difficulty === "intermediate" ? "Intermediate" : "Advanced",
        duration: task.timer_duration,
        participants: Math.floor(Math.random() * 300) + 100
      }));
    } else {
      // Return dummy data if no data in Supabase
      console.log("No data found in Supabase, using dummy data");
      return dummyChallenges;
    }
  } catch (error) {
    console.error("Error fetching challenges:", error);
    // Return dummy data on error
    return dummyChallenges;
  }
};

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const { data: challenges = [], isLoading, isError } = useQuery({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
    meta: {
      onSettled: (data: any, error: Error | null) => {
        if (error) {
          console.error("Failed to fetch challenges:", error);
          toast({
            title: "Error",
            description: "Failed to load challenges. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }
  });

  // Filter challenges based on search query and filters
  const filteredChallenges = challenges.filter((challenge) => {
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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  Data Analysis Challenges
                </h1>
                <p className="text-lg text-blue-100 mb-4">
                  Test your skills with timed challenges on real datasets
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
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Find Your Challenge</h2>
            <p className="text-gray-600">Browse through our collection of data analysis challenges or use the filters to find one that matches your skill level.</p>
          </div>
          
          {/* Features section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Timed Challenges</h3>
              <p className="mt-2 text-gray-600">
                Test your skills under time pressure with our diverse range of timed challenges.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Real-world Datasets</h3>
              <p className="mt-2 text-gray-600">
                Practice with realistic data similar to what you'd encounter in industry.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Community Rankings</h3>
              <p className="mt-2 text-gray-600">
                Compare your solutions with others and climb the leaderboard.
              </p>
            </div>
          </div>
          
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
                <SelectItem value="long">Long (&gt; 90 min)</SelectItem>
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
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading challenges...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Failed to load challenges. Please try again later.</p>
                </div>
              ) : filteredChallenges.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard 
                      key={challenge.id}
                      id={challenge.id}
                      title={challenge.title}
                      description={challenge.description}
                      difficulty={challenge.difficulty as "Beginner" | "Intermediate" | "Advanced"}
                      duration={challenge.duration}
                      participants={challenge.participants}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No challenges found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="pt-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading challenges...</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges
                    .sort((a, b) => b.participants - a.participants)
                    .slice(0, 6)
                    .map((challenge) => (
                      <ChallengeCard 
                        key={challenge.id}
                        id={challenge.id}
                        title={challenge.title}
                        description={challenge.description}
                        difficulty={challenge.difficulty as "Beginner" | "Intermediate" | "Advanced"}
                        duration={challenge.duration}
                        participants={challenge.participants}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="newest" className="pt-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading challenges...</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges
                    .slice()
                    .reverse()
                    .slice(0, 6)
                    .map((challenge) => (
                      <ChallengeCard 
                        key={challenge.id}
                        id={challenge.id}
                        title={challenge.title}
                        description={challenge.description}
                        difficulty={challenge.difficulty as "Beginner" | "Intermediate" | "Advanced"}
                        duration={challenge.duration}
                        participants={challenge.participants}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">Sign in to view your completed challenges.</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Leaderboard Section */}
          <section className="py-12 border-t">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Top Analysts This Month</h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Our leading data analysts who have completed the most challenges with high scores.
              </p>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg max-w-4xl mx-auto">
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
                  {leaderboardData.map((person, index) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* About section */}
          <section className="py-12 border-t" id="about">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">About Our Challenges</h2>
              <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
                Learn more about how our platform helps data analysts improve their skills through practical challenges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Practice with DataComp?</h3>
                <p className="text-gray-600 mb-6">
                  Our challenges are designed to simulate real-world data analysis scenarios that you might encounter in your career. 
                  Each challenge comes with a detailed description of the problem, a dataset, and a time limit.
                </p>
                <p className="text-gray-600">
                  By practicing under time pressure, you'll improve your ability to quickly identify patterns, 
                  apply appropriate analysis techniques, and communicate your findings effectively.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Data analysis visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Improve Visualization Skills</h3>
                <p className="mt-2 text-gray-600">
                  Learn to create clear, informative visualizations that effectively communicate your findings.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Work Under Pressure</h3>
                <p className="mt-2 text-gray-600">
                  Sharpen your ability to analyze data efficiently within tight timeframes.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Learn Best Practices</h3>
                <p className="mt-2 text-gray-600">
                  Discover industry-standard approaches to common data analysis tasks.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;

