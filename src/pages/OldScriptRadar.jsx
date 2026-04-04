import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import oldScriptIcon from '../assets/radarModulesIcon/oldScriptGreen-icon.svg';

const OldScriptRadar = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={oldScriptIcon}
      moduleTitle="Old Script Radar"
      moduleSubtitle="Select the Old Scripts do you think to add in your life."
      stepTitle="Fine..."
      description={
        <>
          So let’s start with this role of <span style={{ color: '#48C856' }} className="italic">“life script”</span> as your actual life script.<br />
          Unfortunately you’r feeling stressed right now in this role.<br />
          Which of your troublesome Traits inherent in your script you<br />
          want to fight in the near future?
        </>
      }
      footerTitle="Don’t rush:"
      footerText={
        <>
          Think carefully about what you really want to leave behind.<br />
          Choose one or more items here!
        </>
      }
      themeColor="#48C856"
      themeGradient="linear-gradient(180deg, #74FF83, #48C856)"
      themeGradientGhost="linear-gradient(180deg, rgba(72, 200, 86, 0.15) 0%, rgba(72, 200, 86, 0.15) 100%)"
      themeGhostCircle="rgba(72, 200, 86, 0.20)"
      themeCardBg="rgba(72, 200, 86, 0.24)"
      backButtonText="Back to Life Script"
      onBack={() => navigate('/life-script')}
      onContinue={() => navigate('/old-script-select')}
    />
  );
};

export default OldScriptRadar;
