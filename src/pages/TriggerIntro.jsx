import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import triggerLogo from "../assets/radarModulesIcon/trigger-blue-icon.svg";
import { useScreeningSelection } from "@/lib/screeningSelection";

const TriggerIntroPage = () => {
  const navigate = useNavigate();
  const { mindsetLabel } = useScreeningSelection();

  const themeColor = "#3C56D8";
  const themeGradient = "linear-gradient(180deg, #738AFF 0%, #3C56D8 100%)";
  const themeGradientGhost =
    "linear-gradient(180deg, rgba(115, 138, 255, 0.15) 0%, rgba(60, 86, 216, 0.15) 100%)";
  const themeGhostCircle = "rgba(60, 86, 216, 0.20)";
  const themeCardBg = "rgba(60, 86, 216, 0.24)";

  return (
    <RadarModuleLayout
      moduleIcon={triggerLogo}
      moduleTitle="Trigger Radar"
      moduleSubtitle="Select the current trigger of your mindset"
      stepTitle="Great!"
      description={
        <p className="m-0">
          You have chosen{" "}
          <span className="italic text-[#6B83FF]">“{mindsetLabel}”</span>
          <br />
          as your mindset!
        </p>
      }
      centerIcon={triggerLogo}
      themeColor={themeColor}
      themeGradient={themeGradient}
      themeGradientGhost={themeGradientGhost}
      themeGhostCircle={themeGhostCircle}
      themeCardBg={themeCardBg}
      footerTitle="Mindfully explore:"
      footerText={
        <span className="leading-relaxed block px-8">
          Who or what triggered this mindset. If it is unclear, try to
          <br />
          reflect accurately before you got the{" "}
          <span className="text-[#6B83FF]">next step.</span>
        </span>
      }
      onBack={() => navigate("/mindset")}
      onContinue={() => navigate("/trigger-radar")}
      backButtonText="Back"
    />
  );
};

export default TriggerIntroPage;
