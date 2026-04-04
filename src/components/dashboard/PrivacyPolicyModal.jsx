import React from "react";
import { createPortal } from "react-dom";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <div className="relative w-full max-w-[1200px] h-full flex flex-col p-6 sm:p-16 overflow-y-auto custom-scrollbar">
        {/* Header with Custom Close Icon */}
        <div className="flex justify-between items-start mb-16 gap-4">
          <h1 className="text-white text-[40px] sm:text-[64px] font-bold font-inter leading-tight sm:leading-none">
            Privacy Policy
          </h1>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition-opacity mt-4"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="2"
                width="44"
                height="44"
                rx="4"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M32 24H16M16 24L24 16M16 24L24 32"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16V32"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-12 max-w-[1000px]">
          <section className="space-y-8">
            <h2 className="text-white text-2xl font-bold font-inter">
              1. General Information
            </h2>
            <div className="space-y-6">
              <p className="text-white text-[20px] leading-relaxed font-medium font-inter">
                The protection of your personal data is important to us. This
                privacy policy informs you <br className="hidden sm:block" />
                about what data we collect, how we use it and what rights you
                have.
              </p>
              <p className="text-white text-[20px] leading-relaxed font-medium font-inter">
                Personal data is any data that can be used to identify you
                personally. <br />
                We don not use or sell your data or entries. <br />
                In case you want to share your entries with friends, family,
                therapists or doctors it’s up to{" "}
                <br className="hidden sm:block" />
                you to do so by sharing your statistical page.
              </p>
            </div>
          </section>

          <div className="w-[80px] h-[2px] bg-white opacity-60" />

          <section className="space-y-8">
            <h2 className="text-white text-2xl font-bold font-inter">
              2. Responsible body
            </h2>
            <div className="space-y-6">
              <p className="text-white text-[20px] leading-relaxed font-medium font-inter">
                The responsible body for data processing within the meaning of
                the GDPR is:
              </p>
              <div className="text-white text-[20px] leading-relaxed font-medium font-inter space-y-1">
                <p>Osteomaps UG</p>
                <p>Lemberger Str. 68 a</p>
                <p>D-66957 Ruppertsweiler</p>
                <p>[info@newmindsetapp.com]</p>
                <p>+4916090288339</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default PrivacyPolicyModal;
