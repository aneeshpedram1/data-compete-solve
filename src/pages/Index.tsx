
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, BarChart, Clock, Award, Database } from "lucide-react";
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
        <div className="hidden lg:block absolute bottom-0 inset-x-0 z-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-white">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
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
            {featuredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
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
