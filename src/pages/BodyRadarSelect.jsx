import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Plus, X } from "lucide-react";
import { LegacySidebarPortal } from "../components/dashboard/LegacySidebarPortal";
import { cn } from "@/lib/utils";
import {
  patchScreeningSelection,
  screeningDefaults,
  splitMindsetSentence,
  useScreeningSelection,
} from "@/lib/screeningSelection";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import bodyIcon from "../assets/radarModulesIcon/body-red-icon.svg";

const BodyRadarSelect = () => {
  const navigate = useNavigate();
  const { mindsetLabel, mindsetPhrase, mindsetSentence, triggerLabel, causeLabel } = useScreeningSelection();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customStructures, setCustomStructures] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const baseSections = [
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
        { id: 40, label: "Equilibrium" },
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

  const sections =
    customStructures.length > 0
      ? [
          {
            title: "Custom",
            subtitle: "Your own added structures",
            options: customStructures,
          },
          ...baseSections,
        ]
      : baseSections;

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const baseMaxId = Math.max(
      0,
      ...baseSections.flatMap((s) => s.options.map((o) => o.id)),
    );
    const nextId =
      Math.max(baseMaxId, ...customStructures.map((o) => o.id)) + 1;
    setCustomStructures((prev) => [{ id: nextId, label: trimmed }, ...prev]);
    setSelectedIds((prev) => [...prev, nextId]);
    setCustomInput("");
    setIsModalOpen(false);
  };

  const themeColor = "#D16868";
  const themeGradient = "#D16868";

  return (
    <div className="relative h-screen w-full overflow-hidden">
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

      <div className="h-full flex items-start justify-center overflow-y-auto custom-scrollbar px-2 pt-[20px] pb-6 sm:px-5">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white overflow-hidden font-sans transition-all duration-300">
          <div className="flex w-full h-full px-[20px] pb-[20px] gap-[20px] justify-center relative z-10 overflow-hidden">
            <div className="w-full max-w-[956px] h-full min-h-0 flex flex-col items-start gap-[28px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0 pl-16 xl:pl-0">
                <img
                  src={bodyIcon}
                  alt="Body Icon"
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <div className="min-w-0 flex flex-col">
                  <h1 className="m-0 font-inter text-[clamp(22px,4vw,32px)] font-bold leading-tight tracking-[-0.3px] text-white sm:text-[32px] sm:leading-[36px]">
                    Body Radar
                  </h1>
                  <p className="m-0 font-inter text-[clamp(14px,3vw,20px)] font-medium leading-snug tracking-[-0.3px] text-[#9CA1A7] sm:text-[20px] sm:leading-[24px]">
                    Select in which region of body you feel your mindset most
                    clearly
                  </p>
                </div>
              </div>

              <div className="w-full min-h-[88px] bg-[#D16868]/10 border-[2px] border-[#D16868] rounded-[16px] p-[20px] flex items-center gap-[8px] shrink-0">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[22px] leading-[28px] tracking-[0px] text-[#D16868] m-0 text-center">
                    „
                    {(() => {
                      if (!mindsetSentence || !triggerLabel) return null;
                      return splitMindsetSentence(mindsetSentence).map((seg, i) => {
                        if (seg === "[mindset]")
                          return <span key={i} className="font-semibold text-white">{mindsetPhrase}</span>;
                        if (seg === "[trigger]")
                          return <span key={i} className="font-semibold text-white">{triggerLabel}</span>;
                        return <React.Fragment key={i}>{seg}</React.Fragment>;
                      });
                    })()}
                    , caused by{" "}
                    <span className="font-semibold text-white">
                      {causeLabel}
                    </span>
                    ." Where in your body do you feel this most clearly?
                  </p>
                </div>
              </div>

              <div className="w-full flex-1 min-h-0 flex flex-col gap-[28px] overflow-y-auto no-scrollbar">
                <div className="flex flex-col w-full gap-[12px]">
                {(() => {
                  const visibleSections = openSection
                    ? sections.filter(
                        (s, idx) =>
                          (s.title || `section-${idx}`) === openSection,
                      )
                    : sections;
                  return visibleSections.map((section, idx) => {
                    const key = section.title || `section-${idx}`;
                    const isOpen = openSection === key;
                    const selectedCount = section.options.filter((o) =>
                      selectedIds.includes(o.id),
                    ).length;
                    return (
                      <div
                        key={key}
                        className="w-full bg-[#1C1C24]/50 border-[2px] border-[#D16868] rounded-[16px] overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSection(key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-3 p-[16px] sm:p-[20px] text-left hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="flex flex-col min-w-0">
                            <h2 className="text-[20px] sm:text-[24px] font-inter font-bold text-[#D16868] m-0 leading-[26px] sm:leading-[30px]">
                              {section.title}
                              {selectedCount > 0 && (
                                <span className="ml-2 text-[14px] sm:text-[16px] font-medium text-white/80">
                                  ({selectedCount})
                                </span>
                              )}
                            </h2>
                            {isOpen && (
                              <p className="text-[14px] sm:text-[16px] font-inter font-medium text-[#9CA1A7] m-0 leading-[20px] sm:leading-[22px] mt-1">
                                {section.subtitle}
                              </p>
                            )}
                          </div>
                          <ChevronDown
                            size={24}
                            className={cn(
                              "shrink-0 text-[#D16868] transition-transform duration-200",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-[16px] sm:px-[20px] pb-[16px] sm:pb-[20px] pt-0">
                            <div className="grid grid-cols-2 gap-[12px] sm:gap-[16px] w-full max-w-[896px]">
                              {section.options.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => toggleSelection(opt.id)}
                                  className={`h-[48px] rounded-[10px] p-[8px_12px] sm:p-[12px_20px] flex items-center justify-center text-center transition-all font-inter font-medium text-[13px] sm:text-[15px] border ${
                                    opt.fullWidth
                                      ? "col-span-2 w-full"
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
                        )}
                      </div>
                    );
                  });
                })()}
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
              </div>

              <div className="flex gap-4 xl:flex-row xl:items-center xl:justify-between w-full mt-4 shrink-0">
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
                  onClick={() => {
                    const allOpts = sections.flatMap((s) => s.options);
                    const labels = selectedIds
                      .map((id) => allOpts.find((o) => o.id === id)?.label)
                      .filter(Boolean);
                    const bodyStructureLabel = labels.length
                      ? labels.join(", ")
                      : screeningDefaults.bodyStructureLabel;
                    patchScreeningSelection({ bodyStructureLabel });
                    navigate("/symptom");
                  }}
                  className="flex-1 xl:w-[468px] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#D16868] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddCustom();
                      }}
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
                      onClick={handleAddCustom}
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
