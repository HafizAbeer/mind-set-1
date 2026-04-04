import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info, User2, X } from "lucide-react";
import { LegacySidebarPortal } from "../components/dashboard/LegacySidebarPortal";
import { cn } from "@/lib/utils";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";

const BodyRadarSelect = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([4]); // Default selected: Bassin (id 4)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const sections = [
    {
      title: "Spine",
      subtitle:
        "In which part of your spine do you feel the tension most clearly?",
      options: [
        { id: 1, label: "Cervical" },
        { id: 2, label: "Thoracic" },
        { id: 3, label: "Lumbar" },
        { id: 4, label: "Bassin" },
        { id: 5, label: "Head" },
        { id: 6, label: "Jaw joints" },
      ],
    },
    {
      title: "Arms",
      subtitle: "In which joint do you feel your tension most clearly?",
      options: [
        { id: 7, label: "Shoulder Blade" },
        { id: 8, label: "Clavicle" },
        { id: 9, label: "Upper Arm/Shoulder" },
        { id: 10, label: "Under arm/Ellbow" },
        { id: 11, label: "Fingers" },
        { id: 12, label: "Wrist" },
      ],
    },
    {
      title: "Legs",
      subtitle: "In which joint do you feel your tension most clearly?",
      options: [
        { id: 13, label: "Innominate-Thigh" },
        { id: 14, label: "Hip Joint" },
        { id: 15, label: "Femur" },
        { id: 16, label: "Lower Leg-Knee" },
        { id: 17, label: "Ankle" },
        { id: 18, label: "Foot" },
      ],
    },
    {
      title: "Organs",
      subtitle: "In which organ do you feel your tension most clearly?",
      options: [
        { id: 19, label: "Diaphragm (lower rib border)" },
        { id: 20, label: "Lungs Bronchi" },
        { id: 21, label: "Heart Chest" },
        { id: 22, label: "Stomach (left upper belly)" },
        { id: 23, label: "upper belly" },
        { id: 24, label: "Gallbladder (right upper belly)" },
        { id: 25, label: "Pancreas (deep central belly)" },
        { id: 26, label: "Oesophagus (central chest burning)" },
        { id: 27, label: "small intestine (mid belly)" },
        { id: 28, label: "Kidneys" },
        { id: 29, label: "large intestine (lower belly)" },
        { id: 30, label: "male genitals" },
        { id: 31, label: "female genitals (lower belly)" },
        { id: 32, label: "Thyroid Gland" },
        { id: 33, label: "pelvic floor" },
        { id: 34, label: "Throat" },
      ],
    },
    {
      title: "Sensory Organs",
      subtitle: "In which sensory organ do you feel your tension most clearly?",
      options: [
        { id: 35, label: "Sense of Touch Skin" },
        { id: 36, label: "Smell Nose" },
        { id: 37, label: "Taste Mouth" },
        { id: 38, label: "Hearing Ears" },
        { id: 39, label: "View Eyes" },
        { id: 40, label: "Gleichgewicht Innenohr" },
      ],
    },
    {
      title: "Body side",
      subtitle:
        "on which side of your body do you feel your symptoms most clearly?",
      options: [
        { id: 41, label: "more on the left" },
        { id: 42, label: "more on the right" },
        { id: 43, label: "symmetrically", fullWidth: true },
      ],
    },
  ];

  const themeColor = "#D16868";
  const themeGradient = "#D16868";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <LegacySidebarPortal
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div
        className={cn(
          "fixed left-4 top-4 z-200 flex items-center gap-4 sm:left-8 sm:top-8",
          isSidebarOpen && "hidden",
        )}
      >
        {/* <div className="flex w-[min(220px,100%)] max-w-[220px] items-center justify-between rounded-xl border border-white/10 bg-[#1C1C24] p-2 pr-4 shadow-xl">
          <div
            className="flex cursor-pointer items-center gap-3 transition-transform active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsSidebarOpen(true);
            }}
          >
            <img src={mindsetLogo} alt="Logo" className="h-11 w-11 shrink-0" />
            <span className="font-inter text-[20px] leading-[24px] font-semibold text-white">
              New
              <br />
              Mindset
            </span>
          </div>
          <img
            src={collapseIcon}
            alt="Collapse"
            className="h-6 w-6 object-contain cursor-pointer transition-transform hover:scale-110"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div> */}
      </div>

      <div className="min-h-screen flex items-start justify-center overflow-auto custom-scrollbar px-2 pt-[100px] pb-6 sm:px-5 sm:pt-10 md:pt-10">
        <div
          className="relative flex w-full max-w-[1400px] text-white overflow-hidden font-sans transition-all duration-300"
          style={{
            minHeight: "min(1129px, 100dvh)",
          }}
        >
          <div className="flex w-full h-full p-[20px] gap-[20px] justify-center relative z-10 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[956px] h-auto flex flex-col items-start gap-[28px] overflow-visible pb-12">
              <div className="flex items-center min-h-[68px] gap-[16px] w-full shrink-0 h-auto py-2">
                <User2 size={36} className="text-[#D16868] shrink-0" />
                <div className="flex flex-col justify-center h-full w-full gap-0">
                  <h1 className="text-[32px] font-inter font-bold text-white m-0 leading-[36px] tracking-[-0.3px]">
                    Body Radar
                  </h1>
                  <p className="text-[18px] sm:text-[20px] font-inter font-medium text-[#C5C5C5] m-0 leading-[24px] flex items-center mt-2">
                    Select in which region of body you feel your mindset most
                    clearly
                  </p>
                </div>
              </div>

              <div className="w-full min-h-[88px] bg-[#D16868]/10 border-[2px] border-[#D16868] rounded-[16px] p-[20px] flex items-center gap-[8px] shrink-0">
                <Info size={24} className="text-white shrink-0" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[22px] leading-[28px] tracking-[0px] text-white m-0 text-center">
                    You have found{" "}
                    <span className="font-semibold italic text-[#D16868]">
                      “cause”
                    </span>{" "}
                    as deeper cause for{" "}
                    <span className="font-semibold italic text-[#D16868]">
                      “Mindset”
                    </span>{" "}
                    mindset. where in your body do you feel the mindset most
                    clearly?
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full gap-[32px]">
                {sections.map((section, idx) => {
                  return (
                    <div
                      key={idx}
                      className="w-full h-[350px] bg-[#1C1C24]/50 border-[2px] border-[#D16868] rounded-[16px] p-[30px] flex flex-col gap-[20px]"
                    >
                      <div className="flex flex-col shrink-0">
                        <h2 className="text-[28px] font-inter font-bold text-[#D16868] m-0 leading-[32px]">
                          {section.title}
                        </h2>
                        <p className="text-[18px] font-inter font-medium text-[#9CA1A7] m-0 leading-[24px] mt-1">
                          {section.subtitle}
                        </p>
                      </div>

                      <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full max-w-[896px]">
                          {section.options.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => toggleSelection(opt.id)}
                              className={`h-[48px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${
                                opt.fullWidth
                                  ? "sm:col-span-2 w-full"
                                  : "w-full max-w-[440px]"
                              } ${
                                selectedIds.includes(opt.id)
                                  ? "text-white border-transparent shadow-lg active:scale-95"
                                  : "text-[#C5C5C5] hover:text-white"
                              }`}
                              style={{
                                background: selectedIds.includes(opt.id)
                                  ? themeGradient
                                  : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                                borderColor: selectedIds.includes(opt.id)
                                  ? "#D16868"
                                  : "transparent",
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[20px] text-white font-inter font-medium text-[15px] hover:bg-[#83848A]/10 transition-all mb-2"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <Plus size={18} />
                Add your own structure
              </button>

              <div className="flex gap-4 xl:flex-row xl:items-center xl:justify-between w-full mt-4">
                <button
                  onClick={() => navigate("/body")}
                  className="flex-1 xl:w-[468px] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#D16868] text-[15px] md:text-[20px] hover:bg-[#D16868]/10 active:scale-95 shadow-lg"
                  style={{
                    background: "#D1686850",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  onClick={() => navigate("/symptom")}
                  className="flex-1 xl:w-[468px] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue to Symptoms
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>
            {/* Add Custom Structure Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-md"
                  onClick={() => setIsModalOpen(false)}
                />
                <div
                  className="relative w-[632px] h-auto bg-[#27282E] rounded-[20px] p-[20px] flex flex-col gap-[20px] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden"
                  style={{
                    border: "1px solid transparent",
                    backgroundImage:
                      "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-[#83848A] hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-[28px] font-inter font-bold text-white m-0">
                      Add Custom Structure
                    </h2>
                    <p className="text-[16px] font-inter font-medium text-white m-0">
                      Describe your current state in your own words
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter your Structure.."
                      className="w-[592px] h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid transparent",
                        backgroundImage:
                          "linear-gradient(#35374380, #46474E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        padding: "16px 20px",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 h-[44px] rounded-[10px] border-2 border-[#00A3FF] text-white font-inter font-bold text-[15px] hover:bg-[#00A3FF]/10 transition-all active:scale-95 flex items-center justify-center m-0"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log("Adding structure:", customInput);
                        setIsModalOpen(false);
                        setCustomInput("");
                      }}
                      className="px-6 h-[44px] rounded-[10px] text-white font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                      style={{ background: themeGradient }}
                    >
                      Add Structure
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyRadarSelect;
