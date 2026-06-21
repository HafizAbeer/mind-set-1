import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

// Gate for authenticated routes. Token presence is read synchronously from
// localStorage, so there is no loading flash for the auth check itself.
export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
