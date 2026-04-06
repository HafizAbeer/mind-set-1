import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import scriptIcon from '../assets/radarModulesIcon/lifeScript-lightGreen-icon.svg';

const LifeScriptRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={scriptIcon}
      moduleTitle="Life Script Radar"
      moduleSubtitle="Select the scripts do you think you are following in your life."
      stepTitle="Perfect !"
      description={
        <>
          After all the self-perception, mindful analysis, and well<br />
          planed new mindset, try here an other step towards a<br />
          <span style={{ color: '#E2E464' }}>successful</span> development af your mind.
        </>
      }
      footerTitle="Now consider if you like:"
      footerText={
        <>
          What script do you think you are following in your current life?<br />
          What role do you embody in it? Choose from the below<br />
          options one or more items!
        </>
      }
      themeColor="#E2E464"
      themeGradient="linear-gradient(180deg, #F6F362, #C9C500)"
      themeGradientGhost="linear-gradient(180deg, rgba(226, 228, 100, 0.15) 0%, rgba(226, 228, 100, 0.15) 100%)"
      themeGhostCircle="rgba(226, 228, 100, 0.20)"
      themeCardBg="rgba(226, 228, 100, 0.24)"
      backButtonText="Back"
      onBack={() => navigate('/exercises')}
      onContinue={() => navigate('/life-script-select')}
    />
  );
};

export default LifeScriptRadar;
