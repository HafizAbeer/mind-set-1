import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Sidebar from "./Sidebar";
import mindsetLogo from "../../assets/mindset-logo.svg";
import collapseIcon from "../../assets/icons/collapse-icon.svg";

const RadarModuleLayout = ({
  moduleIcon: ModuleIconUrl,
  moduleTitle,
  moduleSubtitle,
  stepTitle,
  description,
  footerText,
  footerTitle = "Press Continue:",
  centerIcon: CenterIconUrl,
  themeColor = "linear-gradient(180deg, #FF7E7E 0%, #CD4343 100%)",
  themeGradient = "linear-gradient(180deg, #FF7E7E 0%, #CD4343 100%)",
  themeGradientGhost =
  "linear-gradient(180deg, rgba(255, 126, 126, 0.15) 0%, rgba(205, 67, 67, 0.15) 100%)",
  themeGhostCircle = "rgba(255, 89, 92, 0.20)",
  themeCardBg = "rgba(255, 89, 92, 0.24)",
  backButtonText = "Back",
  showInfoIcon = false,
  onBack,
  onContinue,
  onInfoClick,
  minimalHeader = true,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const portalTarget =
    typeof document !== "undefined" ? document.body : null;

  const sidebarOverlay =
    isSidebarOpen && portalTarget
      ? createPortal(
        <>
          <div
            className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-120 h-screen">
            <Sidebar
              isCollapsed={false}
              onToggle={() => setIsSidebarOpen(false)}
            />
          </div>
        </>,
        portalTarget,
      )
      : null;

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center overflow-hidden px-4 py-10 font-sans sm:px-6">
      {sidebarOverlay}

      <div className="pointer-events-none absolute inset-0 select-none opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="absolute left-4 top-8 z-50 flex items-center gap-4 sm:left-8">
        {minimalHeader ? (
          <div
            className="cursor-pointer transition-transform active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
          >
            <img src={mindsetLogo} alt="Logo" className="h-[44px] w-[44px]" />
          </div>
        ) : (
          <div className="flex w-full max-w-[220px] items-center justify-between rounded-xl border border-white/10 bg-[#1C1C24] p-2 pr-4 shadow-xl">
            <div
              className="flex cursor-pointer items-center gap-3 transition-transform active:scale-95"
              onClick={() => setIsSidebarOpen(true)}
            >
              <img src={mindsetLogo} alt="Logo" className="h-11 w-11" />
              <span className="font-inter text-[20px] font-semibold leading-[24px] text-white">
                New
                <br />
                Mindset
              </span>
            </div>
            <img
              src={collapseIcon}
              alt="Collapse"
              className="h-6 w-6 cursor-pointer object-contain transition-transform hover:scale-110"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-12 flex w-full max-w-[956px] flex-col gap-[28px] min-h-0">
        {(moduleTitle || moduleSubtitle) && (
          <div className="flex h-auto min-h-[68px] w-full items-center gap-4 sm:gap-[16px]">
            <img
              src={ModuleIconUrl}
              alt="Module Icon"
              className="h-9 w-9 shrink-0 object-contain"
            />
            <div className="min-w-0 flex flex-col">
              <h1 className="m-0 font-inter text-[clamp(22px,4vw,32px)] font-bold leading-tight tracking-[-0.3px] text-white sm:text-[32px] sm:leading-[36px]">
                {moduleTitle}
              </h1>
              <p className="m-0 font-inter text-[clamp(14px,3vw,20px)] font-medium leading-snug tracking-[-0.3px] text-[#9CA1A7] sm:text-[20px] sm:leading-[24px]">
                {moduleSubtitle}
              </p>
            </div>
          </div>
        )}

        <div className="flex w-full min-w-0 shrink-0 flex-col gap-[28px]">
          <Card
            className={cn(
              "relative flex w-full shrink-0 flex-col items-center justify-center rounded-[24px] border-0 p-6 text-center shadow-none transition-all sm:p-10 md:p-[56px]",
              "min-h-[500px] h-auto",
            )}
            style={{
              background: themeCardBg,
              border: `2px solid ${themeColor}`,
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            {showInfoIcon && (
              <div
                className="absolute bottom-4 right-4 cursor-pointer transition-opacity hover:opacity-80 sm:bottom-8 sm:right-8"
                onClick={onInfoClick}
              >
                <Info size={32} color={themeColor} />
              </div>
            )}

            <CardContent className="w-full max-w-[846px] p-0">
              <div className="flex w-full flex-col items-center justify-center gap-[clamp(20px,4vw,34px)]">
                <div className="flex w-full flex-col items-center gap-[clamp(16px,3vw,30px)]">
                  <h2 className="m-0 text-center font-inter text-[clamp(20px,4vw,28px)] font-bold leading-tight text-white sm:text-[28px] sm:leading-[32px]">
                    {stepTitle}
                  </h2>

                  <div className="m-0 w-full text-center font-inter text-[clamp(16px,3vw,24px)] font-medium leading-relaxed text-slate-200 sm:text-[24px] sm:leading-[32px]">
                    {description}
                  </div>
                </div>

                <div className="m-0 flex w-full max-w-[620px] flex-nowrap items-center justify-center gap-2 min-h-[80px] sm:gap-[8px]">
                  <div
                    className="h-[1.5px] min-w-0 flex-1 sm:w-[262px] sm:flex-none"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${themeColor} 100%)`,
                    }}
                  />

                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[69px] p-[18px] sm:h-[80px] sm:w-[80px]"
                    style={{
                      background: themeGhostCircle,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <img
                      src={CenterIconUrl || ModuleIconUrl}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div
                    className="h-[1.5px] min-w-0 flex-1 sm:w-[262px] sm:flex-none"
                    style={{
                      background: `linear-gradient(90deg, ${themeColor} 0%, transparent 100%)`,
                    }}
                  />
                </div>

                <div
                  className={cn(
                    "m-0 flex w-full flex-col items-center",
                    footerTitle ? "gap-[clamp(16px,3vw,30px)]" : "",
                  )}
                >
                  {footerTitle && (
                    <p className="m-0 text-center font-inter text-[clamp(18px,3.5vw,26px)] font-semibold leading-[32px] tracking-[0px] text-white">
                      {footerTitle}
                    </p>
                  )}
                  <p className="m-0 text-center font-inter text-[clamp(16px,3vw,24px)] font-medium leading-[28px] text-white">
                    {footerText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex w-full max-w-[956px] shrink-0 flex-col gap-4 pt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className={cn(
                "box-border h-auto min-h-[64px] w-full gap-2 whitespace-normal rounded-[10px] p-5 font-inter text-base font-bold text-white transition-all hover:bg-white/5 active:scale-95 lg:w-[min(468px,100%)]",
              )}
              style={{
                background: themeGradientGhost,
                border: `2px solid ${themeColor}`,
              }}
            >
              <ArrowLeft size={20} />
              {backButtonText}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onContinue}
              className={cn(
                "box-border h-auto min-h-[64px] w-full gap-2 whitespace-normal rounded-[10px] p-5 font-inter text-base font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 lg:w-[min(468px,100%)]",
              )}
              style={{
                background: themeGradient,
                border: `2px solid ${themeColor}`,
                boxShadow: `0 8px 24px -6px ${themeColor}80`,
              }}
            >
              Continue
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarModuleLayout;
