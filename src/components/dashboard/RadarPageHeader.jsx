import React from "react";
import { useOutletContext } from "react-router-dom";
import { cn } from "@/lib/utils";
import mindsetLogo from "../../assets/mindset-logo.svg";

/**
 * Shared header for the radar intro and "select" pages.
 *
 * Owns all formatting (menu icon, page icon, type scale, colors, spacing) so
 * every radar page stays in sync — only the data (icon / title / subtitle) is
 * passed in. The leading menu icon opens the sidebar; by default it uses the
 * `setLegacySidebarOpen` provided by DashboardLayout via Outlet context, but a
 * page/layout can pass an explicit `onMenuClick` instead.
 *
 * @param {() => void} [onMenuClick] - explicit sidebar opener; falls back to Outlet context when omitted
 * @param {string} [menuClassName] - extra classes for the menu button. Defaults to "xl:hidden" (select pages swap it for the desktop AppSidebar); intro pages pass "" to keep it visible.
 * @param {string|React.ReactNode} icon - image src (rendered as <img>) or a node (e.g. a lucide icon)
 * @param {string} iconAlt - alt text when `icon` is an image src
 * @param {React.ReactNode} title
 * @param {React.ReactNode} subtitle
 * @param {string} [className] - extra container classes
 */
const RadarPageHeader = ({
  onMenuClick,
  menuClassName = "xl:hidden",
  icon,
  iconAlt = "",
  title,
  subtitle,
  className,
}) => {
  const outletContext = useOutletContext();
  const openSidebar =
    onMenuClick ||
    (outletContext?.setLegacySidebarOpen
      ? () => outletContext.setLegacySidebarOpen(true)
      : undefined);

  return (
    <div
      className={cn(
        "flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0",
        className,
      )}
    >
      {openSidebar && (
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open menu"
          className={cn(
            "shrink-0 transition-transform active:scale-95",
            menuClassName,
          )}
        >
          <img src={mindsetLogo} alt="Menu" className="h-11 w-11" />
        </button>
      )}

      {typeof icon === "string" ? (
        <img
          src={icon}
          alt={iconAlt}
          className="h-9 w-9 shrink-0 object-contain"
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}

      <div className="min-w-0 flex flex-col">
        <h1 className="m-0 font-inter text-[clamp(22px,4vw,32px)] font-bold leading-tight tracking-[-0.3px] text-white sm:text-[32px] sm:leading-[36px]">
          {title}
        </h1>
        <p className="m-0 font-inter text-[clamp(14px,3vw,20px)] font-medium leading-snug tracking-[-0.3px] text-[#9CA1A7] sm:text-[20px] sm:leading-[24px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default RadarPageHeader;
