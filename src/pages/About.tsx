
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

// Leadership team data
const leadershipTeam = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Former data scientist with 15 years of experience in tech giants, passionate about making data analysis skills accessible to everyone.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&auto=format&fit=crop"
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Data Officer",
    bio: "Statistics PhD with expertise in creating challenging yet accessible data problems for learners at all levels.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&auto=format&fit=crop"
  },
  {
    name: "Aisha Wong",
    role: "Head of Education",
    bio: "Former analytics professor who specializes in transforming complex concepts into digestible learning experiences.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&auto=format&fit=crop"
  }
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center">About DataComp</h1>
        </div>
      </section>

      {/* About Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              DataComp is a cutting-edge platform designed for data enthusiasts who want to challenge themselves and grow their analytical skills in a practical, hands-on environment. We offer a unique approach to learning data analysis by providing timed challenges that simulate real-world scenarios.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Launched in 2022, our platform was born from the realization that while theoretical knowledge is important, the ability to analyze data under pressure and with time constraints is what truly differentiates exceptional analysts. Whether you're preparing for job interviews, looking to enhance your professional skills, or simply passionate about data, DataComp offers the perfect environment to test and improve your abilities.
            </p>
            
            <p className="text-lg text-gray-700 mb-10">
              Our challenges span across multiple industries and disciplines, from finance and healthcare to marketing and operations, ensuring that users gain exposure to a diverse range of analytical scenarios. With our comprehensive feedback system and competitive leaderboards, you'll not only test your skills but also track your progress and compare your performance with peers across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
        </div>
      </section>
      
      {/* Leadership Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Leadership Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
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
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-violet-500" asChild>
            <Link to="/challenges" className="flex items-center justify-center">
              Browse Challenges <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
