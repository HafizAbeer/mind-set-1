import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const CustomCauseModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-[632px] min-h-[262px] rounded-[20px] overflow-hidden shadow-2xl transition-all flex flex-col p-5 sm:p-[20px] gap-4 sm:gap-[20px]"
        style={{
          background: "#27282E",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div className="flex flex-col gap-[8px] w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] sm:text-[32px] font-inter font-bold text-white m-0 leading-[28px] sm:leading-[36px]">
              Add Custom Cause
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          <p className="text-[#C5C5C5] text-[16px] sm:text-[20px] font-inter font-medium m-0 leading-[20px] sm:leading-[24px]">
            Describe your current state in your own words
          </p>
        </div>

        <div className="w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your Cause..."
            className="w-full h-[50px] sm:h-[56px] bg-[#3B3B42] border border-white/10 rounded-[10px] px-[16px] sm:px-[20px] text-white font-inter text-[16px] sm:text-[20px] focus:outline-none focus:border-[#96FF71]/50 transition-colors placeholder:text-[#9CA1A7]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-[16px] w-full mt-4 sm:mt-auto">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none sm:w-[124px] h-[44px] sm:h-[48px] rounded-[10px] border border-[#5EAE41] bg-[#27282E] text-white font-inter font-bold text-[16px] sm:text-[18px] transition-all hover:bg-[#5EAE41]/10 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Adding custom cause:", inputValue);
              onClose();
            }}
            className="flex-1 sm:flex-none sm:w-[172px] h-[44px] sm:h-[48px] rounded-[10px] font-inter font-bold text-white text-[16px] sm:text-[18px] transition-all hover:opacity-90 active:scale-95 shadow-lg"
            style={{
              background: "linear-gradient(180deg, #96FF71 0%, #5EAE41 100%)",
            }}
          >
            Add Cause
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCauseModal;
