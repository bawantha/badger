
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/app/(main)/battle/[id]/actions';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        if (STREAM_API_KEY) {
          const streamUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email || 'Anonymous',
            image: firebaseUser.photoURL || undefined,
          };
          const client = new StreamVideoClient({ 
            apiKey: STREAM_API_KEY, 
            user: streamUser, 
            tokenProvider 
          });
          setVideoClient(client);
          // The connect() call will be handled by the StreamVideo component
        }
      } else {
        setUser(null);
        videoClient?.disconnectUser();
        setVideoClient(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      videoClient?.disconnectUser();
    }
  }, [videoClient]);
  

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';
    
    if (!user && !isAuthPage) {
      router.push('/sign-in');
    } else if (user && isAuthPage) {
      router.push('/missions');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }
  
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';
  if (!user && !isAuthPage) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-2">Redirecting to sign-in...</p>
        </div>
    );
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
}
