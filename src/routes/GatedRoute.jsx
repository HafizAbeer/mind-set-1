import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

// Pro-only gate. Renders a loading state while entitlement is hydrating so a
// paying user is never bounced to /pricing on refresh, and a free user never
// sees a flash of Pro content.
//
// NOTE: not wired into App.jsx until the paywall is live — until a user can
// actually become Pro, gating would lock everyone out.
export default function GatedRoute() {
  const { loading, isPro } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        Loading…
      </div>
    );
  }

  if (!isPro) {
    return <Navigate to="/pricing" replace state={{ reason: "upgrade" }} />;
  }

  return <Outlet />;
}
