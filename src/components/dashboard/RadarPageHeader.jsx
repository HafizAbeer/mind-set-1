import React from "react";

/**
 * Shared header for the radar "select" pages.
 *
 * Owns all formatting (icon size, type scale, colors, spacing, alignment with
 * the mobile menu icon) so every select page stays in sync — only the data
 * (icon / title / subtitle) is passed in. Matches the radar intro header
 * rendered by RadarModuleLayout.
 *
 * @param {string|React.ReactNode} icon - image src (rendered as <img>) or a node (e.g. a lucide icon)
 * @param {string} iconAlt - alt text when `icon` is an image src
 * @param {React.ReactNode} title
 * @param {React.ReactNode} subtitle
 */
const RadarPageHeader = ({ icon, iconAlt = "", title, subtitle }) => {
  return (
    <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0 pl-16 xl:pl-0">
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
