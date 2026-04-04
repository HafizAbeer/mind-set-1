import mindsetLogo from "../../assets/mindset-logo.svg";
import mindsetIcon from "../../assets/icons/mindset-icon.svg";
import triggerIcon from "../../assets/icons/trigger-icon.svg";
import causeIcon from "../../assets/icons/cause-icon.svg";
import reflectionIcon from "../../assets/icons/reflection-icon.svg";
import bodyIcon from "../../assets/icons/body-icon.svg";
import symptomIcon from "../../assets/icons/symptom-icon.svg";
import wishIcon from "../../assets/icons/wish-icon.svg";
import anchorIcon from "../../assets/icons/anchor-icon.svg";
import exerciseIcon from "../../assets/icons/exercise-icon.svg";
import scriptIcon from "../../assets/icons/script-icon.svg";
import { useNavigate } from "react-router-dom";

const RadarIcon = ({
  iconPath,
  color,
  number,
  label,
  angle,
  gradient,
  borderColor,
  route,
}) => {
  const navigate = useNavigate();
  const radius = 231;
  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

  const containerStyle = gradient
    ? {
        background: gradient,
        border: `1px solid ${borderColor || "rgba(255, 255, 255, 0.1)"}`,
      }
    : {};

  return (
    <div
      onClick={() => route && navigate(route)}
      className="absolute flex flex-col items-center group cursor-pointer"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
        width: "62px",
        height: "102px",
        gap: "8px",
      }}
    >
      <div className="relative shrink-0">
        <div
          className={`w-[62px] h-[62px] rounded-[18px] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 p-[18px] ${!gradient ? color : ""}`}
          style={containerStyle}
        >
          <img src={iconPath} alt="" className="w-7 h-7 object-contain" />
        </div>
        <div
          className="absolute -top-1 -right-1 w-[22px] h-[22px] bg-black/30 backdrop-blur-[4px] border border-[#3E444E] rounded-full flex items-center justify-center z-10"
          style={{ padding: "4px" }}
        >
          <span className="text-[10px] font-bold text-white leading-none">
            {number}
          </span>
        </div>
      </div>
      <span
        className="text-[12px] font-semibold text-white text-center w-full h-[32px] leading-[16px] flex items-center justify-center transition-colors font-sans"
        style={{ letterSpacing: "0px" }}
      >
        {label}
      </span>
    </div>
  );
};

const RadarVisualization = () => {
  const icons = [
    {
      iconPath: mindsetIcon,
      number: 1,
      label: "Mindset",
      angle: 30,
      gradient: "linear-gradient(135deg, #FF7E7E, #CD4343)",
      borderColor: "rgba(255, 89, 92, 0.5)",
      route: "/mindset",
    },
    {
      iconPath: triggerIcon,
      number: 2,
      label: "Trigger",
      angle: 60,
      gradient: "linear-gradient(135deg, #738AFF, #3C56D8)",
      borderColor: "rgba(82, 111, 255, 0.5)",
      route: "/trigger",
    },
    {
      iconPath: causeIcon,
      number: 3,
      label: "Cause",
      angle: 90,
      gradient: "linear-gradient(135deg, #96FF71, #5EAE41)",
      borderColor: "rgba(136, 236, 101, 0.5)",
      route: "/cause",
    },
    {
      iconPath: reflectionIcon,
      number: 4,
      label: "Reflection",
      angle: 120,
      gradient: "linear-gradient(135deg, #FFD767, #DFA400)",
      borderColor: "rgba(240, 182, 20, 0.5)",
      route: "/reflection",
    },
    {
      iconPath: bodyIcon,
      number: 5,
      label: "Body",
      angle: 150,
      gradient: "#D16868",
      borderColor: "rgba(202, 107, 219, 0.5)",
      route: "/body",
    },
    {
      iconPath: symptomIcon,
      number: 6,
      label: "Symptoms",
      angle: 180,
      gradient: "linear-gradient(135deg, #71CFFF, #0089CF)",
      borderColor: "rgba(42, 171, 238, 0.5)",
      route: "/symptom",
    },
    {
      iconPath: wishIcon,
      number: 7,
      label: "Intention",
      angle: 210,
      gradient: "linear-gradient(135deg, #FFD075, #E39B10)",
      borderColor: "rgba(251, 169, 11, 0.5)",
      route: "/intention",
    },
    {
      iconPath: anchorIcon,
      number: 8,
      label: "Anchor",
      angle: 240,
      gradient: "linear-gradient(135deg, #FF658E, #D22C57)",
      borderColor: "rgba(255, 91, 134, 0.5)",
      route: "/anchor",
    },
    {
      iconPath: exerciseIcon,
      number: 9,
      label: "Exercises",
      angle: 270,
      gradient: "linear-gradient(135deg, #FF996A, #FF6721)",
      borderColor: "rgba(255, 103, 33, 0.5)",
      route: "/exercises",
    },
    {
      iconPath: scriptIcon,
      number: 10,
      label: "Life Script",
      angle: 300,
      gradient: "linear-gradient(135deg, #F6F362, #C9C500)",
      borderColor: "rgba(226, 228, 100, 0.5)",
      route: "/life-script",
    },
    {
      iconPath: scriptIcon,
      number: 11,
      label: "Old Script",
      angle: 330,
      gradient: "linear-gradient(180deg, #74FF83, #48C856)",
      borderColor: "rgba(72, 200, 86, 0.5)",
      route: "/old-script",
    },
    {
      iconPath: scriptIcon,
      number: 12,
      label: "New Script",
      angle: 0,
      gradient: "linear-gradient(180deg, #CE5CFF, #9228C0)",
      borderColor: "rgba(206, 92, 255, 0.5)",
      route: "/new-script",
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible py-20">
      {/* <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-white/30 rounded-full" />
        <div className="absolute w-[500px] h-[500px] border border-white/30 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-white/30 rounded-full" />
        <div className="absolute w-full h-[1px] bg-white/30" />
        <div className="absolute h-full w-[1px] bg-white/30" />
      </div> */}

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "570px",
          height: "570px",
          border: "1.5px solid #3E444E",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "524px",
          height: "524px",
          border: "1.5px dashed #3E444E",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "478px",
          height: "478px",
          border: "1.5px solid #3E444E",
        }}
      />

      {/* <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "322px",
          height: "322px",
          border: "1.5px solid #3E444E",
        }}
      /> */}

      <div
        className="relative flex items-center justify-center rounded-full border-[3px] border-white"
        style={{
          width: "205px",
          height: "192px",
        }}
      >
        <img
          src={mindsetLogo}
          alt="New Mindset"
          className="w-[180px] h-[170px] object-contain"
        />
      </div>

      {icons.map((item, idx) => (
        <RadarIcon key={idx} {...item} />
      ))}
    </div>
  );
};

export default RadarVisualization;
