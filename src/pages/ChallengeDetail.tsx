
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Timer from "@/components/Timer";
import { ArrowLeft, Clock, Users, Download, Upload, Play, CheckCircle, XCircle } from "lucide-react";

// Sample challenge data (in a real app, this would come from an API)
const challengesData = {
  "1": {
    id: "1",
    title: "Customer Churn Analysis",
    description: "Analyze customer data to identify key factors contributing to churn.",
    longDescription: `# Customer Churn Analysis Challenge

## Background
ChurnCo, a subscription-based software company, is experiencing a high customer churn rate. The company has collected data on their customers, including demographics, usage patterns, and whether they churned.

## Your Task
1. Explore the dataset to understand the patterns and trends.
2. Identify the top 3-5 factors that contribute most to customer churn.
3. Create visualizations to support your findings.
4. Provide actionable recommendations for reducing churn rate.

## Evaluation Criteria
- Thoroughness of exploratory data analysis
- Quality of insights and their relevance to reducing churn
- Clarity and effectiveness of visualizations
- Practicality of recommendations

## Dataset Description
The dataset contains the following fields:
- CustomerID: Unique identifier for each customer
- Gender: Customer's gender (Male/Female)
- SeniorCitizen: Whether customer is a senior citizen (1/0)
- Partner: Whether customer has a partner (Yes/No)
- Dependents: Whether customer has dependents (Yes/No)
- Tenure: Number of months the customer has been with the company
- PhoneService: Whether customer has phone service (Yes/No)
- MultipleLines: Whether customer has multiple lines (Yes/No/No phone service)
- InternetService: Type of internet service (DSL/Fiber optic/No)
- OnlineSecurity: Whether customer has online security (Yes/No/No internet service)
- OnlineBackup: Whether customer has online backup (Yes/No/No internet service)
- DeviceProtection: Whether customer has device protection (Yes/No/No internet service)
- TechSupport: Whether customer has tech support (Yes/No/No internet service)
- StreamingTV: Whether customer has streaming TV (Yes/No/No internet service)
- StreamingMovies: Whether customer has streaming movies (Yes/No/No internet service)
- Contract: Contract term (Month-to-month/One year/Two year)
- PaperlessBilling: Whether customer uses paperless billing (Yes/No)
- PaymentMethod: Customer's payment method
- MonthlyCharges: Amount charged monthly
- TotalCharges: Total amount charged
- Churn: Whether customer churned (Yes/No)`,
    difficulty: "Beginner",
    duration: 60,
    participants: 324,
    datasetUrl: "#",
    sampleSubmission: {
      url: "#",
      filename: "churn_analysis_solution.ipynb"
    }
  },
  "2": {
    id: "2",
    title: "Sales Forecasting",
    description: "Use historical sales data to forecast future sales. Identify seasonal patterns and trends.",
    longDescription: "Full description of sales forecasting challenge...",
    difficulty: "Intermediate",
    duration: 90,
    participants: 218,
    datasetUrl: "#",
    sampleSubmission: null
  }
};

type ChallengeStatus = "not-started" | "in-progress" | "completed" | "out-of-time";

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>("not-started");
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showStartDialog, setShowStartDialog] = useState<boolean>(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("description");
  
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get challenge details
    setTimeout(() => {
      if (id && challengesData[id as keyof typeof challengesData]) {
        setChallenge(challengesData[id as keyof typeof challengesData]);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleStartChallenge = () => {
    setShowStartDialog(false);
    setChallengeStatus("in-progress");
    setTimerActive(true);
    
    toast({
      title: "Challenge Started",
      description: `You have ${challenge.duration} minutes to complete this challenge.`,
    });
  };

  const handleTimeEnd = () => {
    setTimerActive(false);
    setChallengeStatus("out-of-time");
    
    toast({
      title: "Time's Up!",
      description: "Your time has ended. Submit what you have or mark as incomplete.",
      variant: "destructive",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would upload the file to your backend here
    console.log("Submitting file:", selectedFile.name);
    
    setShowSubmitDialog(false);
    setChallengeStatus("completed");
    setTimerActive(false);
    
    toast({
      title: "Challenge Completed!",
      description: "Your submission has been received.",
    });
  };

  const handleMarkIncomplete = () => {
    setChallengeStatus("not-started");
    setTimerActive(false);
    setSelectedFile(null);
    
    toast({
      title: "Challenge Marked as Incomplete",
      description: "You can restart this challenge anytime.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading challenge...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900">Challenge Not Found</h2>
              <p className="mt-2 text-gray-600">
                The challenge you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/challenges">
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Challenges
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header with back button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <Link to="/challenges" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Challenges
              </Link>
            </div>
            
            {/* Challenge status and timer */}
            <div className="flex items-center space-x-4">
              {challengeStatus === "not-started" ? (
                <Button onClick={() => setShowStartDialog(true)}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Challenge
                </Button>
              ) : challengeStatus === "in-progress" ? (
                <div className="flex items-center space-x-4">
                  <Timer duration={challenge.duration} onTimeEnd={handleTimeEnd} active={timerActive} />
                  <Button onClick={() => setShowSubmitDialog(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Complete & Submit
                  </Button>
                </div>
              ) : challengeStatus === "completed" ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleMarkIncomplete}>
                    Mark Incomplete
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center">
                    <XCircle className="h-3 w-3 mr-1" />
                    Time Expired
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleMarkIncomplete}>
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Challenge title and metadata */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">{challenge.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{challenge.duration} minutes</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{challenge.participants} participants</span>
              </div>
            </div>
          </div>
          
          {/* Challenge content */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="description">Challenge Description</TabsTrigger>
                  <TabsTrigger value="submission">Submission Guidelines</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="markdown prose max-w-none">
                        <p className="text-lg mb-4">{challenge.description}</p>
                        <div className="whitespace-pre-line markdown">
                          {challenge.longDescription.split('\n').map((line: string, index: number) => {
                            if (line.startsWith('# ')) {
                              return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>
                            } else if (line.startsWith('## ')) {
                              return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.slice(3)}</h2>
                            } else if (line.startsWith('- ')) {
                              return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>
                            } else if (line.trim() === '') {
                              return <br key={index} />
                            } else {
                              return <p key={index} className="mb-2">{line}</p>
                            }
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="submission" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Submission Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Submit your solution as a Jupyter Notebook (.ipynb), R Markdown (.rmd), or PDF (.pdf) file.</li>
                        <li>Include your code, visualizations, analysis, and conclusions.</li>
                        <li>Make sure your submission is well-organized and properly documented.</li>
                        <li>Your submission must be completed within the {challenge.duration}-minute time limit.</li>
                      </ul>
                      
                      <h3 className="text-lg font-medium mb-4">Evaluation Criteria</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Quality and depth of exploratory data analysis</li>
                        <li>Appropriateness of visualizations</li>
                        <li>Insights and interpretation of results</li>
                        <li>Clarity of explanations and recommendations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="resources" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Available Resources</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Dataset</h4>
                          <Button variant="outline" className="w-full justify-start" asChild>
                            <a href={challenge.datasetUrl} download>
                              <Download className="mr-2 h-4 w-4" />
                              Download Dataset (.csv)
                            </a>
                          </Button>
                        </div>
                        
                        {challenge.sampleSubmission && (
                          <div>
                            <h4 className="font-medium mb-2">Sample Submission</h4>
                            <Button variant="outline" className="w-full justify-start" asChild>
                              <a href={challenge.sampleSubmission.url} download>
                                <Download className="mr-2 h-4 w-4" />
                                {challenge.sampleSubmission.filename}
                              </a>
                            </Button>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium mb-2">Useful Libraries</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>pandas - Data manipulation and analysis</li>
                            <li>numpy - Numerical computing</li>
                            <li>matplotlib/seaborn - Data visualization</li>
                            <li>scikit-learn - Machine learning tools</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar with progress */}
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Challenge Progress</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress</span>
                      <span>
                        {challengeStatus === "not-started" ? "0%" : 
                         challengeStatus === "in-progress" ? "50%" : "100%"}
                      </span>
                    </div>
                    <Progress 
                      value={
                        challengeStatus === "not-started" ? 0 : 
                        challengeStatus === "in-progress" ? 50 : 100
                      } 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        challengeStatus !== "not-started" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        1
                      </div>
                      <div>
                        <p className={`font-medium ${challengeStatus !== "not-started" ? "text-gray-900" : "text-gray-400"}`}>
                          Start Challenge
                        </p>
                        {challengeStatus !== "not-started" && (
                          <p className="text-xs text-gray-500">Challenge started</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="h-6 border-l border-gray-200 ml-3"></div>
                    
                    <div className="flex items-center">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        challengeStatus === "in-progress" || challengeStatus === "completed" || challengeStatus === "out-of-time" 
                          ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        2
                      </div>
                      <div>
                        <p className={`font-medium ${
                          challengeStatus === "in-progress" || challengeStatus === "completed" || challengeStatus === "out-of-time" 
                            ? "text-gray-900" : "text-gray-400"
                        }`}>
                          Work on Challenge
                        </p>
                        {challengeStatus === "in-progress" && (
                          <p className="text-xs text-gray-500">In progress</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="h-6 border-l border-gray-200 ml-3"></div>
                    
                    <div className="flex items-center">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        challengeStatus === "completed" 
                          ? "bg-green-500 text-white" 
                          : challengeStatus === "out-of-time"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-400"
                      }`}>
                        3
                      </div>
                      <div>
                        <p className={`font-medium ${
                          challengeStatus === "completed" || challengeStatus === "out-of-time"
                            ? "text-gray-900" : "text-gray-400"
                        }`}>
                          {challengeStatus === "completed" 
                            ? "Challenge Completed" 
                            : challengeStatus === "out-of-time"
                              ? "Time Expired"
                              : "Submit Solution"
                          }
                        </p>
                        {challengeStatus === "completed" && (
                          <p className="text-xs text-gray-500">Solution submitted</p>
                        )}
                        {challengeStatus === "out-of-time" && (
                          <p className="text-xs text-gray-500">Ran out of time</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Start Challenge Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Challenge</DialogTitle>
            <DialogDescription>
              You are about to start the "{challenge.title}" challenge.
              Once you start, you will have {challenge.duration} minutes to complete it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Time Limit: {challenge.duration} minutes</span>
            </div>
            <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-md text-sm">
              <p>
                <strong>Note:</strong> The timer will start immediately when you click "Start". 
                Make sure you're ready before proceeding.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>Cancel</Button>
            <Button onClick={handleStartChallenge}>
              I'm Ready, Start Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Submit Solution Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Your Solution</DialogTitle>
            <DialogDescription>
              Upload your solution file to complete the challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-10">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Upload className="mx-auto h-12 w-12" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".ipynb,.rmd,.pdf,.docx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    .ipynb, .rmd, .pdf, or .docx files up to 10MB
                  </p>
                </div>
                {selectedFile && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              Submit Solution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
