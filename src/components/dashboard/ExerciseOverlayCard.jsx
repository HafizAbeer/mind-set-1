import React from "react";
import { cn } from "@/lib/utils";
import QuotesIcon from "@/assets/icons/quotes-icon.svg";
import SharePinkIcon from "@/assets/icons/share-pink-icon.svg";

/**
 * ExerciseOverlayCard — Horizontal glass style (502×292px)
 * Based on provided Figma specifications (Image 1, 2, 3).
 *
 * @param {string} text — Quote/Exercise text.
 * @param {function} onShare — Callback for the share button.
 * @param {string} className — Optional additional wrapper classes.
 */
const ExerciseOverlayCard = ({ text, onShare, className }) => {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[502px] min-h-[300px] shrink-0 transition-all duration-300",
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
        className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-[21px] px-5 py-10 text-center"
        style={{
          // 🔥 Glass background with depth
          background: `
        linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%),
        radial-gradient(circle at 20% 100%, rgba(255,140,0,0.15), transparent 40%),
        radial-gradient(circle at 80% 0%, rgba(120,140,255,0.15), transparent 40%)
      `,

          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",

          // Inner glow
          boxShadow: `
        inset 0 0 25px rgba(255,255,255,0.08),
        inset 0 -10px 30px rgba(255,140,0,0.08)
      `,
        }}
      >
        {/* Top-Left Quote Icon (Asset) */}
        <div className="absolute left-[20px] top-[40px] opacity-90">
          <img src={QuotesIcon} alt="Quote" className="w-[32px] h-auto" />
        </div>

        {/* Top-Right Share Button (Asset) */}
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

        {/* Exercise Text */}
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

export default ExerciseOverlayCard;
