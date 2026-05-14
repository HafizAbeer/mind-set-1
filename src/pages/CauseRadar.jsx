import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import causeIcon from "../assets/radarModulesIcon/cause-green-icon.svg";
import { useScreeningSelection, splitMindsetSentence } from "@/lib/screeningSelection";

const CauseRadar = () => {
  const navigate = useNavigate();
  const { mindsetLabel, mindsetPhrase, mindsetSentence, triggerLabel } = useScreeningSelection();

  return (
    <RadarModuleLayout
      moduleIcon={causeIcon}
      moduleTitle="Cause Radar"
      moduleSubtitle={`Select the deeper emotional cause of your ${triggerLabel}`}
      stepTitle="Very good!!!"
      description={
        (() => {
          if (!mindsetSentence || !triggerLabel) return null;
          return (
            <span style={{ color: "#88EC65" }}>
              „
              {splitMindsetSentence(mindsetSentence).map((seg, i) => {
                if (seg === "[mindset]")
                  return <span key={i} style={{ color: "#FFFFFF" }}>{mindsetPhrase}</span>;
                if (seg === "[trigger]")
                  return <span key={i} style={{ color: "#FFFFFF" }}>{triggerLabel}</span>;
                return <React.Fragment key={i}>{seg}</React.Fragment>;
              })}
              "
            </span>
          );
        })()
      }
      footerTitle="Mindfully explore:"
      footerText={
        <>
          What was the deeper cause behind this mindset-trigger
          <br />
          combination.
          <br />
          <br />
          Try to understand what happened with you then take the{" "}
          <span style={{ color: "#88EC65" }} className="font-semibold">
            next step.
          </span>
        </>
      }
      themeColor="#88EC65"
      themeGradient="linear-gradient(180deg, #96FF71 0%, #5EAE41 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(136, 236, 101, 0.15) 0%, rgba(136, 236, 101, 0.15) 100%)"
      themeGhostCircle="rgba(136, 236, 101, 0.20)"
      themeCardBg="rgba(136, 236, 101, 0.24)"
      backButtonText="Back"
      onBack={() => navigate("/trigger")}
      onContinue={() => navigate("/cause-select")}
    />
  );
};

export default CauseRadar;
