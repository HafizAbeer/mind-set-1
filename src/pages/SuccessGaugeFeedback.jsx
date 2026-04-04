import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import successGaugeIcon from "../assets/radarModulesIcon/successGuage-red-icon.svg";

const SuccessGaugeFeedback = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const themeGradient = "linear-gradient(180deg, #E17373 0%, #A34545 100%)";

  return (
    <div className="min-h-screen flex items-center justify-center overflow-auto custom-scrollbar bg-[#0d0d14]">
      <div
        className="relative flex text-white overflow-hidden font-sans transition-all duration-300"
        style={{
          width: "1400px",
          maxHeight: "100vh",
          height: "1024px",
        }}
      >
        <div
          className={`absolute left-0 top-0 h-full z-[100] transition-all duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          <Sidebar
            isCollapsed={false}
            onToggle={() => setIsSidebarOpen(false)}
          />
        </div>

        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex w-full h-full p-6 pb-0 gap-[40px] relative z-10 overflow-hidden">
          <div className="flex flex-col gap-4 shrink-0 mt-2">
            <div className="flex items-center w-[220px] h-[72px] justify-between bg-[#1C1C24] p-2 pr-4 rounded-xl border border-white/10 shadow-xl">
              <div
                className="flex items-center gap-3 cursor-pointer transition-transform active:scale-95"
                onClick={() => setIsSidebarOpen(true)}
              >
                <img src={mindsetLogo} alt="Logo" className="w-11 h-11" />
                <span className="font-inter text-[20px] leading-[24px] font-semibold text-white">
                  New
                  <br />
                  Mindset
                </span>
              </div>
              <img
                src={collapseIcon}
                alt="Collapse"
                className="w-6 h-6 object-contain cursor-pointer transition-transform hover:scale-110"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </div>
          </div>

          <div className="w-[956px] h-auto mt-15 items-start flex flex-col gap-[24px] overflow-hidden">
            <div className="flex items-center h-[60px] gap-[16px] w-full shrink-0">
              <img
                src={successGaugeIcon}
                alt="Icon"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col justify-center h-full w-auto gap-0">
                <h1 className="text-[32px] font-inter font-bold text-white m-0 leading-[32px] tracking-[-0.3px] h-[32px] flex items-center">
                  Succes Gauge
                </h1>
                <p className="text-[20px] font-inter font-medium text-[#C5C5C5] m-0 leading-[24px] h-[24px] flex items-center mt-2 whitespace-nowrap">
                  Your personalized feedback
                </p>
              </div>
            </div>

            <div className="w-[956px] h-auto items-start flex flex-col gap-[24px] shrink-0">
              <div className="flex flex-col gap-2 w-[896px]">
                <h2 className="text-[28px] font-inter font-bold text-[#E17373] m-0">
                  Feedback
                </h2>
                <p className="text-[18px] font-inter font-medium text-[#C5C5C5] m-0">
                  Personalized feedback for slight improvement
                </p>
              </div>

              <div
                className="w-[956px] h-auto rounded-[32px] p-12 flex flex-col items-center justify-center text-center gap-8 border-[2px] border-[#D16868] shadow-2xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(225, 115, 115, 0.4) 0%, rgba(163, 69, 69, 0.4) 100%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3 className="text-[36px] font-inter font-bold text-[#D16868] tracking-tight">
                  Slight Improvement
                </h3>

                <div className="flex flex-col gap-6 max-w-[700px]">
                  <p className="text-[24px] font-inter font-bold text-white leading-relaxed">
                    Okay, fine, you are improving your Mindset.
                  </p>
                  <p className="text-[22px] font-inter font-medium text-[#FFECEC] leading-relaxed">
                    Let's keep on following the mindful protocol and continue
                    building on this positive momentum. Every small step counts!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-[956px] mt-4 mb-4 shrink-0 gap-[16px]">
              <button
                onClick={() => navigate("/slight-improvement")}
                className="w-full h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[16px] font-inter font-bold text-white transition-all shadow-lg border-[1px] border-[#D1686880] text-[20px] active:scale-95 bg-white/5"
                style={{
                  background: "rgba(215, 105, 105, 0.15)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                <ArrowLeft size={24} className="shrink-0" />
                Back
              </button>
              <button
                onClick={() => navigate("/reward-choice")}
                className="w-full h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[16px] font-inter font-bold text-white transition-all shadow-lg border-[1px] border-[#D1686880] text-[20px] active:scale-95"
                style={{
                  background: "linear-gradient(180deg, #E17373, #A34545)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                Start a new protocol
                <ArrowRight size={24} className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessGaugeFeedback;
