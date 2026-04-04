import React from "react";
import { createPortal } from "react-dom";

const IntentionInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[690px] rounded-[24px] bg-[#2A2C32] p-8 md:p-12 shadow-2xl border border-white/5">
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          <p className="font-inter text-lg md:text-[22px] font-medium leading-[1.6] text-white">
            By sending yourself your mindset Intention and the{" "}
            <br className="hidden md:block" />
            attached Mantra as push notification, you will receive{" "}
            <br className="hidden md:block" />
            <span className="text-white">+1 bonus point</span> on your
            statistical score each <br className="hidden md:block" />
            time you confirm having read it on the screen,{" "}
            <br className="hidden md:block" />
            reducing the number of penalty points you previously{" "}
            <br className="hidden md:block" />
            accumulated with negative mindsets.
          </p>

          <button
            onClick={onClose}
            className="group relative flex h-[48px] items-center justify-center rounded-full border-2 border-[#D16868] bg-transparent px-10 transition-all hover:bg-[#D16868]/10 active:scale-95"
          >
            <span className="font-inter text-lg font-semibold text-white">
              got it
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default IntentionInfoModal;
