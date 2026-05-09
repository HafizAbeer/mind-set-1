import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import oldScriptIcon from '../assets/radarModulesIcon/oldScriptGreen-icon.svg';
import { useScreeningSelection } from '@/lib/screeningSelection';

const OldScriptRadar = () => {
  const navigate = useNavigate();
  const { lifeScriptLabel, lifeScriptSentence } = useScreeningSelection();

  return (
    <RadarModuleLayout
      moduleIcon={oldScriptIcon}
      moduleTitle="Old Script Radar"
      moduleSubtitle="Select the Old Scripts do you think to add in your life."
      stepTitle="Fine..."
      description={
        <>
          {(() => {
            const parts = lifeScriptSentence.split("[label]");
            return (
              <>
                {parts[0]}
                <span style={{ color: '#48C856' }} className="italic">
                  “{lifeScriptLabel}”
                </span>
                {parts[1]}
              </>
            );
          })()}
          .<br />
          Unfortunately, you're feeling stressed right now in this role.<br />
          Which of the troublesome traits inherent in your script do you<br />
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
      backButtonText="Back"
      onBack={() => navigate('/life-script')}
      onContinue={() => navigate('/old-script-select')}
    />
  );
};

export default OldScriptRadar;
