
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, FileSpreadsheet, Upload, Edit, Trash2, Eye, Filter } from "lucide-react";

// Sample challenges and submissions data
const challengesData = [
  {
    id: "1",
    title: "Customer Churn Analysis",
    description: "Analyze customer data to identify key factors contributing to churn.",
    difficulty: "Beginner",
    duration: 60,
    dateCreated: "2025-04-20",
    status: "Active"
  },
  {
    id: "2",
    title: "Sales Forecasting",
    description: "Use historical sales data to forecast future sales.",
    difficulty: "Intermediate",
    duration: 90,
    dateCreated: "2025-04-22",
    status: "Active"
  },
  {
    id: "3",
    title: "Health Outcomes Prediction",
    description: "Analyze patient data and identify risk factors.",
    difficulty: "Advanced",
    duration: 120,
    dateCreated: "2025-04-25",
    status: "Draft"
  }
];

const submissionsData = [
  {
    id: "1",
    challengeId: "1",
    challengeTitle: "Customer Churn Analysis",
    userId: "user123",
    userName: "Jane Doe",
    submissionDate: "2025-04-26",
    status: "Completed",
    fileUrl: "#"
  },
  {
    id: "2",
    challengeId: "1",
    challengeTitle: "Customer Churn Analysis",
    userId: "user456",
    userName: "John Smith",
    submissionDate: "2025-04-26",
    status: "Out of Time",
    fileUrl: "#"
  },
  {
    id: "3",
    challengeId: "2",
    challengeTitle: "Sales Forecasting",
    userId: "user789",
    userName: "Alice Johnson",
    submissionDate: "2025-04-27",
    status: "Completed",
    fileUrl: "#"
  }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [duration, setDuration] = useState("60");
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  
  const { toast } = useToast();

  const handleDatasetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDatasetFile(e.target.files[0]);
    }
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !longDescription || !difficulty || !duration || !datasetFile) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields and upload a dataset file.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log({
      title,
      description,
      longDescription,
      difficulty,
      duration: parseInt(duration),
      datasetFile
    });
    
    toast({
      title: "Challenge Created",
      description: "Your new data challenge has been created successfully!",
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setLongDescription("");
    setDifficulty("Beginner");
    setDuration("60");
    setDatasetFile(null);
    
    // Switch to manage tab to show the new challenge
    setActiveTab("manage");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "Out of Time":
        return <Badge className="bg-red-100 text-red-800">Out of Time</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="create">Create Challenge</TabsTrigger>
              <TabsTrigger value="manage">Manage Challenges</TabsTrigger>
              <TabsTrigger value="submissions">View Submissions</TabsTrigger>
            </TabsList>
            
            {/* Create Challenge Tab */}
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Challenge</CardTitle>
                  <CardDescription>
                    Create a new data analysis challenge with dataset, description, and time limit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateChallenge}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Challenge Title</Label>
                        <Input
                          id="title"
                          placeholder="E.g., Customer Churn Analysis"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Input
                          id="description"
                          placeholder="Brief summary of the challenge"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="longDescription">Full Challenge Description</Label>
                        <Textarea
                          id="longDescription"
                          placeholder="Detailed instructions, background, and requirements for the challenge"
                          value={longDescription}
                          onChange={(e) => setLongDescription(e.target.value)}
                          rows={10}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          You can use Markdown formatting for headers, lists, etc.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select 
                            value={difficulty} 
                            onValueChange={setDifficulty}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="duration">Time Limit (minutes)</Label>
                          <Input
                            id="duration"
                            type="number"
                            placeholder="E.g., 60"
                            min="15"
                            max="180"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Upload Dataset</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md px-6 py-8">
                          <div className="space-y-2 text-center">
                            <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label
                                htmlFor="dataset-upload"
                                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                              >
                                <span>Upload dataset file</span>
                                <input
                                  id="dataset-upload"
                                  name="dataset-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleDatasetFileChange}
                                  accept=".csv,.xlsx,.xls"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              .csv, .xlsx, or .xls files up to 50MB
                            </p>
                          </div>
                          {datasetFile && (
                            <div className="mt-4 flex items-center justify-center text-sm">
                              <FileSpreadsheet className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{datasetFile.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button type="submit">
                        Create Challenge
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Manage Challenges Tab */}
            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Manage Challenges</CardTitle>
                      <CardDescription>
                        View, edit, or delete existing challenges.
                      </CardDescription>
                    </div>
                    <Button onClick={() => setActiveTab("create")}>
                      Create New Challenge
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Date Created</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {challengesData.map((challenge) => (
                          <TableRow key={challenge.id}>
                            <TableCell className="font-medium">{challenge.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                challenge.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                                challenge.difficulty === "Intermediate" ? "bg-blue-100 text-blue-800" :
                                "bg-purple-100 text-purple-800"
                              }>
                                {challenge.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell>{challenge.duration} min</TableCell>
                            <TableCell>{challenge.dateCreated}</TableCell>
                            <TableCell>
                              {getStatusBadge(challenge.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" title="View">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Edit">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Delete">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* View Submissions Tab */}
            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Challenge Submissions</CardTitle>
                      <CardDescription>
                        View and manage user submissions for your challenges.
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Challenge</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissionsData.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.userName}</TableCell>
                            <TableCell>{submission.challengeTitle}</TableCell>
                            <TableCell>{submission.submissionDate}</TableCell>
                            <TableCell>
                              {getStatusBadge(submission.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" title="Download" asChild>
                                  <a href={submission.fileUrl} download>
                                    <Upload className="h-4 w-4 rotate-180" />
                                  </a>
                                </Button>
                                <Button variant="ghost" size="icon" title="View Details">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="text-sm text-gray-500">
                    Total: {submissionsData.length} submissions
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
