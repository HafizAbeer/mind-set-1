import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import mindsetIcon from "../assets/radarModulesIcon/mindset-red-icon.svg";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";

const MindsetSelect = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    {
      title: "Positive Mindsets",
      gradient: "linear-gradient(180deg, #3EEA79 0%, #1A813D 100%)",
      shadow: "0 4px 20px rgba(26, 129, 61, 0.3)",
    },
    {
      title: "Unclear Mindsets",
      gradient: "linear-gradient(180deg, #FFC350 0%, #C3840B 100%)",
      shadow: "0 4px 20px rgba(195, 132, 11, 0.3)",
    },
    {
      title: "Negative Mindsets",
      gradient: "linear-gradient(180deg, #FF6A6A 0%, #B23737 100%)",
      shadow: "0 4px 20px rgba(178, 55, 55, 0.3)",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Hide while drawer is open — Sidebar already shows the same logo/header (avoids double "New Mindset") */}
      {/* <div
        className={cn(
          "fixed left-4 top-4 z-200 flex items-center gap-4 sm:left-8 sm:top-8",
          isSidebarOpen && "hidden",
        )}
      >
        <div className="flex w-[min(220px,100%)] max-w-[220px] items-center justify-between rounded-xl border border-white/10 bg-[#1C1C24] p-4 pr-4 shadow-xl">
          <div
            className="flex cursor-pointer items-center gap-3 transition-transform active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsSidebarOpen(true);
            }}
          >
            <img src={mindsetLogo} alt="Logo" className="h-11 w-11 shrink-0" />
            <span className="font-inter text-[20px] font-semibold leading-[24px] text-white">
              New
              <br />
              Mindset
            </span>
          </div>
          <img
            src={collapseIcon}
            alt="Collapse"
            className="h-6 w-6 shrink-0 cursor-pointer object-contain transition-transform hover:scale-110"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div> */}

      <div className="flex min-h-screen w-full items-center justify-center overflow-x-hidden overflow-y-auto custom-scrollbar">
        <div
          className="relative flex w-full max-w-[1440px] min-h-0 flex-col overflow-hidden font-sans text-white shadow-2xl transition-all duration-300"
          style={{
            minHeight: "min(1024px, 100dvh)",
          }}
        >
          {/* <div
            className={cn(
              "absolute left-0 top-0 z-100 h-full transition-all duration-500 ease-in-out",
              isSidebarOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0",
            )}
          >
            <Sidebar
              isCollapsed={false}
              onToggle={() => setIsSidebarOpen(false)}
            />
          </div> */}

          {isSidebarOpen && (
            <div
              className="absolute inset-0 z-90 animate-in bg-black/60 backdrop-blur-sm fade-in transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <main className="relative flex w-full min-w-0 flex-1 flex-col items-center transition-all duration-300">
            <div className="pointer-events-none absolute inset-0 select-none opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 flex w-full min-w-0 origin-top flex-col items-center gap-8 px-1 transition-all duration-300 mt-32 gap-10 px-3 md:mt-26 lg:mt-20 lg:gap-12 lg:scale-[0.9]">
              <div className="flex min-h-0 w-full max-w-[956px] flex-col items-start gap-6 self-center sm:gap-[28px]">
                <div className="flex min-h-[68px] w-full items-center gap-4 sm:gap-[16px]">
                  <img
                    src={mindsetIcon}
                    alt="Icon"
                    className="h-9 w-9 shrink-0 object-contain"
                  />

                  <div className="min-w-0 flex flex-col">
                    <h1 className="m-0 font-inter text-[clamp(1.375rem,4vw,2rem)] font-bold leading-tight tracking-[-0.3px] text-white sm:text-[32px] sm:leading-[36px]">
                      Mindset Radar
                    </h1>
                    <p className="m-0 mt-2 font-inter text-[clamp(0.875rem,3vw,1.25rem)] font-medium leading-snug tracking-[-0.3px] text-[#9CA1A7] sm:mt-3 sm:leading-[24px]">
                      Identify your current mindset character
                    </p>
                  </div>
                </div>

                <Card
                  className="min-h-0 w-full shrink-0 rounded-[16px] border-2 border-[#FF595C] bg-transparent text-white shadow-none sm:min-h-[64px]"
                  style={{
                    backgroundColor: "rgba(255, 89, 92, 0.1)",
                  }}
                >
                  <CardContent className="flex items-center justify-center gap-3 p-4 sm:flex-row sm:gap-[8px] sm:p-[20px]">
                    <Info
                      size={24}
                      color="white"
                      className="shrink-0"
                    />
                    <span className="text-center font-inter text-[clamp(1rem,3.5vw,1.5rem)] font-semibold leading-snug text-[#FF595C] sm:text-[24px] sm:leading-[24px]">
                      Which character of mindset has caught your attention?
                    </span>
                  </CardContent>
                </Card>

                <p className="m-0 font-inter text-[clamp(0.875rem,3vw,1.25rem)] font-medium leading-relaxed text-[#C5C5C5]">
                  Tap here and start by selecting one from the three lists.
                </p>
              </div>

              <Card
                className="mt-4 flex w-full max-w-[956px] shrink-0 items-center justify-center rounded-[16px] border-2 border-[#CDCDCD] bg-transparent p-0 text-white shadow-none transition-all sm:mt-8 min-h-[min(506px,75vh)] sm:min-h-[506px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent className="flex min-h-0 w-full items-center justify-center p-4 sm:p-[30px]">
                  <div className="flex w-full max-w-[896px] min-h-0 flex-col items-center gap-8 py-2 sm:gap-12 md:gap-16 lg:gap-[85px]">
                    {categories.map((cat, idx) => (
                      <Button
                        key={idx}
                        type="button"
                        variant="ghost"
                        className="group relative min-h-[72px] w-full shrink-0 overflow-hidden rounded-[16px] border border-white/20 px-4 py-4 font-inter text-[clamp(1.125rem,4.5vw,2rem)] font-bold text-white shadow-lg backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-[0.98] sm:h-[92px] sm:min-h-[92px] sm:p-[30px] sm:text-[32px]"
                        style={{
                          background: cat.gradient,
                          boxShadow: cat.shadow,
                        }}
                        onClick={() => {
                          if (cat.title === "Positive Mindsets") {
                            navigate("/positive-mindset");
                          } else if (cat.title === "Unclear Mindsets") {
                            navigate("/unclear-mindset");
                          } else if (cat.title === "Negative Mindsets") {
                            navigate("/negative-mindset");
                          } else {
                            console.log(`Selected ${cat.title}`);
                          }
                        }}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        {cat.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MindsetSelect;
