import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadarModuleLayout from '../components/dashboard/RadarModuleLayout';
import successGuageIcon from '../assets/radarModulesIcon/successGuage-red-icon.svg';

const SuccessGuage = () => {
    const navigate = useNavigate();

    return (
        <RadarModuleLayout
            moduleIcon={successGuageIcon}
            moduleTitle="Success Gauge"
            moduleSubtitle="Select the current mindset development."
            stepTitle="Okay, Congratulation..."
            description={
                <>
                    So you defined and analyzed your mindset, embodiment, life-script and psychosomatic health.
                </>
            }
            footerTitle='Now explore:'
            footerText={
                <>
                    How did your mental and physical health develop during the use of this New Mindset protocol? Choose from the below options the most appropriate answers!
                </>
            }
            themeColor="#D16868"
            themeGradient="linear-gradient(180deg, #E17373 0%, #A34545 100%)"
            themeGradientGhost="linear-gradient(180deg, rgba(209, 104, 104, 0.15) 0%, rgba(209, 104, 104, 0.15) 100%)"
            themeGhostCircle="rgba(209, 104, 104, 0.20)"
            themeCardBg="rgba(209, 104, 104, 0.24)"
            backButtonText="Back to start"
            onBack={() => navigate('/dashboard')}
            onContinue={() => navigate('/success-gauge-select')}
        />
    );
};

export default SuccessGuage;
