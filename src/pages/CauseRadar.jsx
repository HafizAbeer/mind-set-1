import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import causeIcon from '../assets/radarModulesIcon/cause-green-icon.svg';

const CauseRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={causeIcon}
      moduleTitle="Cause Radar"
      moduleSubtitle="Select the deeper emotional cause of your trigger"
      stepTitle="Very good!!!"
      description={
        <>
          You have identified <span style={{ color: '#88EC65' }} className="italic">“Striving for/</span><br />
          <span style={{ color: '#88EC65' }} className="italic">aversion against”</span> <span style={{ color: '#88EC65' }} className="italic">“trigger”</span><br />
          as the trigger for <span style={{ color: '#88EC65' }} className="italic">“mindset”</span>.
        </>
      }
      footerTitle="Mindfully explore:"
      footerText={
        <>
          What was the deeper cause behind this mindset-trigger<br />
          combination.<br />
          <br />
          Try to understand what happened with you then take the <span style={{ color: '#88EC65' }} className="font-semibold">next step.</span>
        </>
      }
      themeColor="#88EC65"
      themeGradient="linear-gradient(180deg, #96FF71 0%, #5EAE41 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(136, 236, 101, 0.15) 0%, rgba(136, 236, 101, 0.15) 100%)"
      themeGhostCircle="rgba(136, 236, 101, 0.20)"
      themeCardBg="rgba(136, 236, 101, 0.24)"
      backButtonText="Back to Trigger"
      onBack={() => navigate('/trigger')}
      onContinue={() => navigate('/cause-select')}
    />
  );
};

export default CauseRadar;
