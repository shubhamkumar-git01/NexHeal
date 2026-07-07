import { authService } from "./auth";

export const getApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://nexheal.onrender.com";
  }
  return "http://localhost:5000";
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getApiUrl();
  // Ensure we don't duplicate /api if the base URL already has it
  const cleanBase = baseUrl.endsWith('/api/v1') ? baseUrl.replace('/api/v1', '') : baseUrl.endsWith('/api') ? baseUrl.replace('/api', '') : baseUrl;
  
  const url = `${cleanBase}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const token = authService.getToken();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Merge custom headers
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
