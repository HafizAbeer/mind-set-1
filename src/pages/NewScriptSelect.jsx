import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import newScriptIcon from "../assets/radarModulesIcon/newScript-purple-icon.svg";

const NewScriptSelect = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([7]); // Default selected: to be wiser than smartie (id 7)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const scripts = [
    { id: 1, label: "to think more before acting" },
    { id: 2, label: 'saying "no" more often' },
    { id: 3, label: "to be more critical" },
    { id: 4, label: "to be more confident in me" },
    { id: 5, label: "to be more laid back" },
    { id: 6, label: "to be less cool" },
    { id: 7, label: "to be wiser than smartie" },
    { id: 8, label: "take better care of myself" },
    { id: 9, label: "to be more reserved" },
    { id: 10, label: "to be a bit safer" },
    { id: 11, label: "to be less submissive" },
    { id: 12, label: "to believe more in myself" },
    { id: 13, label: "to be more curious" },
    { id: 14, label: "to be more aware" },
    { id: 15, label: "to be more autonomous" },
    { id: 16, label: "to be more decisive" },
    { id: 17, label: "to be stronger" },
    { id: 18, label: "to be more optimistic" },
    { id: 19, label: "to be more assertive" },
    { id: 20, label: "to be more trusting" },
    { id: 21, label: "more self-confidence" },
    { id: 22, label: "to place more trust" },
    { id: 23, label: "be to more generous" },
    { id: 24, label: "to be more abstinent" },
    { id: 25, label: "to be more self-caring" },
    { id: 26, label: "to be less confident" },
    { id: 27, label: "to be more reserved" },
    { id: 28, label: "to be more thoughtful" },
    { id: 29, label: "to be more dynamic" },
    { id: 30, label: "to be more decisive" },
    { id: 31, label: "to be more courageous" },
    { id: 32, label: "to listen more than talk" },
    { id: 33, label: "to be less pedantic" },
    { id: 34, label: "to be less self-absorbed" },
    { id: 35, label: "to be less irritable" },
    { id: 36, label: "to feel less easily oppressed" },
    { id: 37, label: "to be more independent" },
    { id: 38, label: "to be more disorganized" },
    { id: 39, label: "to be more team player" },
    { id: 40, label: "to be more altruistic" },
    { id: 41, label: "to be less obedient" },
    { id: 42, label: "to be more forgiving" },
  ];

  const themeColor = "#CE5CFF";
  const themeGradient = "linear-gradient(180deg, #CE5CFF 0%, #9228C0 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">

            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img src={newScriptIcon} alt="Icon" className="w-9 h-9 object-contain shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    New Script Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select the New Scripts do you think to add in your life.
                  </p>
                </div>
              </div>

              <div className="w-full min-h-0 bg-[#CE5CFF]/10 border-2 border-[#CE5CFF] rounded-[16px] p-4 sm:p-[20px] flex items-center gap-[8px] shrink-0">
                <Info size={24} className="text-white shrink-0" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[clamp(16px,4vw,22px)] leading-tight sm:leading-[28px] tracking-[0px] text-[#CE5CFF] m-0 text-center">
                    You have identified “*******” as a trait you want to call<br className="hidden sm:block" />
                    your “Old Script”. With which of the following New Script qualities<br className="hidden sm:block" />
                    you would like to replace it?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] border-0 bg-sidebar-bg flex items-center justify-center p-4 sm:p-[20px] transition-all shrink-0 font-inter font-semibold text-[16px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own New Script</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#CE5CFF] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                  {scripts.map((script) => (
                    <button
                      key={script.id}
                      onClick={() => toggleSelection(script.id)}
                      className={`h-[48px] w-full max-w-[440px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedIds.includes(script.id)
                        ? "text-white border-transparent shadow-lg active:scale-95"
                        : "text-[#C2C2C2] hover:text-white"
                        }`}
                      style={{
                        background: selectedIds.includes(script.id)
                          ? themeGradient
                          : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                        borderColor: selectedIds.includes(script.id)
                          ? "#CE5CFF"
                          : "transparent",
                      }}
                    >
                      {script.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/new-script")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#CE5CFF]/50 text-[15px] md:text-[20px] hover:bg-[#CE5CFF]/10 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(180deg, #CE5CFF50, #9228C050)" }}
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
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Script Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="relative w-full max-w-[632px] h-auto bg-[#27282E] rounded-[20px] p-[20px] flex flex-col gap-[20px] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden"
            style={{
              border: "1px solid transparent",
              backgroundImage: "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              backdropFilter: "blur(4px)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[#83848A] hover:text-white transition-colors"
            >
              <Plus className="rotate-45" size={20} />
            </button>

            <div className="flex flex-col gap-1">
              <h2 className="text-[28px] font-inter font-bold text-white m-0">
                Add Custom Script
              </h2>
              <p className="text-[16px] font-inter font-medium text-white m-0 opacity-80">
                Describe your current state in your own words
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter your Script..."
                className="w-full h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all px-5"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid transparent",
                  backgroundImage: "linear-gradient(#35374380, #46474E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 h-[44px] rounded-[10px] border-2 border-[#CE5CFF] text-white font-inter font-bold text-[15px] hover:bg-[#CE5CFF]/10 transition-all active:scale-95 flex items-center justify-center m-0"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Adding script:", customInput);
                  setIsModalOpen(false);
                  setCustomInput("");
                }}
                className="px-6 h-[44px] rounded-[10px] text-white font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                style={{ background: themeGradient }}
              >
                Add Script
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewScriptSelect;
