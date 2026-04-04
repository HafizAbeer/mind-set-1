import React from "react";
import { cn } from "@/lib/utils";
import QuotesIcon from "@/assets/icons/quotes-icon.svg";
import SharePinkIcon from "@/assets/icons/share-pink-icon.svg";

/**
 * Mindfulness / quote overlay card — Horizontal glass style (502×292px)
 * Synced with the ExerciseOverlayCard design.
 *
 * @param {string} text — Quote (supports \n → line breaks)
 * @param {function} onShare — Share action
 * @param {string} className — Optional wrapper classes
 */
const MindsetOverlayCard = ({ text, onShare, className }) => {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] min-h-[360px] shrink-0 transition-all duration-300",
        "rounded-[29px] p-[8px]", // 8px border width
        className,
      )}
      style={{
        filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow: `
  inset 0 0 20px rgba(255,255,255,0.1),
  0 0 30px rgba(0,0,0,0.3)
`,
      }}
    >
      <div
        className="relative flex h-full min-h-[360px] w-full flex-col items-center justify-center overflow-hidden rounded-[21px] px-5 py-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(254, 248, 255, 0.21) 0%, rgba(254, 248, 255, 0) 100%)",
          backdropFilter: "blur(151.39px)",
          WebkitBackdropFilter: "blur(151.39px)",
          boxShadow:
            "inset -11.73px -11.73px 32px 0px rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Top-Left Quote Icon (Asset) */}
        <div className="absolute left-[20px] top-[40px] opacity-90">
          <img src={QuotesIcon} alt="Quote" className="w-[32px] h-auto" />
        </div>

        {/* Top-Right Share Button (Asset-based) */}
        <button
          type="button"
          onClick={onShare}
          className="absolute right-[20px] top-[30px] z-20 transition-all hover:scale-110 active:opacity-75"
          aria-label="Share quote"
        >
          <img
            src={SharePinkIcon}
            alt="Share"
            className="w-[24px] h-[24px] block"
          />
        </button>

        {/* Quote Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-2">
          <p className="whitespace-pre-line font-inter text-[18px] md:text-[20px] font-medium leading-[1.45] tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] px-4">
            {text}
          </p>
        </div>

        {/* Bottom-Right Quote Icon (Asset - Mirrored) */}
        <div className="absolute bottom-[40px] right-[20px] rotate-180 opacity-90">
          <img src={QuotesIcon} alt="Quote" className="w-[32px] h-auto" />
        </div>
      </div>
    </div>
  );
};

export default MindsetOverlayCard;
