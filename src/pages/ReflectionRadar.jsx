import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import reflectionIcon from '../assets/radarModulesIcon/reflection-yellow-icon.svg';
import ReflectionInfoModal from '../components/dashboard/ReflectionInfoModal';
import { useScreeningSelection } from '@/lib/screeningSelection';

const ReflectionRadar = () => {
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const { mindsetLabel, triggerLabel, causeLabel } = useScreeningSelection();

  return (
    <>
      <RadarModuleLayout
        moduleIcon={reflectionIcon}
        moduleTitle="Reflection Radar"
        moduleSubtitle="How close to validity is your interpretation?"
        stepTitle="Very well, you got off to a good start."
        description={
          <>
            You’ve identified <span style={{ color: '#F0B614' }} className="italic">“{causeLabel}”</span> as an underlying<br />
            cause for <span style={{ color: '#F0B614' }} className="italic">“{triggerLabel}”</span> as trigger of <span style={{ color: '#F0B614' }} className="italic">“{mindsetLabel}”</span> in<br />
            your mindset screening.
          </>
        }
        footerTitle={null}
        footerText={
          <span className="font-semibold text-white">
            Take a quiet moment to think about these<br />
            few questions regarding your selection:
          </span>
        }
        themeColor="#F0B614"
        themeGradient="linear-gradient(180deg, #FFD767 0%, #DFA400 100%)"
        themeGradientGhost="linear-gradient(180deg, rgba(240, 182, 20, 0.15) 0%, rgba(240, 182, 20, 0.15) 100%)"
        themeGhostCircle="rgba(240, 182, 20, 0.20)"
        themeCardBg="rgba(240, 182, 20, 0.24)"
        backButtonText="Back"
        showInfoIcon={true}
        onInfoClick={() => setIsInfoModalOpen(true)}
        onBack={() => navigate('/cause')}
        onContinue={() => navigate('/reflection-questions')}
      />
      <ReflectionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
};

export default ReflectionRadar;
