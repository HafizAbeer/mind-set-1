import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Plus, Info } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import CustomCauseModal from "../components/dashboard/CustomCauseModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CauseSelect = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(5); // Default: 'generalise' per image
  const [isModalOpen, setIsModalOpen] = useState(false);

  const causeOptions = [
    { id: 1, label: "Catastrophising" },
    { id: 2, label: "Black and White thinking" },
    { id: 3, label: "Excessive self-criticism" },
    { id: 4, label: "Perfektionism" },
    { id: 5, label: "generalise" },
    { id: 6, label: "unressived traumas" },
    { id: 7, label: "fear of failure" },
    { id: 8, label: "stubbornness" },
    { id: 9, label: "Low self-esteem" },
    { id: 10, label: "comparisons with others" },
    { id: 11, label: "fear of refusal" },
    { id: 12, label: "no expectations" },
    { id: 13, label: "disappointed expectations" },
    { id: 14, label: "overly high expectations" },
    { id: 15, label: "negative beliefs" },
    { id: 16, label: "projections of one's own weaknesses" },
    { id: 17, label: "fear of financial difficulties" },
    { id: 18, label: "fear of one's own courage" },
    { id: 19, label: "old behaviour patterns" },
    { id: 20, label: "self-protection against disappointment" },
    { id: 21, label: "memories of separation" },
    { id: 22, label: "repressed aggression" },
    { id: 23, label: "feeling of faintness" },
    { id: 24, label: "inner turmoil" },
    { id: 25, label: "Need for closeness" },
    { id: 26, label: "desire for shelter" },
    { id: 27, label: "(chronic) illness" },
    { id: 28, label: "overburdening" },
    { id: 29, label: "high ambitions" },
    { id: 30, label: "melancholy" },
    { id: 31, label: "impatience" },
    { id: 32, label: "hope" },
    { id: 33, label: "confidence" },
    { id: 34, label: "humility" },
    { id: 35, label: "destructive beliefs" },
    { id: 36, label: "early experiences of powerlessness" },
    { id: 37, label: "pessimistic disposition" },
    { id: 38, label: "devaluation in childhood" },
    { id: 39, label: "fear of not being understood" },
    { id: 40, label: "desire to repress memories" },
    { id: 41, label: "desire for freedom" },
    { id: 42, label: "need for harmony" },
    { id: 43, label: "feeling of being responsible" },
    { id: 44, label: "feeling of being guilty" },
    { id: 45, label: "need for rest and relaxation" },
    { id: 46, label: "desire for belonging" },
    { id: 47, label: "Not feeling taken seriously" },
    { id: 48, label: "fear of devaluation" },
    { id: 49, label: "fear of failure" },
    { id: 50, label: "being critiqued" },
    { id: 51, label: "search for love" },
    { id: 52, label: "need for comprehension" },
    { id: 53, label: "joy of creating" },
    { id: 54, label: "fear of being useless" },
    { id: 55, label: "need for appreciation" },
    { id: 56, label: "desire to be needed" },
    { id: 57, label: "desire for recognition" },
    { id: 58, label: "consider myself indispensable" },
  ];

  const themeColor = "#5EAE41";
  const themeGradient = "linear-gradient(180deg, #96FF71 0%, #5EAE41 100%)";

  const leftColumn = causeOptions.filter((_, i) => i % 2 === 0);
  const rightColumn = causeOptions.filter((_, i) => i % 2 !== 0);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden">
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">
            {/* spacer keeps the same horizontal layout on larger screens, matching header width (220px + 13px left) */}

            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <Search size={36} className="text-[#96FF71] shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Cause Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select the deeper cause of your trigger
                  </p>
                </div>
              </div>

              <div className="w-full min-h-0 bg-[#88EC65]/10 border-2 border-[#88EC65] rounded-[16px] p-[20px] flex items-center justify-center gap-[8px] shrink-0 relative">
                <Info size={24} className="shrink-0" />
                <div className="w-full max-w-[857px] flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[24px] leading-[34px] tracking-[0px] text-[#96FF71] m-0 text-center">
                    You have identified{" "}
                    <span className="font-semibold italic text-white">
                      “Trigger”
                    </span>{" "}
                    as your trigger for{" "}
                    <span className="font-semibold italic text-white">
                      “Mindset”
                    </span>{" "}
                    as mindset.
                    <br />
                    What was the underlying cause of this combination?
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
                  <span>Add your own Cause</span>
                </div>
              </Button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#5EAE41] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                  <div className="flex flex-col gap-[10px] w-full items-center">
                    {leftColumn.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedId(opt.id)}
                        className={`w-full max-w-[440px] h-[48px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${
                          selectedId === opt.id
                            ? "text-white border-transparent shadow-lg active:scale-95"
                            : "text-[#C5C5C5] hover:text-white"
                        }`}
                        style={{
                          background:
                            selectedId === opt.id
                              ? themeGradient
                              : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                          borderColor:
                            selectedId === opt.id ? "#88EC65" : "transparent",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-[10px] w-full items-center">
                    {rightColumn.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedId(opt.id)}
                        className={`w-full max-w-[440px] h-[48px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${
                          selectedId === opt.id
                            ? "text-white border-transparent shadow-lg active:scale-95"
                            : "text-[#C5C5C5] hover:text-white"
                        }`}
                        style={{
                          background:
                            selectedId === opt.id
                              ? themeGradient
                              : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                          borderColor:
                            selectedId === opt.id ? "#88EC65" : "transparent",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full flex justify-center mt-[10px]">
                  <button
                    onClick={() => setSelectedId(999)}
                    className={`w-full max-w-[440px] md:max-w-[928px] h-[48px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${
                      selectedId === 999
                        ? "text-white border-transparent shadow-lg active:scale-95"
                        : "text-[#C5C5C5] hover:text-white"
                    }`}
                    style={{
                      background:
                        selectedId === 999
                          ? themeGradient
                          : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                      borderColor:
                        selectedId === 999 ? "#88EC65" : "transparent",
                    }}
                  >
                    no can't identify a definite cause
                  </button>
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <Button
                  type="button"
                  onClick={() => navigate("/cause")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#88EC65] text-[15px] md:text-[20px] hover:opacity-90 hover:bg-transparent! active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(180deg, #96FF7150, #5EAE4150)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back to Cause
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/reflection")}
                  variant="ghost"
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#88EC65] text-[15px] md:text-[20px] hover:opacity-90 hover:bg-transparent! active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue to Reflection
                  <ArrowRight size={24} className="shrink-0" />
                </Button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <CustomCauseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CauseSelect;
