import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Plus,
  X,
  Link as LinkIcon,
} from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import reflectionIcon from "../assets/radarModulesIcon/reflection-yellow-icon.svg";
import { useScreeningSelection } from "@/lib/screeningSelection";

const ReflectionQuestions = () => {
  const navigate = useNavigate();
  const { mindsetLabel, triggerLabel, causeLabel } = useScreeningSelection();
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const questions = [
    "What was the exact trigger?",
    "Is there another possible explanation for the situation?",
    "Am I personalizing something that doesn't just have to do with me?",
    "How important is this whole situation?",
    "What experiences are this feelings/thoughts based on?",
    "How did you and how intended you to behave or react?",
    "Does someone (even you) benefit from this view and how?",
    "What could be the consequences of this statement?",
    "What could be ways to a different view on this situation?",
    "Does this relate to a larger issue in your life?",
    "Who are you angry with, but won't admit it?",
    "What part of yourself are you hiding?",
    "Why do you remain the way you are?",
    "What part of yourself did you kill to survive?",
    "Does this relate to a larger issue in your life?",
    "Did you maybe miss some related information?",
    "What would you like to see happen next?",
    "What fear your are afraid facing?",
    "I'm not sure about this questions and want to skip, going to the next step",
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img
                  src={reflectionIcon}
                  alt="Reflection Icon"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Reflection Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    What do you consider to be the significance of this combination?
                  </p>
                </div>
              </div>

              <div
                className="w-full min-h-0 bg-[#EAF408]/10 border-2 border-[#F0B614] rounded-[16px] p-4 sm:p-[20px] flex items-center gap-[8px] shrink-0"
              >
                <Info size={24} color="white" className="shrink-0" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-medium text-[clamp(16px,4vw,24px)] leading-tight sm:leading-[36px] tracking-[0px] text-[#F0B614] m-0 text-center">
                    You have identified{" "}
                    <span className="text-white italic">“{triggerLabel}”</span> as your
                    trigger for{" "}
                    <span className="text-white italic">“{mindsetLabel}”</span> as
                    stressor. <br className="hidden sm:block" />
                    <span className="text-white italic">“{causeLabel}”</span> you defined
                    as the the deeper cause for the result. <br className="hidden sm:block" />
                    Try to openly reflect on at least one of the considerations.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] border-0 bg-sidebar-bg flex items-center justify-center p-4 sm:p-[20px] transition-all shrink-0 font-inter font-semibold text-[16px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own Question</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#F0B614] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-[12px] w-full items-center">
                  {questions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedId(index);
                        // ... (navigation logic preserved)
                        if (index === 0) {
                          navigate("/reflection-trigger");
                        } else if (
                          (index >= 1 && index <= 3) ||
                          index === 6 ||
                          index === 9 ||
                          index === 14 ||
                          index === 15
                        ) {
                          navigate("/reflection-aspects");
                        } else if (
                          index === 4 ||
                          index === 10 ||
                          index === 11 ||
                          index === 12 ||
                          index === 13 ||
                          index === 16 ||
                          index === 17
                        ) {
                          navigate("/reflection-experiences");
                        } else if (index === 5) {
                          navigate("/reflection-behaviour");
                        } else if (index === 7) {
                          navigate("/reflection-consequences");
                        } else if (index === 8) {
                          navigate("/reflection-views");
                        } else if (index === 18) {
                          navigate("/body");
                        }
                      }}
                      className={`w-full max-w-[896px] h-auto min-h-[56px] p-4 rounded-[10px] border transition-all active:scale-[0.99] font-inter text-[16px] sm:text-[18px] font-medium text-center ${selectedId === index
                        ? "text-white border-[#F0B614]"
                        : "bg-[#27282E] border-[#83848A] text-white hover:bg-white/5"
                        }`}
                      style={{
                        background:
                          selectedId === index
                            ? "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)"
                            : undefined,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/reflection")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:bg-white/5 active:scale-95 border-2 border-[#F0B614] text-[15px] md:text-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(240, 182, 20, 0.4) 0%, rgba(223, 164, 0, 0.4) 100%)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/body")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 border-2 border-[#F0B614] text-[15px] md:text-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
                    boxShadow: "0 8px 24px -6px rgba(240, 182, 20, 0.4)",
                  }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Reflexion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="relative w-[632px] h-auto bg-[#27282E] rounded-[20px] p-[20px] flex flex-col gap-[20px] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden"
            style={{
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              backdropFilter: "blur(4px)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[#83848A] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-1">
              <h2 className="text-[28px] font-inter font-bold text-white m-0">
                Add Custom Reflection
              </h2>
              <p className="text-[16px] font-inter font-medium text-white m-0">
                Describe your personal reflection question in your own words
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter your Question.."
                className="w-[592px] h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid transparent",
                  backgroundImage:
                    "linear-gradient(#46474E, #35374380), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  padding: "16px 20px",
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 h-[44px] rounded-[10px] border-2 border-[#00A3FF] text-white font-inter font-bold text-[15px] hover:bg-[#00A3FF]/10 transition-all active:scale-95 flex items-center justify-center m-0"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Adding reflexion:", customInput);
                  setIsModalOpen(false);
                  setCustomInput("");
                }}
                className="px-6 h-[44px] rounded-[10px] text-black font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                style={{
                  background:
                    "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
                }}
              >
                Add Reflexion
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ReflectionQuestions;
