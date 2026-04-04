import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import mindsetIcon from '../assets/radarModulesIcon/mindset-red-icon.svg';

const MindsetModule = () => {
  const navigate = useNavigate();

  return (
    <RadarModuleLayout
      moduleIcon={mindsetIcon}
      moduleTitle="Mindset Radar"
      moduleSubtitle="Identify your current mindset state"
      stepTitle="Let's start with the 1st step"
      minimalHeader={true}
      description={
        <>
          What thoughts, feelings or visual images{' '}
          <span style={{ color: '#C83636' }}>caught</span> your attention and triggered{' '}
          <span style={{ color: '#C83636' }}>feelings of happiness, uncertainty or stress?</span>
        </>
      }
      footerText={
        <>
          To start by selecting one from the <span className="text-[#C83636] font-semibold">three lists.</span>
        </>
      }
      themeColor="#C83636"
      onBack={() => navigate('/dashboard')}
      onContinue={() => navigate('/mindset-select')}
    />
  );
};

export default MindsetModule;
