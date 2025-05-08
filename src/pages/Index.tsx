import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, BarChart, Clock, Award, Database, Users, BookOpen } from "lucide-react";
import ChallengeCard, { ChallengeProps } from "@/components/ChallengeCard";

// Sample data for featured challenges
const featuredChallenges: ChallengeProps[] = [
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
  }
];

// Sample data for leaderboard
const leaderboardData = [
  { id: 1, name: "Alex Johnson", challenges: 42, points: 3840, badge: "Data Wizard" },
  { id: 2, name: "Maria Garcia", challenges: 38, points: 3560, badge: "Insight Master" },
  { id: 3, name: "David Chen", challenges: 35, points: 3250, badge: "Pattern Spotter" },
  { id: 4, name: "Priya Patel", challenges: 31, points: 2980, badge: "Analytics Pro" },
  { id: 5, name: "James Wilson", challenges: 29, points: 2760, badge: "Data Explorer" }
];

// Leadership team data
const leadershipTeam = [
  {
    name: "Aneesh Pedram",
    role: "Founder",
    bio: "Master of Data Science @ Deakin University",
    image: "/lovable-uploads/578262b3-14bf-4fae-a06f-74b77d6f4597.png"
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Test Your Data Analysis Skills in Real Time
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                DataComp is a platform for timed data analysis challenges. Practice analyzing real datasets, solve problems, and improve your skills.
              </p>
              <div className="relative z-10">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-violet-500" asChild>
                  <Link to="/challenges" className="flex items-center justify-center">
                    Browse Challenges <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block mt-8 md:mt-0 md:ml-8">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                alt="Data Visualization" 
                className="max-h-80 rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">How DataComp Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Master data analysis through timed challenges, improve your skills, and showcase your abilities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Timed Challenges</h3>
              <p className="mt-2 text-gray-600">
                Test your skills under time pressure, just like in real interviews and data emergencies.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Real-world Datasets</h3>
              <p className="mt-2 text-gray-600">
                Practice with actual business datasets across various industries and domains.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BarChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Comprehensive Analytics</h3>
              <p className="mt-2 text-gray-600">
                Track your progress, identify strengths and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Challenges</h2>
            <Link to="/challenges" className="text-blue-600 hover:text-blue-800 flex items-center">
              View all challenges <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredChallenges.slice(0, 3).map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Leaderboard</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our top performers who have mastered the art of data analysis under pressure.
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
          <div className="text-center mt-8">
            <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
              View full leaderboard <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">About DataComp</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in 2022, DataComp was created to bridge the gap between academic data science education and real-world analytics challenges. 
              Our platform offers timed, practical exercises that simulate the pressure and complexity of actual data analysis scenarios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                DataComp's mission is to democratize access to practical data analysis experience. We believe that the best way to learn is by doing, especially under realistic conditions.
              </p>
              <p className="text-gray-600">
                Whether you're a student looking to supplement your education, a professional wanting to sharpen your skills, or a job seeker preparing for interviews, DataComp provides the practice environment you need to excel.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Leadership Team</h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
              <img 
                src={leadershipTeam[0].image} 
                alt={leadershipTeam[0].name} 
                className="w-full h-96 object-cover object-center"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900">{leadershipTeam[0].name}</h4>
                <p className="text-blue-600 font-medium mb-3">{leadershipTeam[0].role}</p>
                <p className="text-gray-600">{leadershipTeam[0].bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-16">
            What Data Analysts Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Jane Doe</h4>
                  <p className="text-gray-600 text-sm">Data Scientist at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600">
                "DataComp challenges helped me prepare for my technical interviews. The time pressure really simulates real-world scenarios."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl font-bold">MS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Mike Smith</h4>
                  <p className="text-gray-600 text-sm">BI Analyst at Finance Inc</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I love how DataComp focuses on analysis rather than just model building. It's exactly what I need for my day-to-day work."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl font-bold">AK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Amy Kim</h4>
                  <p className="text-gray-600 text-sm">Data Analyst Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a student, DataComp gives me practical experience with real datasets that I wouldn't get in my coursework alone."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Ready to Test Your Data Skills?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join DataComp today and start analyzing real datasets under time pressure.
          </p>
          <div className="relative z-10">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-violet-500" asChild>
              <Link to="/challenges" className="flex items-center justify-center">
                Browse Challenges <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
