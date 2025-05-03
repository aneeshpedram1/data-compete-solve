
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChallengeCard, { ChallengeProps } from "@/components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const fetchChallenges = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*");
  
  if (error) {
    throw error;
  }
  
  return data.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    difficulty: task.difficulty === "beginner" ? "Beginner" : 
               task.difficulty === "intermediate" ? "Intermediate" : "Advanced",
    duration: task.timer_duration,
    // For now, we'll use a random number for participants until we implement that feature
    participants: Math.floor(Math.random() * 300) + 100
  }));
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
      onError: (error: Error) => {
        console.error("Failed to fetch challenges:", error);
        toast({
          title: "Error",
          description: "Failed to load challenges. Please try again later.",
          variant: "destructive",
        });
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
