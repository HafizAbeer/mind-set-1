import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import successGaugeIcon from "../assets/radarModulesIcon/successGuage-red-icon.svg";

const SuccessGaugeSelect = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1); // Default selected: Slight Improvement (id 1)

  const options = [
    { id: 1, label: "Slight Improvement" },
    { id: 2, label: "Clear Improvement" },
    { id: 3, label: "Inconstant Development" },
    { id: 4, label: "Mostly Problem Free" },
    { id: 5, label: "Little Worsening" },
    { id: 6, label: "No Changings" },
    { id: 7, label: "Long time Problem Free" },
  ];

  const themeColor = "#D16868";
  const themeGradient = "linear-gradient(180deg, #E17373 0%, #A34545 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img src={successGaugeIcon} alt="Icon" className="w-12 h-12 object-contain shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Success Gauge
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select the current mindset development.
                  </p>
                </div>
              </div>

              <div className="w-full flex-1 min-h-[400px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#D16868] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-4 mb-8">
                  <h2 className="text-[clamp(20px,4vw,28px)] font-inter font-bold text-[#E17373] m-0">
                    Mindset development
                  </h2>
                  <p className="text-[clamp(14px,3.5vw,18px)] font-inter font-medium text-[#C5C5C5] m-0">
                    Select the option that best represents your current development.
                  </p>
                </div>

                <div className="flex flex-col gap-[12px] w-full">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedId(option.id);
                        const routeMap = {
                          "Slight Improvement": "/slight-improvement",
                          "Clear Improvement": "/clear-improvement",
                          "Inconstant Development": "/inconstant-development",
                          "Mostly Problem Free": "/mostly-problem-free",
                          "Little Worsening": "/little-worsening",
                          "No Changings": "/no-changings",
                          "Long time Problem Free": "/long-time-problem-free",
                        };
                        if (routeMap[option.label]) {
                          navigate(routeMap[option.label]);
                        }
                      }}
                      className={`min-h-[64px] sm:min-h-[80px] w-full rounded-[16px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-bold text-[18px] sm:text-[22px] border-2 ${selectedId === option.id
                        ? "text-white border-transparent shadow-lg active:scale-[0.98]"
                        : "text-white hover:bg-white/5"
                        }`}
                      style={{
                        background: selectedId === option.id ? themeGradient : "#27282E",
                        borderColor: selectedId === option.id ? "#D16868" : "#83848A",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/success-gauge")}
                  className="w-full max-w-[956px] h-[64px] sm:h-[70px] rounded-[16px] flex items-center justify-center gap-[12px] p-[14px_15px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[18px] sm:text-[22px] hover:bg-[#D16868]/10 active:scale-95"
                  style={{
                    background: "linear-gradient(180deg, #E1737350, #8B3A3A50)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessGaugeSelect;
