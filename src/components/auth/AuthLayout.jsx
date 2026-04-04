import React from "react";
import { Link } from "react-router-dom";
import mindsetLogo from "../../assets/mindset-logo.svg";
import dotsPattern from "../../assets/Dots.svg";
import AuthBackground from "./AuthBackground";

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans text-white">
      <AuthBackground />

      <div className="absolute top-6 left-6 sm:top-[72px] sm:left-[72px] flex items-center gap-2 z-10 w-fit h-auto sm:h-[56px] pr-6">
        <img
          src={mindsetLogo}
          alt="New Mindset"
          className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
        />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide truncate">
          New Mindset
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 px-4 w-full h-full mt-24 sm:mt-0">
        <div className="w-full sm:w-[580px] rounded-[16px] shadow-2xl pt-6 px-6 pb-6 sm:pt-[48px] sm:px-[48px] sm:pb-[40px] flex flex-col gap-6 sm:gap-[32px] gradient-border bg-[#27282E]/50 relative overflow-hidden">
          {/* Dots Pattern Overlay */}
          <div
            className="absolute inset-x-0 bottom-0 h-[33%] pointer-events-none z-0 opacity-20"
            style={{
              backgroundImage: `url(${dotsPattern})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom center",
              backgroundSize: "cover",
            }}
          ></div>

          {title && (
            <div className="relative z-10 space-y-4">
              <h2 className="text-[32px] font-bold text-center text-[#6BC7FF] drop-shadow-sm leading-[36px]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-[16px] leading-[160%] text-center text-gray-300 max-w-[400px] mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="relative z-10 w-full">{children}</div>

          {/* Footer Link */}
          {footerText && (
            <div className="text-center pt-2 relative z-10">
              <p className="text-sm text-white">
                {footerText}{" "}
                {footerLinkText && (
                  <Link
                    to={footerLinkHref || "#"}
                    className="text-[#6BC7FF] hover:text-[#1b93e5] font-medium transition-colors"
                  >
                    {footerLinkText}
                  </Link>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
