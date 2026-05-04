import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info } from "lucide-react";

import { LegacySidebarPortal } from "../components/dashboard/LegacySidebarPortal";
import mindsetLogo from "../assets/mindset-logo.svg";
import triggerLogo from "../assets/radarModulesIcon/trigger-blue-icon.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import CustomTriggerModal from "../components/dashboard/CustomTriggerModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  patchScreeningSelection,
  screeningDefaults,
  useScreeningSelection,
} from "@/lib/screeningSelection";

const TriggerRadar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mindsetLabel } = useScreeningSelection();

  const strivingOptions = [
    { id: 1, label: "health" },
    { id: 2, label: "partnership" },
    { id: 3, label: "wealth" },
    { id: 4, label: "work topics" },
    { id: 5, label: "love" },
    { id: 6, label: "parents" },
    { id: 7, label: "family" },
    { id: 8, label: "friends" },
    { id: 9, label: "hobbys" },
    { id: 10, label: "colleagues" },
    { id: 11, label: "success" },
    { id: 12, label: "leisure time" },
    { id: 13, label: "school / university" },
    { id: 14, label: "neighbourhood" },
    { id: 15, label: "family" },
    { id: 16, label: "children" },
    { id: 17, label: "dutys" },
    { id: 18, label: "contemporary events" },
    { id: 19, label: "no addictive behaviour" },
    { id: 20, label: "parents" },
    { id: 21, label: "work situation" },
    { id: 22, label: "sports" },
    { id: 23, label: "need to relax" },
  ];

  const aversionOptions = [
    { id: 24, label: "superiors" },
    { id: 25, label: "partnership" },
    { id: 26, label: "colleagues" },
    { id: 27, label: "obligations" },
    { id: 28, label: "ageing" },
    { id: 29, label: "ownership and possession" },
    { id: 30, label: "contemporary events" },
    { id: 31, label: "actual life situation" },
    { id: 32, label: "addictive craving" },
    { id: 33, label: "everyday stress" },
    { id: 34, label: "unclear trigger" },
    { id: 35, label: "financial matters" },
    { id: 36, label: "parents" },
    { id: 37, label: "experience of violence" },
    { id: 38, label: "experience of abuse" },
    { id: 39, label: "experience of injury" },
    { id: 40, label: "experience of bullying" },
    { id: 41, label: "death" },
    { id: 42, label: "work topics" },
    { id: 43, label: "dutys" },
    { id: 44, label: "school / university" },
    { id: 45, label: "work situation" },
    { id: 46, label: "illness" },
  ];

  const allTriggerOptions = [...strivingOptions, ...aversionOptions];

  const themeColor = "#3C56D8";
  const themeGradient = "linear-gradient(180deg, #738AFF 0%, #3C56D8 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <LegacySidebarPortal
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* <div className="absolute left-[13px] top-[21px] z-50">
        <div className="flex w-[220px] h-[72px] items-center justify-between rounded-[14px] border border-white/10 bg-[#34363D] p-[12px] shadow-xl">
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
            <span className="font-inter text-lg font-bold leading-tight text-white">
              New
              <br />
              <span className="text-slate-200">Mindset</span>
            </span>
          </div>
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all hover:bg-white/10 active:scale-90"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <img
              src={collapseIcon}
              alt="Collapse"
              className="h-6 w-6 object-contain rotate-180"
            />
          </div>
        </div>
      </div> */}

      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <div className="w-11 h-11 bg-[#3C56D8]/20 rounded-full flex items-center justify-center shrink-0">
                  <img src={triggerLogo} alt="Logo" className="w-9 h-9" />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Trigger Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select the current trigger of your mindset.
                  </p>
                </div>
              </div>

              <div className="w-full bg-[#3C56D8]/10 border border-[#3C56D8] rounded-[10px] p-[20px] flex items-center justify-center shrink-0 min-h-0 gap-3 relative">
                <Info
                  size={24}
                  className="shrink-0"
                />
                <div className="w-full max-w-[857px] flex flex-col items-center justify-center">
                  <p className="font-inter font-medium text-[24px] leading-[33px] tracking-[-2px] text-[#6B83FF] m-0 text-center">
                    You have chosen “
                    <span className="font-medium text-white">{mindsetLabel}</span>
                    ” as your mindset. What triggered this mindset?
                    <br />
                    Has it a Intentionful or an avoiding character?
                  </p>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setIsModalOpen(true)}
                variant="ghost"
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] border-0 bg-sidebar-bg flex items-center justify-center p-4 sm:p-[20px] transition-all shrink-0 font-inter font-semibold text-[16px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own Trigger</span>
                </div>
              </Button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#3C56D8] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                    <div className="flex flex-col gap-[10px] w-full items-center">
                      {strivingOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedId(opt.id)}
                          className={`w-full max-w-[440px] h-[44px] rounded-[10px] px-6 flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedId === opt.id
                            ? "bg-[#3C56D8] text-white border-[#3C56D8] shadow-[0_0_20px_rgba(60,86,216,0.3)]"
                            : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-[10px] w-full items-center">
                      {aversionOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedId(opt.id)}
                          className={`w-full max-w-[440px] h-[44px] rounded-[10px] px-6 flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedId === opt.id
                            ? "bg-[#3C56D8] text-white border-[#3C56D8] shadow-[0_0_20px_rgba(60,86,216,0.3)]"
                            : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex w-full px-[8px]">
                    <button
                      onClick={() => setSelectedId(0)}
                      className={`w-full h-[44px] rounded-[10px] px-6 flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedId === 0
                        ? "bg-[#3C56D8] text-white border-[#3C56D8]"
                        : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10"
                        }`}
                    >
                      no clear trigger
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between pb-4 sm:pb-8 shrink-0">
                <Button
                  type="button"
                  onClick={() => navigate("/mindset")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#526FFF] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all text-[15px] md:text-[20px] hover:opacity-90 active:scale-95 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #738AFF50, #3C56D850)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const triggerLabel =
                      selectedId === 0
                        ? "no clear trigger"
                        : allTriggerOptions.find((o) => o.id === selectedId)
                            ?.label ?? screeningDefaults.triggerLabel;
                    patchScreeningSelection({ triggerLabel });
                    navigate("/cause");
                  }}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#526FFF] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </Button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <CustomTriggerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TriggerRadar;
