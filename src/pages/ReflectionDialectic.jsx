import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import reflectionIcon from "../assets/radarModulesIcon/reflection-yellow-icon.svg";
import RadarPageHeader from "../components/dashboard/RadarPageHeader";
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
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center px-4 pt-[20px] pb-10">
      {/* Page Header */}
      <div className="w-full max-w-[1128px] shrink-0">
        <RadarPageHeader
          icon={reflectionIcon}
          iconAlt="Reflection Icon"
          title="Reflection Radar"
          subtitle={config.subtitle}
          menuClassName=""
        />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1128px] min-h-0">
        {/* Inner Content Area: Cards + Buttons */}
        <div className="w-full flex flex-1 flex-col items-center gap-4 sm:gap-[28px] mt-6 sm:mt-[40px]">
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
