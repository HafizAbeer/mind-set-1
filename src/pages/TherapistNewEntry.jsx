import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Link2,
  Star,
  Accessibility,
  Trophy,
  SquarePlus,
  ScrollText,
  Pencil
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import therapistIcon from "../assets/icons/therapist-icon.svg";

const TherapistNewEntry = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [doctorEntry, setDoctorEntry] = useState("");
  const [meEntry, setMeEntry] = useState("");

  const yellowPanelColor = "#F0B614";
  const redPanelColor = "#D16868";

  const IconFooter = () => (
    <div className="flex items-center gap-4 px-4 py-2 bg-black/80 rounded-lg shadow-inner justify-between w-fit mx-auto mt-4">
      <Link2 size={22} className="text-[#F0B614] hover:scale-110 transition-transform cursor-pointer" />
      <Star size={22} className="text-[#F0B614] hover:scale-110 transition-transform cursor-pointer" />
      <Accessibility size={22} className="text-[#D16868] hover:scale-110 transition-transform cursor-pointer" />
      <Trophy size={22} className="text-white hover:scale-110 transition-transform cursor-pointer" />
      <ScrollText size={22} className="text-[#48C856] hover:scale-110 transition-transform cursor-pointer" />
      <SquarePlus size={22} className="text-[#A855F7] hover:scale-110 transition-transform cursor-pointer" />
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="min-h-screen flex items-start justify-center overflow-auto custom-scrollbar px-3 pt-20 lg:pt-12 pb-6">
        <div className="relative flex w-full max-w-[1400px] text-white font-sans transition-all duration-300">
          <div className="flex-1 flex flex-col gap-8 px-4">
            {/* Header section */}
            <div className="flex items-start justify-between w-full gap-4">
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
                  <p className="text-[14px] sm:text-[20px] text-[#A0A0A0] font-medium leading-tight">
                    Let your therapist support you on your path to mindfulness.
                  </p>
                </div>
              </div>
              <button className="p-2.5 sm:p-3.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all active:scale-90 shrink-0">
                <Settings size={22} className="text-[#A0A0A0]" />
              </button>
            </div>

            {/* Title Section */}
            <div className="flex flex-col gap-1 mt-4 px-2 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-inter text-white">
                New Entry
              </h2>
              <p className="text-lg sm:text-xl text-[#A0A0A0] font-medium">
                Enter here your new suggestions to patient and receive replies
              </p>
            </div>

            {/* Input Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-full mt-2 px-2 sm:px-6">
              {/* Doctor Panel */}
              <div
                className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col gap-4 shadow-2xl relative"
                style={{ backgroundColor: yellowPanelColor }}
              >
                <div className="flex flex-col items-center gap-1 text-[#1C1C24]">
                  <h3 className="text-[22px] sm:text-[28px] font-bold font-inter text-center leading-tight">
                    doctorfeelgood:
                  </h3>
                  <p className="text-[18px] sm:text-[22px] font-bold font-inter text-center leading-tight">
                    Suggestions, hints, exercises...
                  </p>
                </div>
                <div className="relative flex-1 mt-2">
                  <div className="absolute top-4 left-4 z-10">
                    <Pencil size={18} className="text-white/60" />
                  </div>
                  <textarea
                    value={doctorEntry}
                    onChange={(e) => setDoctorEntry(e.target.value)}
                    className="w-full h-[300px] sm:h-[450px] bg-[#27282E] rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 pt-4 text-white text-lg sm:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-black/20 resize-none custom-scrollbar shadow-inner"
                    placeholder=""
                  />
                </div>
                <IconFooter />
              </div>

              {/* Me Panel */}
              <div
                className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col gap-4 shadow-2xl relative"
                style={{ backgroundColor: redPanelColor }}
              >
                <div className="flex flex-col items-center gap-1 text-white">
                  <h3 className="text-[22px] sm:text-[28px] font-bold font-inter text-center leading-tight">
                    me:
                  </h3>
                  <p className="text-[18px] sm:text-[22px] font-bold font-inter text-center leading-tight">
                    (Re)actions, replies, reports...
                  </p>
                </div>
                <div className="relative flex-1 mt-2">
                  <div className="absolute top-4 left-4 z-10">
                    <Pencil size={18} className="text-white/60" />
                  </div>
                  <textarea
                    value={meEntry}
                    onChange={(e) => setMeEntry(e.target.value)}
                    className="w-full h-[300px] sm:h-[450px] bg-[#212228] rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 pt-4 text-white text-lg sm:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-white/10 resize-none custom-scrollbar shadow-inner"
                    placeholder=""
                  />
                </div>
                <IconFooter />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 pb-10 px-2 sm:px-6">
              <button
                onClick={() => navigate("/therapist-dialog")}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#4F75FF] hover:bg-[#3d64ef] text-white rounded-xl font-bold text-lg sm:text-xl transition-all active:scale-95 shadow-lg"
              >
                Save Entry
              </button>
              <button
                onClick={() => navigate("/therapist-dialog")}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#27282E] hover:bg-[#34363D] text-white rounded-xl font-bold text-lg sm:text-xl transition-all active:scale-95 shadow-md border border-white/5 text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistNewEntry;
