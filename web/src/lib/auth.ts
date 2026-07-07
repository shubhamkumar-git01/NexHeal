// The centralized source of truth for authentication tokens and user data.
// This abstraction ensures that when we migrate to httpOnly cookies in the future,
// we only need to modify this single file, and no UI components will break.

export interface UserProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export const authService = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("token");
  },

  getUser: (): UserProfile | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      return null;
    }
  },

  setSession: (token: string, user: UserProfile): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  clearSession: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  
  // Future-ready: For handling expired tokens without breaking the API signature
  isTokenExpired: (token: string): boolean => {
    if (!token) return true;
    try {
      // Basic JWT decode (only payload)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      
      // Check expiry
      if (decoded.exp) {
        return decoded.exp * 1000 < Date.now();
      }
      return false;
    } catch {
      return true; // Invalid token
    }
  }
};
