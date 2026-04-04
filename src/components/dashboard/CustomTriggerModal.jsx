import React from "react";
import { X } from "lucide-react";

const CustomTriggerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px]">
      <div
        className="relative bg-[#27282E] rounded-[20px] p-5 sm:p-[20px] flex flex-col gap-4 sm:gap-[20px] shadow-2xl overflow-hidden w-full max-w-[632px]"
        style={{
          minHeight: "262px",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div className="flex items-start justify-between w-full min-h-[68px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-[24px] sm:text-[32px] font-inter font-bold text-white leading-[28px] sm:leading-[36px] m-0">
              Add Custom Trigger
            </h2>
            <p className="text-[14px] sm:text-[16px] font-inter font-medium text-[#C5C5C5] leading-[20px] sm:leading-[24px] m-0">
              Describe your current state in your own words
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#C5C5C5] hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full h-[56px] sm:h-[64px] bg-[#32333A] rounded-[10px] flex items-center px-4 border border-white/5">
          <input
            type="text"
            placeholder="Enter your Trigger."
            className="w-full bg-transparent border-none outline-none text-[16px] sm:text-[18px] text-white placeholder-[#83848A] font-inter"
          />
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-[16px] w-full mt-4 sm:mt-auto">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-[16px] sm:px-[24px] h-[44px] sm:h-[40px] rounded-[10px] border border-[#0095FF] text-white font-inter font-semibold text-[15px] sm:text-[16px] hover:bg-white/5 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="flex-1 sm:flex-none px-[16px] sm:px-[24px] h-[44px] sm:h-[40px] rounded-[10px] bg-[#3C56D8] text-white font-inter font-semibold text-[15px] sm:text-[16px] hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            Add Structure
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTriggerModal;
