import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import scriptIcon from "../assets/radarModulesIcon/lifeScript-lightGreen-icon.svg";

const LifeScriptSelect = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([7]); // Default selected: The Smart (id 7)
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
    { id: 1, label: "The Maker" }, { id: 2, label: "The Helper" },
    { id: 3, label: "The Understanding One" }, { id: 4, label: "The Incompetent" },
    { id: 5, label: "The Anxious" }, { id: 6, label: "The Casual" },
    { id: 7, label: "The Smart" }, { id: 8, label: "The mediator" },
    { id: 9, label: "The Organizer" }, { id: 10, label: "The Insecure" },
    { id: 11, label: "The Obedient" }, { id: 12, label: "The Weak" },
    { id: 13, label: "The One Left Behind" }, { id: 14, label: "The Unable" },
    { id: 15, label: "The Helpless" }, { id: 16, label: "The Torn" },
    { id: 17, label: "The Chronically III" }, { id: 18, label: "The Melancholic" },
    { id: 19, label: "The Misunderstood" }, { id: 20, label: "The Sceptic" },
    { id: 21, label: "The Leader" }, { id: 22, label: "The Critic" },
    { id: 23, label: "The Pacifist" }, { id: 24, label: "The Independent" },
    { id: 25, label: "The Thrifty" }, { id: 26, label: "The Epicurean" },
    { id: 27, label: "The Generous" }, { id: 28, label: "The High-Flyer" },
    { id: 29, label: "The Silent" }, { id: 30, label: "The Arrogant" },
    { id: 31, label: "The Supporter" }, { id: 32, label: "The ever-balanced one" },
    { id: 33, label: "The Cosy One" }, { id: 34, label: "The Cheated One" },
    { id: 35, label: "The Loser" }, { id: 36, label: "The Teacher" },
    { id: 37, label: "The Righteous One" }, { id: 38, label: "The Entertainer" },
    { id: 39, label: "The Angry One" }, { id: 40, label: "The Oppositionist" },
    { id: 41, label: "The Follower" }, { id: 42, label: "The Untidy One" },
    { id: 43, label: "The Lone Wolf" }, { id: 44, label: "The Irreplaceable" },
    { id: 45, label: "The Provider" }, { id: 46, label: "The Avenger" },
  ];

  const themeColor = "#E2E464";
  const themeGradient = "linear-gradient(180deg, #F6F362, #C9C500)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">

            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img src={scriptIcon} alt="Icon" className="w-9 h-9 object-contain shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Life Script Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select the scripts do you think you are following in your life.
                  </p>
                </div>
              </div>

              <div className="w-full min-h-0 bg-[#E2E464]/10 border-2 border-[#E2E464] rounded-[16px] p-4 sm:p-[20px] flex items-center gap-[8px] shrink-0">
                <Info size={24} className="text-white shrink-0" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[clamp(16px,4vw,22px)] leading-tight sm:leading-[28px] tracking-[0px] text-[#E2E464] m-0 text-center">
                    Which life-script do you think you live in this life?
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
                  <span>Add your own Script</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#E2E464] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
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
                          ? "#E2E464"
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
                  onClick={() => navigate("/life-script")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#E2E464]/50 text-[15px] md:text-[20px] hover:bg-[#E2E464]/10 active:scale-95 shadow-lg"
                  style={{ background: 'linear-gradient(180deg, #F6F36250, #C9C50050)' }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/old-script")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#E2E464] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="relative w-[min(632px,95%)] h-auto bg-[#27282E] rounded-[20px] p-[20px] flex flex-col gap-[20px] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden"
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
                className="px-6 h-[44px] rounded-[10px] border-2 border-[#E2E464] text-white font-inter font-bold text-[15px] hover:bg-[#E2E464]/10 transition-all active:scale-95 flex items-center justify-center m-0"
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

export default LifeScriptSelect;
