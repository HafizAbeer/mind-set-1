import React from "react";
import { useNavigate } from "react-router-dom";
import RadarModuleLayout from "../components/dashboard/RadarModuleLayout";
import intentionIcon from "../assets/radarModulesIcon/intention-yellow-icon.svg";
import IntentionInfoModal from "../components/dashboard/IntentionInfoModal";
import { useScreeningSelection } from "@/lib/screeningSelection";

const IntentionRadar = () => {
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const {
    symptomSummary,
    bodyStructureLabel,
    mindsetLabel,
    triggerLabel,
    causeLabel,
  } = useScreeningSelection();

  return (
    <>
      <RadarModuleLayout
        moduleIcon={intentionIcon}
        moduleTitle="Intention Radar"
        moduleSubtitle="Now select the mindset that you want for the near future"
        stepTitle="Great, good body awareness!!!"
        description={
          <>
            You have assigned{" "}
            <span style={{ color: "#FBA90B" }} className="italic">
              “{symptomSummary}”
            </span>{" "}
            in the
            <br />
            <span style={{ color: "#FBA90B" }} className="italic">
              “{bodyStructureLabel}”
            </span>{" "}
            as associated
            <br />
            symptom.
          </>
        }
        footerTitle="Now Select:"
        footerText={
          <>
            From the list of desired mindsets, thoughts or emotional states,
            which
            <br />
            ones would you ideally like to adopt in order to be able to cope
            with
            <br />
            <span style={{ color: "#FBA90B" }} className="italic">
              ‘{mindsetLabel}’
            </span>{" "}
            <span style={{ color: "#2AABEE" }} className="italic">
              ‘{triggerLabel}’
            </span>{" "}
            and{" "}
            <span style={{ color: "#88EC65" }} className="italic">
              ‘{causeLabel}’
            </span>{" "}
            in the future?
          </>
        }
        themeColor="#FBA90B"
        themeGradient="linear-gradient(180deg, #FFCD6E 0%, #FBA90B 100%)"
        themeGradientGhost="linear-gradient(180deg, rgba(251, 169, 11, 0.15) 0%, rgba(251, 169, 11, 0.15) 100%)"
        themeGhostCircle="rgba(251, 169, 11, 0.20)"
        themeCardBg="rgba(251, 169, 11, 0.24)"
        backButtonText="Back"
        showInfoIcon={true}
        onInfoClick={() => setIsInfoModalOpen(true)}
        onBack={() => navigate("/symptom")}
        onContinue={() => navigate("/intention-select")}
      />
      <IntentionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
};

export default IntentionRadar;
