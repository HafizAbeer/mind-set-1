import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import statisticIcon from "../assets/radarModulesIcon/statisticBlue-icon.svg";

const StatisticRevue = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={statisticIcon}
      moduleTitle="STATISTIC REVUE"
      moduleSubtitle="Give a look at your Mindset History"
      stepTitle="So far, so good."
      description={
        <>
          You have gone through the stress analysis process with mindfulness several times and hopefully made personal progress as a result. Now it is worth taking a look back analysing your recent work in more detail.
        </>
      }
      footerTitle="Now explore:"
      footerText={
        <>
          Click here to view the statistical analysis of your successes and developments.
        </>
      }
      themeColor="#4070DA"
      themeGradient="linear-gradient(180deg, #4070DA 0%, #4070DA 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(64, 112, 218, 0.15) 0%, rgba(64, 112, 218, 0.15) 100%)"
      themeGhostCircle="rgba(64, 112, 218, 0.20)"
      themeCardBg="rgba(64, 112, 218, 0.24)"
      backButtonText="Back"
      onBack={() => navigate(-1)}
      onContinue={() => navigate("/statistics-detail")}
      minimalHeader={true}
    />
  );
};

export default StatisticRevue;
