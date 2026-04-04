import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import symptomIcon from '../assets/radarModulesIcon/symptom-blue-icon.svg';

const SymptomRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={symptomIcon}
      moduleTitle="Symptom Radar"
      moduleSubtitle="Now select the most relevant symptom it produces there"
      stepTitle="Fine !!!"
      description={
        <>
          You have now determined the <span style={{ color: '#2AABEE' }} className="italic">“body structure”</span> or region<br />
          as embodiment for the present mindset.
        </>
      }
      footerTitle="Now Select:"
      footerText={
        <>
          The most relevant symptoms it produces there
        </>
      }
      themeColor="#71CFFF"
      themeGradient="linear-gradient(180deg, #71CFFF 0%, #0089CF 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(42, 171, 238, 0.15) 0%, rgba(42, 171, 238, 0.15) 100%)"
      themeGhostCircle="rgba(42, 171, 238, 0.20)"
      themeCardBg="rgba(42, 171, 238, 0.24)"
      backButtonText="Back to Body"
      onBack={() => navigate('/body')}
      onContinue={() => navigate('/symptom-select')}
    />
  );
};

export default SymptomRadar;
