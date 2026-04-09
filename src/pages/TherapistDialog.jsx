import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, FilePlus } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import therapistIcon from "../assets/icons/therapist-icon.svg";

const TherapistDialog = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const historyData = [
    {
      id: 1,
      date: "Nov 16, 2025, 02:37 PM",
      doctor: {
        label: "Mindset Intentionhint:",
        category: "Angry-work-impatience",
        entry: 'not thinking "I must" mantra',
      },
      me: {
        label: "Answer/Reaction",
        category: "Angry-work-impatience",
        entry: "I'll try and report result",
      },
    },
    {
      id: 2,
      date: "Nov 16, 2025, 02:37 PM",
      doctor: {
        label: "Mindset Intentionhint:",
        category: "Angry-work-impatience",
        entry: 'not thinking "I must" mantra',
      },
      me: {
        label: "Answer/Reaction",
        category: "Angry-work-impatience",
        entry: "I'll try and report result",
      },
    },
    {
      id: 3,
      date: "Nov 16, 2025, 02:37 PM",
      doctor: {
        label: "Mindset Intentionhint:",
        category: "Angry-work-impatience",
        entry: 'not thinking "I must" mantra',
      },
      me: {
        label: "Answer/Reaction",
        category: "Angry-work-impatience",
        entry: "I'll try and report result",
      },
    },
    {
      id: 4,
      date: "Nov 16, 2025, 02:37 PM",
      doctor: {
        label: "Mindset Intentionhint:",
        category: "Angry-work-impatience",
        entry: 'not thinking "I must" mantra',
      },
      me: {
        label: "Answer/Reaction",
        category: "Angry-work-impatience",
        entry: "I should overthink my work moral level.",
      },
    },
  ];

  const yellowGradient = "linear-gradient(180deg, #F0B614 0%, #FDBA01 100%)";
  const yellowBorder = "#FA9C1D";
  const redGradient = "linear-gradient(180deg, #E17373 0%, #A34545 100%)";
  const redBorder = "#D16868";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="min-h-screen flex items-start justify-center overflow-auto custom-scrollbar px-3 pt-25 lg:pt-12 pb-6">
        <div className="relative flex w-full max-w-[1400px] text-white font-sans transition-all duration-300">
          <div className="flex-1 flex flex-col gap-8 px-4 lg:py-15 xl:p-0">
            {/* Header section */}
            <div className="flex items-start justify-between w-full px-3 gap-4">
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="p-1.5 bg-white/5 rounded-2xl border border-white/5 shadow-inner shrink-0">
                  <img
                    src={therapistIcon}
                    alt="Therapist"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[24px] sm:text-[32px] font-bold font-inter tracking-tight leading-none text-white">
                    Therapist Dialog
                  </h1>
                  <p className="text-[14px] sm:text-[20px] pt-2 text-[#A0A0A0] font-medium leading-tight">
                    Let your therapist support you on your path to mindfulness.
                  </p>
                </div>
              </div>
              <button className="p-2.5 sm:p-3.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all active:scale-90 shrink-0">
                <Settings size={22} className="text-[#A0A0A0]" />
              </button>
            </div>

            {/* Subheader and Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-4 px-2 sm:px-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold font-inter">
                Therapeutic dialogue history
              </h2>
              <button
                onClick={() => navigate("/therapist-new-entry")}
                className="flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 bg-[#4F75FF] hover:bg-[#3d64ef] text-white rounded-lg font-bold transition-all active:scale-95 shadow-lg w-full sm:w-auto justify-center"
              >
                <FilePlus size={18} />
                New Entry
              </button>
            </div>

            {/* Combined History Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full mt-6 px-2 sm:px-6">
              {/* Doctor Section */}
              <div className="flex flex-col gap-6">
                <button
                  className="h-[60px] sm:h-[72px] rounded-2xl flex items-center justify-center font-inter font-bold text-xl sm:text-2xl transition-all shadow-lg border-2"
                  style={{
                    background: yellowGradient,
                    borderColor: yellowBorder,
                    color: "#000000",
                  }}
                >
                  doctorfeelgood
                </button>
                <div className="flex flex-col gap-4">
                  {historyData.map((item) => (
                    <div
                      key={`doctor-${item.id}`}
                      className="flex flex-col gap-2"
                    >
                      <div className="p-6 rounded-[24px] border-2 border-[#2E3A5F] bg-[#1C1C24] shadow-xl flex flex-col gap-2 min-h-[170px]">
                        <span className="text-base text-white font-medium mb-1">
                          {item.date}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-lg font-bold text-[#F0B614]">
                            {item.doctor.label}
                          </span>
                          <span className="text-lg font-medium text-white/90">
                            {item.doctor.category}
                          </span>
                          <span className="text-lg font-bold text-[#FDBA01] mt-1">
                            Entry: {item.doctor.entry}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Me Section */}
              <div className="flex flex-col gap-6">
                <button
                  className="h-[60px] sm:h-[72px] rounded-2xl flex items-center justify-center font-inter font-bold text-xl sm:text-2xl transition-all shadow-lg border-2"
                  style={{
                    background: redGradient,
                    borderColor: redBorder,
                    color: "white",
                  }}
                >
                  me
                </button>
                <div className="flex flex-col gap-4">
                  {historyData.map((item) => (
                    <div key={`me-${item.id}`} className="flex flex-col gap-2">
                      <div className="p-6 rounded-[24px] border-2 border-[#2E3A5F] bg-[#1C1C24] shadow-xl flex flex-col gap-2 min-h-[170px]">
                        <span className="text-base text-white font-medium mb-1">
                          {item.date}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-lg font-bold text-[#E17373]">
                            {item.me.label}
                          </span>
                          <span className="text-lg font-medium text-white/90">
                            {item.me.category}
                          </span>
                          <span className="text-lg font-bold text-[#E17373] mt-1">
                            Entry: {item.me.entry}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDialog;
