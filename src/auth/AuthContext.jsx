import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiFetch, getToken } from "@/lib/api";

const AuthContext = createContext(null);

// Public routes where a soft sign-out should NOT redirect to /login.
const AUTH_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/enter-pin",
  "/new-password",
  "/agreement-user",
  "/agreement-therapist",
];

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  const logout = useCallback(() => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    if (!AUTH_ROUTES.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const login = useCallback((newToken, userData) => {
    localStorage.setItem("userToken", newToken);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData || null);
  }, []);

  // Pull the authoritative profile/entitlement from the server. A 401 is
  // handled by the global "auth:unauthorized" listener below; other failures
  // (e.g. the endpoint not deployed yet) keep the cached localStorage user.
  const refresh = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const me = await apiFetch("/user/me");
      setUser(me);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: me.name, email: me.email }),
      );
      return me;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handler = () => logout();
    window.addEventListener("auth:unauthorized", handler);
    return () => window.removeEventListener("auth:unauthorized", handler);
  }, [logout]);

  const plan = user?.plan || "free";
  const subscriptionStatus = user?.subscriptionStatus || "none";
  const isPro =
    plan === "pro" && ["active", "trialing"].includes(subscriptionStatus);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    plan,
    subscriptionStatus,
    isPro,
    login,
    logout,
    refresh,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function useEntitlements() {
  const { plan, subscriptionStatus, isPro } = useAuth();
  return { plan, subscriptionStatus, isPro };
}
