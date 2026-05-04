import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import rewardChoiceIcon from "../assets/radarModulesIcon/reward-red-icon.svg";

const RewardChoice = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={rewardChoiceIcon}
      moduleTitle="Reward Choice"
      moduleSubtitle="Choose a reward for your hard, mindful work."
      stepTitle="It’s time for a reward !!!"
      description={
        <>
          Huge compliment, you have worked relentlessly on your mindset process
          and achieved several successes. <br />
          Don't hesitate to reward yourself for it.
        </>
      }
      footerTitle={null}
      footerText={
        <>
          Go to your reward page and chose from the list or define an own one by
          yourself.
        </>
      }
      themeColor="white"
      themeGradient="linear-gradient(to top, #FF3535, #FF35352A)"
      themeGradientGhost="#FF35355C"
      themeGhostCircle="#FF35355C"
      themeCardBg="#FF35355C"
      backButtonText="Back"
      onBack={() => navigate("/success-gauge")}
      onContinue={() => navigate("/reward-choice-select")}
    />
  );
};

export default RewardChoice;
