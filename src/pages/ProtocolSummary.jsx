import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import newScriptIcon from "../assets/radarModulesIcon/newScript-purple-icon.svg";
import { useScreeningSelection, splitMindsetSentence } from "@/lib/screeningSelection";

const accent = "#CE5CFF";

const Highlight = ({ children }) => (
  <span className="font-semibold" style={{ color: accent }}>
    {children}
  </span>
);

const ProtocolSummary = () => {
  const navigate = useNavigate();
  const {
    mindsetPhrase,
    mindsetSentence,
    triggerLabel,
    causeLabel,
    bodyStructureLabel,
    symptomSummary,
    intentionLabel,
    lifeScriptLabel,
    oldScriptSummary,
    newScriptSummary,
  } = useScreeningSelection();

  const themeGradient = "linear-gradient(180deg, #CE5CFF 0%, #9228C0 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6">
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">
            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img
                  src={newScriptIcon}
                  alt="Icon"
                  className="w-12 h-12 object-contain shrink-0"
                />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Protocol Summary
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    A review of what you discovered through the protocol
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full">
                <div
                  className="w-full h-auto rounded-[32px] p-6 sm:p-12 flex flex-col items-center justify-center text-center gap-6 sm:gap-8 border-2 shadow-2xl relative overflow-hidden"
                  style={{
                    borderColor: accent,
                    background:
                      "linear-gradient(135deg, rgba(206, 92, 255, 0.35) 0%, rgba(146, 40, 192, 0.35) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex flex-col gap-4 sm:gap-5 max-w-[820px]">
                    <p className="text-[clamp(16px,3.5vw,20px)] font-inter font-medium text-white/95 leading-relaxed">
                      {splitMindsetSentence(mindsetSentence).map((seg, i) => {
                        if (seg === "[mindset]")
                          return <Highlight key={i}>{mindsetPhrase}</Highlight>;
                        if (seg === "[trigger]")
                          return <Highlight key={i}>{triggerLabel}</Highlight>;
                        return <React.Fragment key={i}>{seg}</React.Fragment>;
                      })}
                      , caused by <Highlight>{causeLabel}</Highlight>.
                    </p>
                    <p className="text-[clamp(16px,3.5vw,20px)] font-inter font-medium text-white/95 leading-relaxed">
                      In my body I notice{" "}
                      <Highlight>{bodyStructureLabel}</Highlight>, with symptoms
                      of <Highlight>{symptomSummary}</Highlight>.
                    </p>
                    <p className="text-[clamp(16px,3.5vw,20px)] font-inter font-medium text-white/95 leading-relaxed">
                      My positive intention for the future is{" "}
                      <Highlight>{intentionLabel}</Highlight>.
                    </p>
                    <p className="text-[clamp(16px,3.5vw,20px)] font-inter font-medium text-white/95 leading-relaxed">
                      My life script is <Highlight>{lifeScriptLabel}</Highlight>
                      ; my old script was{" "}
                      <Highlight>{oldScriptSummary}</Highlight>, and from now on
                      I want <Highlight>{newScriptSummary}</Highlight>.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 mt-2">
                    <Sparkles size={32} style={{ color: accent }} />
                    <p className="text-[clamp(22px,4.5vw,30px)] font-inter font-bold text-white leading-tight">
                      Well done — you’ve completed your protocol.
                    </p>
                    <p className="text-[clamp(14px,3.2vw,17px)] font-inter font-medium text-white/85 italic leading-relaxed max-w-[640px]">
                      Carry these insights with you as you move on to measure
                      your success.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/new-script-select")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#CE5CFF]/50 text-[15px] md:text-[20px] hover:bg-[#CE5CFF]/10 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(180deg, #CE5CFF50, #9228C050)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/success-gauge")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#CE5CFF] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue to Success Gauge
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

export default ProtocolSummary;
