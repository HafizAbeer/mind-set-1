import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import anchorIcon from '../assets/radarModulesIcon/anchor-pink-icon.svg';

const AnchorRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={anchorIcon}
      moduleTitle="Anchor Radar"
      moduleSubtitle="You have now gone through all the steps of the mindfulness process."
      stepTitle="Compliments !!!"
      description={
        <>
          You have now gone through all the steps of the <span className="font-semibold">mindfulness</span><br />
          process and determined <span style={{ color: '#FF5B86' }} className="italic">“Intention/es”</span> as desired<br />
          <span style={{ color: '#FF5B86' }} className="italic">“mindset/s.”</span>
        </>
      }
      footerTitle="Now:"
      footerText={
        <>
          You can now choose a favourite background image that will<br />
          be a support and anchor for you in moments of crisis and<br />
          need.
        </>
      }
      themeColor="#FF5B86"
      themeGradient="linear-gradient(180deg, #FF8EA0 0%, #FF5B86 100%)"
      themeGradientGhost="linear-gradient(180deg, rgba(255, 91, 134, 0.15) 0%, rgba(255, 91, 134, 0.15) 100%)"
      themeGhostCircle="rgba(255, 91, 134, 0.20)"
      themeCardBg="rgba(255, 91, 134, 0.24)"
      backButtonText="Back to Intention"
      onBack={() => navigate('/intention')}
      onContinue={() => navigate('/anchor-select')}
    />
  );
};

export default AnchorRadar;
