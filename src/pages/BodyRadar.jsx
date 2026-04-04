import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import bodyIcon from "../assets/radarModulesIcon/body-red-icon.svg";

const BodyRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={bodyIcon}
      moduleTitle="Body Radar"
      moduleSubtitle="Select in which region of body you feel your mindset most clearly"
      stepTitle="My compliment!"
      description={
        <>
          You have found{" "}
          <span style={{ color: "#D16868" }} className="italic">
            “cause”
          </span>
          <br />
          as deeper cause for{" "}
          <span style={{ color: "#D16868" }} className="italic">
            “trigger”
          </span>{" "}
          of{" "}
          <span style={{ color: "#D16868" }} className="italic">
            “Mindset”
          </span>
          .<br />
          You have also reflected carefully about the details of this
          <br />
          combination.
        </>
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
      backButtonText="Back to Reflection"
      onBack={() => navigate("/reflection-questions")}
      onContinue={() => navigate("/body-select")}
    />
  );
};

export default BodyRadar;
