import { useNavigate } from "react-router-dom";
import brainImage from "../assets/brain-image.png";
import heroPattern from "../assets/hero-pattern.svg";
import shareIcon from "../assets/share-icon.svg";

const footerLinks = [
  "Disclaimer",
  "Manual",
  "Terms of use",
  "Literature",
  "Privacy policy",
  "Impressum",
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#1e1f24] overflow-hidden flex flex-col items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none opacity-30">
        <img
          src={heroPattern}
          alt=""
          className="w-full max-w-[1462px] h-auto mt-[-5%]"
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#1e1f24] via-[#1e1f24]/80 to-transparent pointer-events-none" />

      {/* Top gradient glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[200px] bg-[radial-gradient(ellipse,rgba(107,199,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Share button */}
      <button className="absolute top-5 right-5 md:top-8 md:right-10 z-10 w-[50px] h-[50px] border border-white rounded-md flex items-center justify-center hover:bg-white/10 transition-colors">
        <img src={shareIcon} alt="Share" className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1440px] px-4 pt-8 md:pt-12 flex-1">
        {/* Title */}
        <h1 className="font-sans font-medium text-white text-5xl sm:text-6xl md:text-7xl lg:text-[96px] text-center leading-tight">
          New Mindset
        </h1>

        {/* Subtitle pill */}
        <div className="mt-4 md:mt-6 border border-white rounded-full px-6 md:px-10 py-2">
          <p className="font-inter font-medium text-white text-xs sm:text-sm md:text-lg lg:text-xl text-center tracking-[3px] md:tracking-[5px]">
            A way to change your approach to life and it's stresses
          </p>
        </div>

        {/* Brain image - clickable */}
        <button
          onClick={() => navigate("/login")}
          className="relative mt-6 md:mt-10 group cursor-pointer"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle,rgba(107,199,255,0.06)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle,rgba(107,199,255,0.12)_0%,transparent_70%)] transition-all duration-500" />

          {/* Circle border */}
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[540px] lg:h-[540px] rounded-full border border-white/40 flex items-center justify-center group-hover:border-white/70 transition-colors duration-300">
            <img
              src={brainImage}
              alt="Mindset Brain"
              className="w-[85%] h-[85%] object-contain -scale-y-100 drop-shadow-[0_0_40px_rgba(107,199,255,0.15)] group-hover:drop-shadow-[0_0_60px_rgba(107,199,255,0.25)] transition-all duration-500"
            />
          </div>
        </button>

        {/* Tagline pill */}
        <div className="mt-6 md:mt-10 border border-white rounded-full px-6 md:px-16 py-4 md:py-6">
          <p className="font-inter font-medium text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[65px] text-center leading-tight">
            mindful – transformative - individual
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="relative z-10 w-full px-4 pb-6 md:pb-8 mt-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-[1400px] mx-auto">
          {footerLinks.map((label) => (
            <button
              key={label}
              className="border border-white rounded-full px-5 md:px-8 py-1 text-white/55 font-inter font-medium text-xs md:text-sm lg:text-base tracking-[2px] md:tracking-[5px] hover:text-white/80 hover:border-white/80 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
