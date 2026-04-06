"use client";

import { useEffect, useState } from "react";

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  session: {
    token: string;
  };
}

// Initialize session from sessionStorage synchronously to avoid hydration issues
const getInitialSession = (): Session | null => {
  if (typeof window === "undefined") return null;
  try {
    const cached = sessionStorage.getItem("__auth_session");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // Failed to load cached session
  }
  return null;
};

export function useAuthSession() {
  const cachedSession = getInitialSession();
  const [session, setSession] = useState<Session | null>(cachedSession);
  const [isPending, setIsPending] = useState(!cachedSession); // Not pending if we have cache

  useEffect(() => {
    const checkSession = async (isInitial = false) => {
      // If we have a cached session on initial load, skip setting pending state
      // to prevent redirect during validation
      const hadCachedSession = isInitial && session !== null;
      
      try {
        // Check if we have a session by attempting to fetch profile
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data?.user) {
            const sessionData: Session = {
              user: {
                id: data.user.id || "",
                email: data.user.email || "",
                name: data.user.name || "",
                role: data.user.role || "Worker",
              },
              session: {
                token: "authenticated",
              },
            };
            setSession(sessionData);
            // Cache in sessionStorage to survive HMR rebuilds
            if (typeof window !== "undefined") {
              sessionStorage.setItem("__auth_session", JSON.stringify(sessionData));
            }
          } else if (isInitial && !hadCachedSession) {
            // Only set null on initial check if no user and no cache
            setSession(null);
          }
        } else {
          // 401 or other error means no session
          if (isInitial && !hadCachedSession) {
            setSession(null);
            // Clear cache on logout/auth failure
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("__auth_session");
            }
          }
        }
      } catch (err) {
        // Only clear session on initial check if no cache
        if (isInitial && !hadCachedSession) {
          setSession(null);
          // Clear cache on error
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("__auth_session");
          }
        }
      } finally {
        // Only set isPending to false on initial check
        if (isInitial) {
          setIsPending(false);
        }
      }
    };

    // Initial check
    checkSession(true);

    // Periodic refresh every 10 minutes (less frequent to avoid network issues)
    const interval = setInterval(() => checkSession(false), 10 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { data: session, isPending };
}
