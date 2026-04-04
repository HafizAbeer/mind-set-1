import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import successGaugeIcon from "../assets/radarModulesIcon/successGuage-red-icon.svg";

const NoChangingsFeedback = () => {
  const navigate = useNavigate();

  const themeGradient = "linear-gradient(180deg, #E17373 0%, #A34545 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">

            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img src={successGaugeIcon} alt="Icon" className="w-12 h-12 object-contain shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Success Gauge
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Your personalized feedback
                  </p>
                </div>
              </div>

              {/* <div className="w-full flex-1 min-h-0 p-4 sm:p-[32px] md:p-[40px] border-2 border-[#D16868] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar"> */}
              <div className="flex flex-col gap-2 w-full mt-6 mb-6">
                <h2 className="text-[clamp(20px,4vw,28px)] font-inter font-bold text-[#E17373] m-0">
                  Feedback
                </h2>
                <p className="text-[clamp(14px,3.5vw,18px)] font-inter font-medium text-[#C5C5C5] m-0">
                  Personalized feedback for No changes
                </p>
              </div>

              <div className="flex flex-col items-center justify-center w-full">
                <div
                  className="w-full h-auto rounded-[32px] p-6 sm:p-12 flex flex-col items-center justify-center text-center gap-6 sm:gap-8 border-2 border-[#D16868] shadow-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #E1737350, #A3454550)",
                  }}
                >
                  <h3 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-[#D16868]">
                    No Changes
                  </h3>
                  <div className="flex flex-col gap-4 sm:gap-6 max-w-[700px]">
                    <p className="text-[clamp(20px,4vw,28px)] font-inter font-bold text-white leading-tight">
                      Do not doubt!
                    </p>
                    <p className="text-[clamp(16px,3.5vw,20px)] font-inter font-medium text-white/95 leading-relaxed">
                      your goal of managing your stress and symptoms through mindfulness. Time will help you, patience is one of the best mindsets to help you cope with your stress.
                    </p>
                    <p className="text-[clamp(15px,3.5vw,18px)] font-inter font-medium text-white/90 leading-relaxed">
                      Let us continue and work together to achieve success.
                    </p>
                  </div>
                </div>
              </div>
              {/* </div> */}

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/no-changings")}
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
                  onClick={() => navigate("/reward-choice")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[15px] md:text-[20px] active:scale-95 bg-white/5"
                  style={{
                    background: "linear-gradient(180deg, #E17373, #A34545)",
                  }}
                >
                  Start a new protocol
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

export default NoChangingsFeedback;
