import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { LegacySidebarPortal } from "../components/dashboard/LegacySidebarPortal";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import CustomMindsetModal from "../components/dashboard/CustomMindsetModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NegativeMindset = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(14);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mindsetOptions = [
    { id: 1, label: "anger / rage about..." },
    { id: 2, label: "bothered by..." },
    { id: 3, label: "worries about..." },
    { id: 4, label: "disappointment with..." },
    { id: 5, label: "feeling of senselessness" },
    { id: 6, label: "feeling of loss of control over" },
    { id: 7, label: "unable to cope with..." },
    { id: 8, label: "burned out by..." },
    { id: 9, label: "felt offended by..." },
    { id: 10, label: "felt attacked by..." },
    { id: 11, label: "unsatisfied with..." },
    { id: 12, label: "guilty feeling about..." },
    { id: 13, label: "humiliated by..." },
    { id: 14, label: "anxiety about..." },
    { id: 15, label: "betrayed by..." },
    { id: 16, label: "desperate about..." },
    { id: 17, label: "impatient for..." },
    { id: 18, label: "pain" },
    { id: 19, label: "fear of..." },
    { id: 20, label: "reluctance against..." },
    { id: 21, label: "frustrated by..." },
    { id: 22, label: "rejection from" },
    { id: 23, label: "traumatic memory of..." },
    { id: 24, label: "financial difficulties" },
    { id: 25, label: "mourn for..." },
    { id: 26, label: "illness of..." },
    { id: 27, label: "harassed by..." },
    { id: 28, label: "future fears about..." },
    { id: 29, label: "bored by..." },
    { id: 30, label: "feeling misunderstood by..." },
    { id: 31, label: "be at a loss about..." },
    { id: 32, label: "feel disoriented" },
    { id: 33, label: "weary of life" },
    { id: 34, label: "depressed" },
  ];

  const themeColor = "#B23737";
  const themeGradient = "linear-gradient(180deg, #FF646A 0%, #B23737 100%)";

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
            {/* spacer keeps the same horizontal layout on larger screens, matching header width (220px + 13px left) */}
            {/* <div className="hidden xl:flex w-[233px] shrink-0 h-full" /> */}

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <Brain size={36} className="text-[#FF6A6A] shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Negative Mindset
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Which mindset is bothering you right now?
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
                  <span>Add your own Mindset</span>
                </div>
              </Button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#FF6A6A] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] lg:gap-x-[48px] gap-y-[12px] sm:gap-y-[16px]">
                  {mindsetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedId(opt.id)}
                      className={`h-[52px] rounded-[10px] px-6 flex items-center justify-between transition-all font-inter font-medium text-[16px] border ${selectedId === opt.id
                        ? "bg-[#FF646A] text-black border-[#FF646A] shadow-[0_0_20px_rgba(255,100,106,0.3)]"
                        : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10"
                        }`}
                    >
                      <span className="truncate pr-2">{opt.label}</span>
                      <span
                        className={`text-[12px] font-bold shrink-0 ${selectedId === opt.id ? "text-black/60" : "text-slate-500"}`}
                      >
                        - 2 p
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <Button
                  type="button"
                  onClick={() => navigate("/mindset-select")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#FF646A] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 text-[15px] md:text-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #FF646A50, #B2373750)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/trigger")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#FF646A] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg text-[15px] md:text-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #FF646A 0%, #B23737 100%)",
                  }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomMindsetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category="negative"
      />
    </div>
  );
};

export default NegativeMindset;
