import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { LegacySidebarPortal } from "../components/dashboard/LegacySidebarPortal";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import RadarPageHeader from "../components/dashboard/RadarPageHeader";
import CustomMindsetModal from "../components/dashboard/CustomMindsetModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  patchScreeningSelection,
  screeningDefaults,
} from "@/lib/screeningSelection";

const UnclearMindset = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);

  const baseMindsetOptions = [
    { id: 1, label: "uncertain about...", mindset: "uncertain", sentence: "I feel [mindset] about [trigger]" },
    { id: 2, label: "excitement from...", mindset: "excitement", sentence: "I feel [mindset] from [trigger]" },
    { id: 3, label: "jealous of...", mindset: "jealous", sentence: "I am [mindset] of [trigger]" },
    { id: 4, label: "missing...", mindset: "missing", sentence: "I am [mindset] [trigger]" },
    { id: 5, label: "hunger and thirst of...", mindset: "hunger and thirst", sentence: "I have [mindset] of [trigger]" },
    { id: 6, label: "doubts about...", mindset: "doubts", sentence: "I have [mindset] about [trigger]" },
    { id: 7, label: "exhaustion from...", mindset: "exhaustion", sentence: "I feel [mindset] from [trigger]" },
    { id: 8, label: "sense of duty for...", mindset: "sense of duty", sentence: "I feel a [mindset] for [trigger]" },
    { id: 9, label: "craving for...", mindset: "craving", sentence: "I have a [mindset] for [trigger]" },
    { id: 10, label: "expectation of...", mindset: "expectation", sentence: "I have an [mindset] of [trigger]" },
    { id: 11, label: "fatigue through...", mindset: "fatigue", sentence: "I feel [mindset] through [trigger]" },
    { id: 12, label: "challenged by...", mindset: "challenged", sentence: "I feel [mindset] by [trigger]" },
    { id: 13, label: "lamp fever", mindset: "lamp fever", sentence: "I feel [mindset] about [trigger]" },
    { id: 14, label: "responsibility for...", mindset: "responsibility", sentence: "I feel [mindset] for [trigger]" },
    { id: 15, label: "sceptic about...", mindset: "sceptic", sentence: "I am [mindset] about [trigger]" },
    { id: 16, label: "sacrificing oneself for", mindset: "sacrificing myself", sentence: "I am [mindset] for [trigger]" },
    { id: 17, label: "search for sense", mindset: "sense", sentence: "I search for [mindset] in [trigger]" },
    { id: 18, label: "sacrificing oneself for", mindset: "sacrificing myself", sentence: "I am [mindset] for [trigger]" },
  ];

  const mindsetOptions = [...customOptions, ...baseMindsetOptions];

  const handleAddCustom = (text) => {
    const nextId =
      Math.max(
        0,
        ...baseMindsetOptions.map((o) => o.id),
        ...customOptions.map((o) => o.id),
      ) + 1;
    setCustomOptions((prev) => [
      {
        id: nextId,
        label: text,
        mindset: text,
        sentence: "I feel [mindset] about [trigger]",
      },
      ...prev,
    ]);
    setSelectedId(nextId);
  };

  const themeColor = "#C3840B";
  const themeGradient = "linear-gradient(180deg, #FFC350 0%, #C3840B 100%)";

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

      <div className="h-full flex items-start justify-center pt-[20px] pb-4 overflow-y-auto custom-scrollbar">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6">
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">
            {/* spacer keeps the same horizontal layout on larger screens, matching header width (220px + 13px left) */}
            {/* <div className="hidden xl:flex w-[233px] shrink-0 h-full" /> */}

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <RadarPageHeader
                icon={<Brain size={36} className="text-[#FFC350]" />}
                title="Unclear Mindset"
                subtitle="Which mindset is unclear to you right now?"
              />

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

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#FFC350] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] lg:gap-x-[48px] gap-y-[12px] sm:gap-y-[16px]">
                  {mindsetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedId(opt.id)}
                      className={`h-[52px] rounded-[10px] px-6 flex items-center justify-between transition-all font-inter font-medium text-[16px] border ${
                        selectedId === opt.id
                          ? "bg-[#FFC350] text-black border-[#FFC350] shadow-[0_0_20px_rgba(255,195,80,0.3)]"
                          : "bg-white/5 text-slate-100 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className="truncate pr-2">{opt.label}</span>
                      <span
                        className={`text-[12px] font-bold shrink-0 ${selectedId === opt.id ? "text-black/60" : "text-slate-500"}`}
                      >
                        + 1 p
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-5 sm:pb-8 shrink-0">
                <Button
                  type="button"
                  onClick={() => navigate("/mindset-select")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#FFC350] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 text-[15px] md:text-[20px]"
                  style={{
                    background: "linear-gradient(180deg, #FFC35050, #C3840B50)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const option = mindsetOptions.find((o) => o.id === selectedId);
                    const label = option?.label ?? screeningDefaults.mindsetLabel;
                    const phrase = option?.mindset ?? screeningDefaults.mindsetPhrase;
                    const sentence = option?.sentence ?? screeningDefaults.mindsetSentence;
                    patchScreeningSelection({
                      mindsetLabel: label,
                      mindsetCategory: "Unclear",
                      mindsetPhrase: phrase,
                      mindsetSentence: sentence,
                    });
                    navigate("/trigger");
                  }}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] border-2 border-[#FFC350] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg text-[15px] md:text-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFC350 0%, #C3840B 100%)",
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
        onAdd={handleAddCustom}
        category="unclear"
      />
    </div>
  );
};

export default UnclearMindset;
