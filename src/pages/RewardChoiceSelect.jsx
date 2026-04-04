import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import rewardGreenIcon from "../assets/radarModulesIcon/reward-green-icon.svg";
import CustomRewardModal from "../components/dashboard/CustomRewardModal";

const RewardChoiceSelect = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState("getting up late");

  const rewards = [
    "a day off",
    "take a siesta",
    "a day with the family",
    "getting up late",
    "a day of delights",
    "getting late to bed",
    "plan leisure time",
    "no schedule at all",
    "plan next voyage",
    "a cup of tea at the fireplace",
    "go out for a nice meal",
    "planning to visit loved ones",
    "good self care with a SPA day",
    "making sports",
    "time for myself",
    "be serviced for one day",
    "hang out with buds",
    "enjoy nature outside",
    "a good film at the cinema",
    "attend a fantastic concert",
    "take a sun bath at the pool",
    "a soothing drink with partner",
    "go shopping with bestie",
    "complete long-standing tasks",
    "read a book on the sofa",
    "a day off with my partner",
  ];

  const themeColor = "#6CB083";
  const themeGradient = "linear-gradient(180deg, #6CB083 0%, #115A2A 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">

            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[20px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <div className="w-12 h-12 bg-[#6CB083]/20 rounded-full flex items-center justify-center shrink-0">
                  <img src={rewardGreenIcon} alt="Reward Icon" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Reward Choice
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Now select the reward for your diligent work on your mindset.
                  </p>
                </div>
              </div>

              <div
                className="w-full border rounded-[10px] p-[16px_20px] sm:p-[20px_32px] flex items-center justify-center shrink-0 relative border-2 border-[#6CB083] rounded-[10px]"
                style={{
                  background: "linear-gradient(180deg, rgba(72, 200, 86, 0.15) 0%, rgba(72, 200, 86, 0.15) 100%)",
                  borderColor: "rgba(108, 176, 131, 0.4)"
                }}
              >
                <div className="">
                  <Info size={24} className="shrink-0" />
                </div>
                <div className="w-full flex flex-col items-center justify-center text-center px-0 sm:px-12">
                  <p className="font-inter font-bold text-[clamp(16px,4vw,20px)] leading-relaxed text-white m-0 max-w-[800px]">
                    You have now successfully worked and improved your mindset and the related behaviours. Reward yourself with whatever you estimate as bounty, maybe except of clearly unhealthy things.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] bg-[#27282E] flex items-center justify-center p-4 transition-all shrink-0 font-inter font-semibold text-[18px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own reward</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] border-2 border-[#6CB083] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] w-full items-start">
                  {rewards.map((reward, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedReward(reward)}
                      className={cn(
                        "min-h-[56px] w-full rounded-[10px] px-6 py-3 flex items-center justify-center transition-all font-inter font-medium text-[16px] sm:text-[18px] border-[1px] text-center",
                        selectedReward === reward
                          ? "bg-[#6CB083] text-white border-[#6CB083] font-bold shadow-lg"
                          : "bg-white/5 text-[#E0E0E0] border-white/10 hover:bg-white/10"
                      )}
                    >
                      {reward}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/reward-choice")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-[2px] border-[#6CB083] text-[15px] md:text-[20px] active:scale-95 bg-white/5"
                  style={{
                    background: "linear-gradient(180deg, #6CB08350, #115A2A50)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-[2px] border-[#6CB083] text-[15px] md:text-[20px] active:scale-95"
                  style={{
                    background: "linear-gradient(180deg, #6CB083, #115A2A)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  Continue to Start
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>
      <CustomRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RewardChoiceSelect;
