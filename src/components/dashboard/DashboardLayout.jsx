import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import { LegacySidebarPortal } from "@/components/dashboard/LegacySidebarPortal";
import mindsetLogo from "@/assets/mindset-logo.svg";

function FloatingEdgeToggle() {
  const { state, isMobile } = useSidebar();

  if (isMobile || state !== "collapsed") return null;

  return (
    <div
      className="pointer-events-none fixed top-10 z-50 -translate-y-1/2"
      style={{
        left: "calc(var(--sidebar-width-icon) + 2rem)",
      }}
    >
      <div className="pointer-events-auto">
        <SidebarTrigger className="text-white hover:bg-zinc-800" />
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const location = useLocation();

  const isDashboardScreen = location.pathname === "/dashboard";
  const isTherapistPage = [
    "/therapist-dialog",
    "/therapist-new-entry",
    "/settings",
    "/statistics-detail",
  ].includes(location.pathname);

  const radarRoutes = [
    "/cause-select",
    "/exercises-select",
    "/intention-select",
    "/reflection-questions",
    "/symptom-select",
    "/anchor-select",
    "/life-script-select",
    "/old-script-select",
    "/new-script-select",
    "/success-gauge-select",
    "/slight-improvement",
    "/slight-improvement-feedback",
    "/clear-improvement",
    "/clear-improvement-feedback",
    "/inconstant-development",
    "/inconstant-development-feedback",
    "/mostly-problem-free",
    "/mostly-problem-free-feedback",
    "/little-worsening",
    "/little-worsening-feedback",
    "/no-changings",
    "/no-changings-feedback",
    "/long-time-problem-free",
    "/long-time-problem-free-feedback",
    "/reward-choice-select",
    "/positive-mindset",
    "/negative-mindset",
    "/unclear-mindset",
    "/mindset-select",
    "/trigger-radar",
    "/reflection-radar",
    "/body-radar",
    "/body-select",
  ];

  const isRadarPage = radarRoutes.includes(location.pathname);
  const isPricingPage = location.pathname === "/pricing";

  const shouldShowAppSidebar =
    isDashboardScreen || isTherapistPage || isRadarPage;

  const [legacySidebarOpen, setLegacySidebarOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div
          id="dashboard-main-container"
          className="flex min-h-screen w-full bg-background overflow-hidden relative"
        >
          {/* xl+: proper AppSidebar (Dashboard or Therapist Pages) */}
          {shouldShowAppSidebar && (
            <div className="hidden xl:block">
              <AppSidebar />
            </div>
          )}

          <main className="relative flex-1 overflow-x-hidden">
            {/* Mobile sidebar trigger OR fixed single trigger for special pages like Pricing */}
            {(shouldShowAppSidebar || isPricingPage) && (
              <div
                className={`absolute left-[13px] top-[21px] z-50 ${isPricingPage ? "" : "xl:hidden"}`}
              >
                <button
                  onClick={() => setLegacySidebarOpen(true)}
                  className="flex items-center justify-center transition-transform active:scale-95 hover:bg-white/5 p-1 rounded-full"
                >
                  <img
                    src={mindsetLogo}
                    alt="Logo"
                    className="h-[52px] w-[52px] shrink-0"
                  />
                </button>
              </div>
            )}

            <LegacySidebarPortal
              open={legacySidebarOpen}
              onClose={() => setLegacySidebarOpen(false)}
            />

            {/* xl: collapsed sidebar edge toggle */}
            {shouldShowAppSidebar && (
              <div className="hidden xl:block">
                <FloatingEdgeToggle />
              </div>
            )}

            <Outlet context={{ setLegacySidebarOpen }} />
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
