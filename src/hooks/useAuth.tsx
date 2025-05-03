
import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          checkIfUserIsAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        checkIfUserIsAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to check if a user is admin
  const checkIfUserIsAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
      if (error) throw error;
      setIsAdmin(data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/login');
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Check if the user is actually an admin
      if (data.user) {
        const { data: isAdminData, error: adminError } = await supabase.rpc('is_admin', { 
          user_id: data.user.id 
        });
        
        if (adminError) throw adminError;
        
        if (!isAdminData) {
          // If not admin, sign them out and throw error
          await supabase.auth.signOut();
          throw new Error('User is not authorized as an administrator');
        }
        
        setIsAdmin(true);
        return data;
      }
      
      return null;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAdmin,
    adminLogin
  };
}
