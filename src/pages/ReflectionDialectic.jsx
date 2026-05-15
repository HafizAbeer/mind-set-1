import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import reflectionIcon from "../assets/radarModulesIcon/reflection-yellow-icon.svg";
import ReflectionTextCard from "../components/dashboard/ReflectionTextCard";
import { patchScreeningSelection } from "@/lib/screeningSelection";

const KINDS = {
  trigger: {
    subtitle: "Dialectical thinking: Separate immediate from systemic trigger",
    a: {
      title: "immediate trigger",
      placeholder:
        "Write here in detail what triggered you immediately in this situation...",
    },
    b: {
      title: "systemic trigger",
      placeholder:
        "Write here what triggers you generally in these situations...",
    },
  },
  aspects: {
    subtitle:
      "Dialectical thinking: Separate aspects that speak for it from those that speak against it.",
    a: { title: "Pro aspects", placeholder: "Yes, because..." },
    b: { title: "Contra aspects", placeholder: "No, because..." },
  },
  experiences: {
    subtitle: "Dialectical thinking: Separate emotional from rational aspects",
    a: {
      title: "Emotional aspects",
      placeholder: "Write your emotional thoughts here...",
    },
    b: {
      title: "Rational aspects",
      placeholder: "Write your rational thoughts here...",
    },
  },
  behaviour: {
    subtitle: "Did your actual reaction match your desired behaviour?",
    a: {
      title: "Real behaviour",
      placeholder: "Write here your showed behaviour:",
    },
    b: {
      title: "Intended behaviour",
      placeholder: "Write here how you intended to react:",
    },
  },
  consequences: {
    subtitle: "What did you fear would happen vs what you wanted to happen?",
    a: {
      title: "worst-case",
      placeholder: "Write here your worst expectations...",
    },
    b: {
      title: "best case",
      placeholder: "Write here your best expectations...",
    },
  },
  views: {
    subtitle: "What could be ways to a different view on this situation?",
    a: {
      title: "realistic steps",
      placeholder: "Write here your first realistic steps...",
    },
    b: {
      title: "theoretical assumptions",
      placeholder: "Write here your Intentionful thoughts...",
    },
  },
};

const ReflectionDialectic = ({ kind }) => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const setLegacySidebarOpen =
    outletContext?.setLegacySidebarOpen || (() => {});
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");

  const config = KINDS[kind];

  const handleChangeA = (next) => {
    setValueA(next);
    patchScreeningSelection({
      reflectionATitle: config.a.title,
      reflectionAValue: next,
    });
  };

  const handleChangeB = (next) => {
    setValueB(next);
    patchScreeningSelection({
      reflectionBTitle: config.b.title,
      reflectionBValue: next,
    });
  };

  const handleContinue = () => {
    patchScreeningSelection({
      reflectionATitle: config.a.title,
      reflectionAValue: valueA,
      reflectionBTitle: config.b.title,
      reflectionBValue: valueB,
    });
    navigate("/body");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center">
      {/* Brain Logo Top-Left */}
      <div
        className="absolute top-6 left-6 sm:top-[40px] sm:left-[40px] z-50 cursor-pointer transition-transform active:scale-95 hover:opacity-80"
        onClick={() => setLegacySidebarOpen(true)}
      >
        <img
          src={mindsetLogo}
          alt="Logo"
          className="w-10 h-10 sm:w-[52px] sm:h-[52px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1128px] px-4 pt-24 sm:pt-40 pb-10 translate-y-[-20px]">
        {/* Page Header Area */}
        <div className="w-full flex items-center gap-[16px] mb-6 sm:mb-[40px]">
          <div className="flex items-center justify-center w-12 h-12 mt-3 shrink-0">
            <img src={reflectionIcon} alt="Logo" className="w-9 h-9" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] sm:text-[36px] font-inter font-bold text-white m-0 leading-[32px] sm:leading-[40px] tracking-[-0.3px]">
              Reflection Radar
            </h1>
            <p className="text-[16px] sm:text-[20px] font-inter font-medium text-[#9CA1A7] m-0 leading-[24px]">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Inner Content Area: Cards + Buttons */}
        <div className="w-full flex flex-1 flex-col items-center gap-4 sm:gap-[28px]">
          {/* Side by side cards */}
          <div className="w-full flex flex-1 sm:flex-none flex-col xl:flex-row items-center justify-between gap-3 sm:gap-[20px]">
            <ReflectionTextCard
              title={config.a.title}
              placeholder={config.a.placeholder}
              value={valueA}
              onChange={handleChangeA}
            />
            <ReflectionTextCard
              title={config.b.title}
              placeholder={config.b.placeholder}
              value={valueB}
              onChange={handleChangeB}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-[20px]">
            <button
              onClick={() => navigate("/reflection-questions")}
              className="flex-1 xl:flex-none xl:w-[554px] h-[56px] sm:h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:bg-white/5 active:scale-95 border-2 border-[#F0B614] text-[18px] sm:text-[20px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(240, 182, 20, 0.4) 0%, rgba(223, 164, 0, 0.4) 100%)",
              }}
            >
              <ArrowLeft size={24} className="shrink-0" />
              Back
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 xl:flex-none xl:w-[554px] h-[56px] sm:h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] font-inter font-bold text-white transition-all hover:opacity-90 active:scale-95 border-2 border-[#F0B614] text-[18px] sm:text-[20px]"
              style={{
                background: "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
                boxShadow: "0 8px 24px -6px rgba(240, 182, 20, 0.4)",
              }}
            >
              Continue
              <ArrowRight size={24} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #F0B614;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ReflectionDialectic;
