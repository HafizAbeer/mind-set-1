import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import exerciseIcon from '../assets/radarModulesIcon/exercise-orange-icon.svg';
import ExerciseInfoModal from '../components/dashboard/ExerciseInfoModal';
import { useScreeningSelection } from '@/lib/screeningSelection';

const ExercisesRadar = () => {
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const { intentionLabel } = useScreeningSelection();

  return (
    <>
      <RadarModuleLayout
        moduleIcon={exerciseIcon}
        moduleTitle="Exercises Radar"
        moduleSubtitle="Select which exercises you prefer to strengthen your new mindset."
        stepTitle="Well done !!!"
        description={
          <>
            You have now followed the whole process of <span style={{ color: '#FF6721' }}>mindful</span> self<br />
            reflection and first steps towards your new mindset and<br />
            helping <span style={{ color: '#FF6721' }}>visual anchors.</span>
          </>
        }
        footerTitle="And now..."
        footerText={
          <>
            You can choose from the following list which exercises you prefer in<br />
            order to strengthen and develop <span style={{ color: '#FF6721' }} className="italic">‘{intentionLabel}’</span> as your new mindset.
          </>
        }
        themeColor="#FF6721"
        themeGradient="linear-gradient(180deg, #FF8D54 0%, #FF6721 100%)"
        themeGradientGhost="linear-gradient(180deg, rgba(255, 103, 33, 0.15) 0%, rgba(255, 103, 33, 0.15) 100%)"
        themeGhostCircle="rgba(255, 103, 33, 0.20)"
        themeCardBg="rgba(255, 103, 33, 0.24)"
        backButtonText="Back"
        showInfoIcon={true}
        onInfoClick={() => setIsInfoModalOpen(true)}
        onBack={() => navigate('/anchor')}
        onContinue={() => navigate('/exercises-select')}
      />
      <ExerciseInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
};

export default ExercisesRadar;
