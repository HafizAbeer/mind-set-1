import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import RadarPageHeader from "../components/dashboard/RadarPageHeader";
import symptomIcon from "../assets/radarModulesIcon/symptom-blue-icon.svg";
import {
  patchScreeningSelection,
  screeningDefaults,
  splitMindsetSentence,
  useScreeningSelection,
} from "@/lib/screeningSelection";

const SymptomSelect = () => {
  const navigate = useNavigate();
  const { mindsetLabel, mindsetPhrase, mindsetSentence, triggerLabel, bodyStructureLabel } =
    useScreeningSelection();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customSymptoms, setCustomSymptoms] = useState([]);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const baseSymptoms = [
    { id: 1, label: "pain" },
    { id: 2, label: "tension" },
    { id: 3, label: "cramping" },
    { id: 4, label: "colic" },
    { id: 5, label: "burning" },
    { id: 6, label: "anguish" },
    { id: 7, label: "hot flush" },
    { id: 8, label: "cold/shivering" },
    { id: 9, label: "trembling" },
    { id: 10, label: "nausea" },
    { id: 11, label: "throbbing" },
    { id: 12, label: "feeling of weakness" },
    { id: 13, label: "loss of appetite" },
    { id: 14, label: "stinging" },
    { id: 15, label: "pulling" },
    { id: 16, label: "feeling of pressure" },
    { id: 17, label: "sweating" },
    { id: 18, label: "tinnitus" },
    { id: 19, label: "vertigo" },
    { id: 20, label: "loss of libido" },
    { id: 21, label: "inner restlessness" },
    { id: 22, label: "dizziness" },
    { id: 23, label: "voracious appetite" },
    { id: 24, label: "itching" },
    { id: 25, label: "tingling" },
    { id: 26, label: "warm feeling" },
    { id: 27, label: "numbness / emptiness" },
    { id: 28, label: "relaxation" },
    { id: 29, label: "expansion / widening" },
    { id: 30, label: "splitting" },
    { id: 31, label: "loosening" },
    { id: 32, label: "abundance" },
    { id: 33, label: "instability" },
    { id: 34, label: "dry mouth" },
  ];

  const symptoms = [...customSymptoms, ...baseSymptoms];

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const nextId =
      Math.max(
        0,
        ...baseSymptoms.map((o) => o.id),
        ...customSymptoms.map((o) => o.id),
      ) + 1;
    setCustomSymptoms((prev) => [{ id: nextId, label: trimmed }, ...prev]);
    setSelectedIds((prev) => [...prev, nextId]);
    setCustomInput("");
    setIsModalOpen(false);
  };

  const themeColor = "#71CFFF";
  const themeGradient = "linear-gradient(180deg, #71CFFF 0%, #0089CF 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[20px] pb-4 overflow-y-auto custom-scrollbar">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6">
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">
            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <RadarPageHeader
                icon={symptomIcon}
                iconAlt="Icon"
                title="Symptom Radar"
                subtitle="Now select the most relevant symptom it produces there"
              />

              <div className="w-full min-h-0 bg-[#2AABEE]/10 border-2 border-[#2AABEE] rounded-[16px] p-4 sm:p-[20px] flex items-center gap-[8px] shrink-0">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[clamp(16px,4vw,22px)] leading-tight sm:leading-[28px] tracking-[0px] text-[#2AABEE] m-0 text-center">
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
                    ." „I perceive this mindset in the{" "}
                    <span className="font-semibold text-white">
                      {bodyStructureLabel}
                    </span>
                    ." Which of the following symptoms do you feel most clearly there?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] border-0 bg-sidebar-bg flex items-center justify-center p-4 sm:p-[20px] transition-all shrink-0 font-inter font-semibold text-[16px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own symptom</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#2AABEE] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSelection(symptom.id)}
                      className={`h-[48px] w-full max-w-[440px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedIds.includes(symptom.id)
                        ? "text-white border-transparent shadow-lg active:scale-95"
                        : "text-[#C2C2C2] hover:text-white"
                        }`}
                      style={{
                        background: selectedIds.includes(symptom.id)
                          ? themeGradient
                          : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                        borderColor: selectedIds.includes(symptom.id)
                          ? "#2AABEE"
                          : "transparent",
                      }}
                    >
                      {symptom.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/body-select")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#2AABEE]/50 text-[15px] md:text-[20px] hover:bg-[#2AABEE]/10 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(180deg, #2AABEE50, #1A6C9650)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const labels = selectedIds
                      .map((id) => symptoms.find((s) => s.id === id)?.label)
                      .filter(Boolean);
                    const symptomSummary = labels.length
                      ? labels.join(", ")
                      : screeningDefaults.symptomSummary;
                    patchScreeningSelection({ symptomSummary });
                    navigate("/intention");
                  }}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#2AABEE] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>
              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Symptom Modal */}
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
              <Plus className="rotate-45" size={20} />
            </button>

            <div className="flex flex-col gap-1">
              <h2 className="text-[28px] font-inter font-bold text-white m-0">
                Add Custom Symptom
              </h2>
              <p className="text-[16px] font-inter font-medium text-white m-0 opacity-80">
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
                placeholder="Enter your Symptom..."
                className="w-full h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all"
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
                className="px-6 h-[44px] rounded-[10px] border-2 border-[#2AABEE] text-white font-inter font-bold text-[15px] hover:bg-[#2AABEE]/10 transition-all active:scale-95 flex items-center justify-center m-0"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustom}
                className="px-6 h-[44px] rounded-[10px] text-white font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                style={{ background: themeGradient }}
              >
                Add Symptom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomSelect;
