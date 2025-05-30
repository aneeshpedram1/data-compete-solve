
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Github, Mail, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState<"regular" | "admin">("regular");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (type === "login") {
        if (activeTab === "admin") {
          // Admin login
          await adminLogin(email, password);
          
          toast({
            title: "Admin login successful",
            description: "Welcome back, administrator!",
          });
          
          navigate("/admin");
        } else {
          // Regular login
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          toast({
            title: "Logged in successfully",
            description: "Welcome back to DataComp!",
          });
          
          navigate("/challenges");
        }
      } else {
        // Sign up (always regular user)
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created successfully",
          description: "Welcome to DataComp!",
        });
        
        navigate("/challenges");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {type === "login" ? "Login to DataComp" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {type === "login" 
            ? "Enter your credentials to access your account" 
            : "Sign up to start participating in data challenges"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {type === "login" && (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "regular" | "admin")} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="regular">Regular Login</TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center justify-center">
                <Shield className="mr-2 h-4 w-4" />
                Admin Login
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && activeTab === "regular" && (
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : type === "login" ? 
              (activeTab === "admin" ? "Login as Admin" : "Login") : 
              "Create Account"}
          </Button>
        </form>

        {activeTab === "regular" && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" type="button">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-gray-500">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-800">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-800">
                Login
              </a>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
