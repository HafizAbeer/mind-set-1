import React from "react";
import { createPortal } from "react-dom";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReflectionInfoModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
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
            If you are not sure about the reflections over your{" "}
            <br className="hidden md:block" />
            actual mindset you can invite your therapist to join{" "}
            <br className="hidden md:block" />
            you on this platform as helping hand.{" "}
            <br className="hidden md:block" />
            You can invite him/her in “settings/data&privacy/Invite{" "}
            <br className="hidden md:block" />
            Therapist”.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="group relative flex h-[48px] items-center justify-center rounded-full border-2 border-[#D16868] bg-transparent px-10 transition-all hover:bg-[#D16868]/10 active:scale-95"
            >
              <span className="font-inter text-lg font-semibold text-white">
                not yet
              </span>
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="group relative flex h-[48px] w-[90px] items-center justify-center rounded-[18px] border-2 border-[#D16868] bg-transparent transition-all hover:bg-[#D16868]/10 active:scale-95"
            >
              <Settings className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReflectionInfoModal;
