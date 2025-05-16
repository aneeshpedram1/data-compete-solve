
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSessionHash, setHasSessionHash] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced authentication check
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        // Check if we have a hash fragment in the URL (from password reset email)
        const hash = window.location.hash;
        console.log("URL hash:", hash);
        
        if (hash) {
          console.log("Hash fragment detected in URL");
          setHasSessionHash(true);
          setSessionChecked(true);
          return;
        }

        // Check for active session
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Current session state:", sessionData?.session ? "Session exists" : "No session");
        
        if (sessionData?.session) {
          console.log("Active session found");
          setHasSessionHash(true);
          setSessionChecked(true);
          return;
        }
        
        setSessionChecked(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setSessionChecked(true);
      }
    };

    checkAuthSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, session ? "Session present" : "No session");
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log("Password recovery event detected");
        setHasSessionHash(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Attempting to update password");
      
      // Get access token from URL if available
      const accessToken = new URLSearchParams(location.hash.substring(1)).get('access_token');
      console.log("Access token from URL:", accessToken ? "Present" : "Not found");
      
      if (accessToken) {
        // If we have an access token from the URL, use it to set the session
        console.log("Setting session from access token");
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: '',
        });
        
        if (sessionError) {
          console.error("Error setting session:", sessionError);
          throw sessionError;
        }
        
        console.log("Session set successfully:", sessionData.session ? "Valid" : "Invalid");
      }
      
      // Now update the password
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error("Password update error:", error);
        throw error;
      }
      
      toast({
        title: "Password updated successfully",
        description: "Your password has been reset. You can now login with your new password.",
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password update error:", error);
      
      // More descriptive error messages based on common issues
      let errorMessage = error.message || "An error occurred. Please try again.";
      
      if (error.message?.includes("session")) {
        errorMessage = "Authentication session expired or invalid. Please request a new password reset link.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while we check session
  if (!sessionChecked) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Loading</CardTitle>
              <CardDescription>
                Verifying your reset link...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasSessionHash) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invalid Reset Link</CardTitle>
              <CardDescription>
                This password reset link is invalid or has expired. Please request a new password reset.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate("/forgot-password")}
              >
                Request New Password Reset
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              Please enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
