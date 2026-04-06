import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import successGaugeIcon from "../assets/radarModulesIcon/successGuage-red-icon.svg";

const LittleWorsening = () => {
  const navigate = useNavigate();

  const characteristics = [
    "More frequent dark thoughts",
    "Frequent bad mod",
    "daily disturb sleep quality",
    "Less improvements",
    "More aid needed",
    "Tendency to Worse",
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
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2 lowercase first-letter:uppercase">
                    Little worsening
                  </p>
                </div>
              </div>

              <div className="w-full flex-1 min-h-[300px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#D16868] rounded-[24px] relative overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-4 mb-8">
                  <h2 className="text-[clamp(20px,4vw,28px)] font-inter font-bold text-[#E17373] m-0">
                    Little Worsening
                  </h2>
                  <p className="text-[clamp(14px,3.5vw,18px)] font-inter font-medium text-[#C5C5C5] m-0">
                    Characteristics of this development stage.
                  </p>
                </div>

                <div className="flex flex-col gap-[12px] w-full">
                  {characteristics.map((item, index) => (
                    <div
                      key={index}
                      className="min-h-[64px] w-full rounded-[16px] p-[16px_20px] flex items-center justify-center transition-all font-inter font-bold text-[18px] sm:text-[20px] border-[#D1686880] text-white text-center"
                      style={{
                        background: "linear-gradient(135deg, #E1737350, #A3454550)",
                        borderWidth: "1px 1px 1px 5px",
                        borderStyle: "solid"
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/success-gauge-select")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[15px] md:text-[20px] active:scale-95 bg-white/5"
                  style={{
                    background: "linear-gradient(135deg, #E1737350, #A3454550)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/little-worsening-feedback")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[15px] md:text-[20px] active:scale-95 bg-white/5"
                  style={{
                    background: "linear-gradient(180deg, #E17373, #A34545)",
                  }}
                >
                  View Feedback
                  <ArrowRight size={24} className="shrink-0" />
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

export default LittleWorsening;
