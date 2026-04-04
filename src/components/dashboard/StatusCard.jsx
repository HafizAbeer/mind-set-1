import React from "react";

import { cn } from "@/lib/utils";

const StatusCard = ({
  icon: Icon,
  title,
  subtitle,
  variant = "blue",
  children,
  className,
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "blue":
        return "bg-[#4070DA]/20 border-[#4070DA]";
      case "red":
        return "bg-[#D16868]/20 border-[#D16868]";
      case "green":
        return "bg-[#21BF32]/13 border-[#3E444E]";
      case "yellow":
        return "bg-[#F5B910]/23 border-[#635A3F]";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "blue":
        return "bg-blue-500/20 text-blue-400";
      case "red":
        return "bg-red-500/20 text-red-500";
      case "green":
        return "bg-emerald-500/20 text-emerald-500";
      case "yellow":
        return "bg-[#F5B910]/20 text-[#F5B910]";
      default:
        return "bg-white/10 text-white";
    }
  };

  const isTip = variant === "green" || variant === "yellow";
  const getMinHeight = () => {
    if (variant === "green") return "min-h-[101px]";
    if (variant === "yellow") return "min-h-[96px]";
    return "min-h-[92px]";
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex overflow-hidden rounded-[16px] border p-[20px] transition-all",
        onClick && "cursor-pointer hover:opacity-90 active:scale-[0.98]",
        isTip ? "flex-col items-start" : "items-center",
        getMinHeight(),
        "w-[234px]",
        getVariantStyles(),
        className,
      )}
    >
      <div
        className={`flex ${isTip ? "flex-col items-start gap-1" : "items-center gap-[18px]"} w-full`}
      >
        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getIconBg()}`}
          >
            {typeof Icon === "string" ? (
              <img src={Icon} alt="" className="w-6 h-6 object-contain" />
            ) : (
              <Icon size={24} strokeWidth={variant === "red" ? 1.5 : 2} />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0 w-full">
          {isTip && (
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${variant === "green" ? "bg-[#21BF32]" : "bg-[#F2994A]"}`}
              />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider font-inter">
                Quick Tip
              </span>
            </div>
          )}
          <h3
            className={`font-inter font-normal text-[16px] leading-[24px] whitespace-normal ${isTip ? "text-white text-center" : "text-base font-semibold"}`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-300 mt-0.5 whitespace-normal">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
