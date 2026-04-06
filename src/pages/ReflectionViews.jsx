import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import reflectionIcon from "../assets/radarModulesIcon/reflection-yellow-icon.svg";
import micIcon from "../assets/icons/mic-icon.svg"

const ReflectionViews = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const setLegacySidebarOpen = outletContext?.setLegacySidebarOpen || (() => { });
  const [realisticValue, setRealisticValue] = useState("");
  const [theoreticalValue, setTheoreticalValue] = useState("");

  const Card = ({ title, placeholder, value, onChange }) => (
    <div
      className="w-full max-w-[554px] min-h-[400px] xl:h-[452px] rounded-[20px] p-6 sm:p-[32px] flex flex-col gap-[20px] shadow-xl relative"
      style={{
        backgroundColor: "rgba(240, 182, 20, 0.3)",
        border: "2px solid #F0B61480",
        backdropFilter: "blur(4px)",
      }}
    >
      <h2 className="text-[20px] sm:text-[24px] font-inter font-bold text-white text-center m-0">
        {title}
      </h2>

      <div
        className="flex-1 rounded-[16px] p-[20px] bg-[#27282E]/50 border border-[#F0B614] overflow-hidden"
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-[none] outline-none text-white font-inter text-[18px] leading-[28px] placeholder:text-[#C2C2C2] resize-none"
        />
      </div>

      <div className="flex items-center justify-between px-2">
        <button className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#FFD767] to-[#DFA400] flex items-center justify-center text-black hover:opacity-90 transition-all active:scale-90 shadow-lg">
          <Plus size={20} color="white" />
        </button>
        <button className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#FFD767] to-[#DFA400] flex items-center justify-center text-black hover:opacity-90 transition-all active:scale-90 shadow-lg">
          <img src={micIcon} alt="Logo" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center">
      {/* Brain Logo Top-Left */}
      <div
        className="absolute top-6 left-6 sm:top-[40px] sm:left-[40px] z-50 cursor-pointer transition-transform active:scale-95 hover:opacity-80"
        onClick={() => setLegacySidebarOpen(true)}
      >
        <img src={mindsetLogo} alt="Logo" className="w-10 h-10 sm:w-[52px] sm:h-[52px]" />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1128px] px-4 pt-40 pb-10 translate-y-[-20px]">
        {/* Page Header Area */}
        <div className="w-full flex items-center gap-[16px] mb-[40px]">
          <div className="flex items-center justify-center w-12 h-12 mt-3 shrink-0">
            <img src={reflectionIcon} alt="Logo" className="w-9 h-9" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] sm:text-[36px] font-inter font-bold text-white m-0 leading-[32px] sm:leading-[40px] tracking-[-0.3px]">
              Reflection Radar
            </h1>
            <p className="text-[16px] sm:text-[20px] font-inter font-medium text-[#9CA1A7] m-0 leading-[24px]">
              What could be ways to a different view on this situation?
            </p>
          </div>
        </div>

        {/* Inner Content Area: Cards + Buttons */}
        <div className="w-full flex flex-col items-center gap-[28px]">
          {/* Side by side cards */}
          <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-[20px]">
            <Card
              title="realistic steps"
              placeholder="Write here your first realistic steps..."
              value={realisticValue}
              onChange={setRealisticValue}
            />
            <Card
              title="theoretical assumptions"
              placeholder="Write here your Intentionful thoughts..."
              value={theoreticalValue}
              onChange={setTheoreticalValue}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-[20px]">
            <button
              onClick={() => navigate("/reflection-questions")}
              className="w-full xl:w-[554px] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:bg-white/5 active:scale-95 border-2 border-[#F0B614] text-[18px] sm:text-[20px]"
              style={{
                background: "linear-gradient(180deg, rgba(240, 182, 20, 0.4) 0%, rgba(223, 164, 0, 0.4) 100%)",
              }}
            >
              <ArrowLeft size={24} className="shrink-0" />
              Back
            </button>
            <button
              onClick={() => navigate("/body")}
              className="w-full xl:w-[554px] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 border-2 border-[#F0B614] text-[18px] sm:text-[20px]"
              style={{
                background: "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
                boxShadow: "0 8px 24px -6px rgba(240, 182, 20, 0.4)",
              }}
            >
              Continue
              <ArrowRight size={24} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #F0B614;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ReflectionViews;
