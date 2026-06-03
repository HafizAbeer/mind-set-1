import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import bodyIcon from "../assets/radarModulesIcon/body-red-icon.svg";
import { useScreeningSelection, splitMindsetSentence } from "@/lib/screeningSelection";

const BodyRadar = () => {
  const navigate = useNavigate();
  const {
    mindsetLabel,
    mindsetPhrase,
    mindsetSentence,
    triggerLabel,
    causeLabel,
    reflectionATitle,
    reflectionAValue,
    reflectionBTitle,
    reflectionBValue,
  } = useScreeningSelection();
  const hasReflection = Boolean(reflectionAValue && reflectionBValue);

  return (
    <RadarModuleLayout
      moduleIcon={bodyIcon}
      centerIconClassName="brightness-0 invert"
      moduleTitle="Body Radar"
      moduleSubtitle="Select in which region of body you feel your mindset most clearly"
      stepTitle="My compliment!"
      description={
        <span style={{ color: "#D16868" }}>
          „
          {(() => {
            if (!mindsetSentence || !triggerLabel) return null;
            return splitMindsetSentence(mindsetSentence).map((seg, i) => {
              if (seg === "[mindset]")
                return <span key={i} style={{ color: "#FFFFFF" }}>{mindsetPhrase}</span>;
              if (seg === "[trigger]")
                return <span key={i} style={{ color: "#FFFFFF" }}>{triggerLabel}</span>;
              return <React.Fragment key={i}>{seg}</React.Fragment>;
            });
          })()}
          , caused by{" "}
          <span style={{ color: "#FFFFFF" }}>
            {causeLabel}
          </span>."<br />
          „I have also reflected carefully about the details of this
          <br />
          combination."
          {hasReflection && (
            <>
              <br />„My{" "}
              <span style={{ color: "#FFFFFF" }}>{reflectionATitle}</span> is{" "}
              <span style={{ color: "#FFFFFF" }}>{reflectionAValue}</span> and
              my <span style={{ color: "#FFFFFF" }}>{reflectionBTitle}</span> is{" "}
              <span style={{ color: "#FFFFFF" }}>{reflectionBValue}</span>."
            </>
          )}
        </span>
      }
      footerTitle="Now mindfully explore:"
      footerText={
        <>
          Where in your body can you feel this mindset most clearly?
          <br />
          Chose by tapping on the structure items. If it is unclear, feel
          <br />
          free to move to the{" "}
          <span style={{ color: "#D16868" }} className="font-semibold">
            next step.
          </span>
        </>
      }
      themeColor="#D16868"
      themeGradient="linear-gradient(180deg, #B58888 0%, #D16868 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(255, 125, 125, 0.15) 0%, rgba(209, 104, 104, 0.15) 100%)"
      themeGhostCircle="rgba(255, 125, 125, 0.20)"
      themeCardBg="rgba(255, 125, 125, 0.42)"
      backButtonText="Back"
      onBack={() => navigate("/reflection-questions")}
      onContinue={() => navigate("/body-select")}
    />
  );
};

export default BodyRadar;
