import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import rewardChoiceIcon from '../assets/radarModulesIcon/reward-green-icon.svg';

const RewardChoice = () => {
    const navigate = useNavigate();

    return (
        <RadarModuleLayout
            moduleIcon={rewardChoiceIcon}
            moduleTitle="Reward Choice"
            moduleSubtitle="Choose a reward for your hard, mindful work."
            stepTitle="It’s time for a reward !!!"
            description={
                <>
                    Huge compliment, you have worked relentlessly on your mindset process and achieved several successes. <br />
                    Don't hesitate to reward yourself for it.
                </>
            }
            footerTitle={null}
            footerText={
                <>
                    Go to your reward page and chose from the list or define an own one by yourself.
                </>
            }
            themeColor="#35FF795C"
            themeGradient="linear-gradient(180deg, #6CB083 0%, #115A2A 100%)"
            themeGradientGhost="linear-gradient(180deg, rgba(72, 200, 86, 0.15) 0%, rgba(72, 200, 86, 0.15) 100%)"
            themeGhostCircle="rgba(72, 200, 86, 0.20)"
            themeCardBg="rgba(72, 200, 86, 0.24)"
            backButtonText="Back to Success Gauge"
            onBack={() => navigate('/success-guage')}
            onContinue={() => navigate('/reward-choice-select')}
        />
    );
};

export default RewardChoice;
