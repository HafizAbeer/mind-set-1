import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import newScriptIcon from '../assets/radarModulesIcon/newScript-purple-icon.svg';
import { useScreeningSelection } from '@/lib/screeningSelection';

const NewScriptRadar = () => {
  const navigate = useNavigate();
  const { lifeScriptLabel, lifeScriptSentence, oldScriptSummary, oldScriptSentence } = useScreeningSelection();

  return (
    <RadarModuleLayout
      moduleIcon={newScriptIcon}
      moduleTitle="New Script Radar"
      moduleSubtitle="Select the New Scripts do you think to add in your life."
      stepTitle="All right,"
      description={
        <>
          {(() => {
            const parts = lifeScriptSentence.split("[label]");
            return (
              <>
                {parts[0]}
                <span className="italic text-[#CE5CFF]">
                  “{lifeScriptLabel}”
                </span>
                {parts[1]}
              </>
            );
          })()}
          {" and "}
          {(() => {
            const parts = oldScriptSentence.split("[label]");
            return (
              <>
                {parts[0]}
                <span className="italic text-[#CE5CFF]">
                  “{oldScriptSummary}”
                </span>
                {parts[1]}
              </>
            );
          })()}
          .<br />
          With which new positively estimated <span className="text-[#CE5CFF]">script-characteristic/s</span><br />
          you want to strengthen or enhance your life script.
        </>
      }
      footerTitle="So now:"
      footerText={
        <>
          Reflecting mindfully about turning a new script page,<br />
          Which of the following character traits would you like to acquire?<br />
          Choose one or more here!
        </>
      }
      themeColor="#CE5CFF"
      themeGradient="linear-gradient(180deg, #CE5CFF, #9228C0)"
      themeGradientGhost="linear-gradient(180deg, rgba(206, 92, 255, 0.15) 0%, rgba(206, 92, 255, 0.15) 100%)"
      themeGhostCircle="rgba(206, 92, 255, 0.20)"
      themeCardBg="rgba(206, 92, 255, 0.24)"
      backButtonText="Back"
      onBack={() => navigate('/old-script')}
      onContinue={() => navigate('/new-script-select')}
    />
  );
};

export default NewScriptRadar;
