import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService, UserProfile } from "@/lib/auth";

type AuthState = "LOADING" | "AUTHENTICATED" | "UNAUTHENTICATED";

export function useAuth(requireAuth = true) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<AuthState>("LOADING");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      
      // Missing Token
      if (!token) {
        setStatus("UNAUTHENTICATED");
        if (requireAuth) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
        return;
      }

      // Expired or Invalid Token check
      if (authService.isTokenExpired(token)) {
        console.warn("Token is expired or invalid.");
        authService.clearSession();
        setStatus("UNAUTHENTICATED");
        if (requireAuth) {
          router.replace(`/login?reason=expired`);
        }
        return;
      }

      // Valid session
      const userData = authService.getUser();
      setUser(userData);
      setStatus("AUTHENTICATED");
    };

    initAuth();
  }, [requireAuth, router, pathname]);

  const logout = () => {
    authService.clearSession();
    setUser(null);
    setStatus("UNAUTHENTICATED");
    router.replace("/login");
  };

  return {
    user,
    isAuthenticated: status === "AUTHENTICATED",
    isLoading: status === "LOADING",
    logout
  };
}
