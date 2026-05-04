import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Share2,
  LayoutDashboard,
  FileText,
  BarChart3,
  BookOpen,
  RotateCcw,
  Gauge,
  Plus,
  Link,
  ChevronDown,
} from "lucide-react";

// Icons
import mindsetLogo from "../assets/mindset-logo.svg";
import mindsetIcon from "../assets/radarModulesIcon/mindset-red-icon.svg";
import triggerIcon from "../assets/radarModulesIcon/trigger-blue-icon.svg";
import causeIcon from "../assets/radarModulesIcon/cause-green-icon.svg";
import bodyIcon from "../assets/radarModulesIcon/body-red-icon.svg";
import symptomIcon from "../assets/radarModulesIcon/symptom-blue-icon.svg";
import intentionIcon from "../assets/radarModulesIcon/intention-yellow-icon.svg";
import exerciseIcon from "../assets/radarModulesIcon/exercise-orange-icon.svg";
import scriptIcon from "../assets/radarModulesIcon/lifeScript-lightGreen-icon.svg";
import statisticIcon from "../assets/radarModulesIcon/statisticBlue-icon.svg";

// Nav Icons
import overviewNavIcon from "../assets/statisticsDetailsPageIcons/overview-icon.svg";
import protocolNavIcon from "../assets/statisticsDetailsPageIcons/protocol-icon.svg";
import graphNavIcon from "../assets/statisticsDetailsPageIcons/grapg-icon.svg";
import diaryNavIcon from "../assets/statisticsDetailsPageIcons/diary-icon.svg";
import reflectionNavIcon from "../assets/statisticsDetailsPageIcons/reflection-icon.svg";
import mindOMeterNavIcon from "../assets/statisticsDetailsPageIcons/mind-o-meter-icon.svg";
import shareIcon from "../assets/statisticsDetailsPageIcons/share-icon.svg";
import ShareModal from "../components/dashboard/ShareModal";

const StatCard = ({ icon, title, items, themeColor }) => (
  <div
    className="rounded-[24px] p-6 flex flex-col gap-5 border-[1.5px] transition-all hover:translate-y-[-4px] cursor-default"
    style={{
      borderColor: `${themeColor}60`,
      boxShadow: `0 8px 32px -8px ${themeColor}20`,
      background: "transparent",
    }}
  >
    <div className="flex items-center gap-3.5">
      <img
        src={icon}
        alt=""
        className="w-7 h-7 object-contain"
        style={{ filter: `drop-shadow(0 0 8px ${themeColor}40)` }}
      />
      <h3
        className="text-[20px] font-inter font-bold tracking-tight"
        style={{ color: themeColor }}
      >
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-[12px] px-5 py-3.5 text-[16px] font-inter font-medium text-white/95 transition-colors"
          style={{
            background: `${themeColor}80`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

const ProtocolEntry = ({ timestamp, tags }) => (
  <div className="rounded-[20px] p-6 border border-white/10 bg-[#1A1C26]/40 backdrop-blur-sm flex flex-col gap-5">
    <span className="text-[14px] font-inter font-semibold text-white/60 tracking-wide uppercase">
      {timestamp}
    </span>
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="px-4 py-2 rounded-full text-[14px] font-inter font-bold border"
          style={{
            borderColor: `${tag.color}80`,
            backgroundColor: `${tag.color}40`,
            color: tag.color,
          }}
        >
          {tag.label}
        </div>
      ))}
    </div>
  </div>
);

const DiaryEntry = ({ timestamp, sentiment, motivation, text }) => (
  <div className="rounded-[24px] p-7 border border-[#4070DA]/60 bg-[#1A1C26]/40 backdrop-blur-md flex flex-col gap-5 transition-all hover:bg-[#1A1C26]/60">
    <div className="flex items-center justify-between">
      <span className="text-[16px] font-inter font-bold text-white/90">
        {timestamp}
      </span>
      <div
        className={`px-5 py-1.5 rounded-full text-[12px] font-inter font-bold border uppercase tracking-widest ${
          sentiment === "Positive"
            ? "border-[#88EC65] text-[#88EC65] bg-[#88EC65]/10"
            : "border-[#FF595C] text-[#FF595C] bg-[#FF595C]/10"
        }`}
      >
        {sentiment}
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-inter font-bold text-[#4070DA] uppercase tracking-wider">
          Motivation:
        </span>
        <span className="text-[16px] font-inter font-medium text-white/95">
          {motivation}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-inter font-bold text-[#4070DA] uppercase tracking-wider">
          Entry:
        </span>
        <p className="text-[16px] font-inter font-medium text-white/80 leading-relaxed font-italic line-clamp-3">
          {text}
        </p>
      </div>
    </div>
  </div>
);

const ReflectionEntry = ({ timestamp, combination, text }) => (
  <div className="rounded-[24px] p-7 border border-[#4070DA]/60 bg-[#1A1C26]/40 backdrop-blur-md flex flex-col gap-5 transition-all hover:bg-[#1A1C26]/60">
    <span className="text-[16px] font-inter font-bold text-white/90">
      {timestamp}
    </span>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-inter font-bold text-[#4070DA] uppercase tracking-wider">
          Combination:
        </span>
        <span className="text-[16px] font-inter font-medium text-white/95 leading-tight">
          {combination}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-inter font-bold text-[#4070DA] uppercase tracking-wider">
          Entry:
        </span>
        <p className="text-[16px] font-inter font-medium text-white/80 leading-relaxed font-italic line-clamp-4">
          {text}
        </p>
      </div>
    </div>
  </div>
);

const MetricCard = ({ title, value, color }) => (
  <div className="rounded-[24px] p-6 border border-white/10 bg-[#1A1C26]/40 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-all hover:bg-[#1A1C26]/60 min-h-[140px]">
    <span className="text-[14px] font-inter font-bold text-white/60 text-center">
      {title}
    </span>
    <span
      className="text-[44px] font-inter font-bold leading-none"
      style={{ color }}
    >
      {value}
    </span>
  </div>
);

const SatelliteMetric = ({ title, value, trend, trendColor }) => (
  <div className="w-full sm:w-auto rounded-[24px] p-6 border border-white/10 bg-[#1C1C24]/60 backdrop-blur-md flex flex-col gap-1.5 transition-all hover:scale-[1.05] hover:bg-[#1C1C24]/80 shadow-2xl min-w-0 sm:min-w-[220px]">
    <span className="text-[14px] font-inter font-bold text-white/60 uppercase tracking-widest">
      {title}
    </span>
    <span className="text-[32px] font-inter font-bold text-white">{value}</span>
    <span
      className="text-[12px] font-inter font-bold"
      style={{ color: trendColor }}
    >
      {trend}{" "}
      <span className="text-white/40 font-medium lowercase">
        since last month
      </span>
    </span>
  </div>
);

const StatisticsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [timeFilter, setTimeFilter] = useState("Weeks");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'logout' | 'delete' | null
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showNewDiaryEntry, setShowNewDiaryEntry] = useState(false);
  const [showNewReflectionEntry, setShowNewReflectionEntry] = useState(false);
  const mobileNavRef = useRef(null);

  const col1 = [
    {
      title: "Top Mindsets",
      icon: mindsetIcon,
      themeColor: "#FF595C",
      items: ["Joy", "Serenity", "Worry", "Anger"],
    },
    {
      title: "Causes",
      icon: causeIcon,
      themeColor: "#88EC65",
      items: [
        "Ambition",
        "Excessive Self-Criticism",
        "Self-Worth",
        "Feeling Powerful",
      ],
    },
    {
      title: "Symptoms",
      icon: symptomIcon,
      themeColor: "#2AABEE",
      items: ["Pain", "Sweating", "tinnitus", "nausea"],
    },
    {
      title: "Exercises",
      icon: exerciseIcon,
      themeColor: "#FF6721",
      items: ["Yoga", "pet care", "meet friends", "tidying up"],
    },
  ];

  const col2 = [
    {
      title: "Trigger",
      icon: triggerIcon,
      themeColor: "#526FFF",
      items: ["Love", "Children", "Parents", "Weather"],
    },
    {
      title: "Body Structures",
      icon: bodyIcon,
      themeColor: "#D16868",
      items: ["Upper Spine", "Jaw", "Cervical", "Stomach"],
    },
    {
      title: "Intention",
      icon: intentionIcon,
      themeColor: "#FBA90B",
      items: ["Serenity", "Selfcare", "Empathy", "offensive spirit"],
    },
    {
      title: "Life script",
      icon: scriptIcon,
      themeColor: "#EEF05C",
      items: ["Serenity", "Selfcare", "Empathy", "offensive spirit"],
    },
  ];

  const protocolData = [
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      tags: [
        { label: "Serenity", color: "#FF595C" },
        { label: "Parents", color: "#526FFF" },
        { label: "Low self-worth", color: "#88EC65" },
        { label: "Jaw", color: "#D16868" },
        { label: "Inner restlessness", color: "#2AABEE" },
        { label: "Disciplin", color: "#FBA90B" },
        { label: "Yoga", color: "#FF6721" },
        { label: "Smart", color: "#EEF05C" },
        { label: "Week", color: "#88EC65" },
        { label: "Obedient", color: "#7C3AED" },
      ],
    },
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      tags: [
        { label: "Serenity", color: "#FF595C" },
        { label: "Parents", color: "#526FFF" },
        { label: "Low self-worth", color: "#88EC65" },
        { label: "Jaw", color: "#D16868" },
        { label: "Inner restlessness", color: "#2AABEE" },
        { label: "Disciplin", color: "#FBA90B" },
        { label: "Yoga & Sports", color: "#FF6721" },
        { label: "Smart", color: "#EEF05C" },
        { label: "Week", color: "#88EC65" },
        { label: "Obedient", color: "#7C3AED" },
      ],
    },
  ];

  const diaryData = [
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      sentiment: "Negative",
      motivation: "Self Growth",
      text: "We often judge ourselves harshly for our bad days.",
    },
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      sentiment: "Positive",
      motivation: "Self Growth",
      text: 'We often judge ourselves harshly for our bad days (the red spikes in your graph), viewing them as failures. But in reality, those days are just user feedback. They are data points telling you that a specific "feature" of your life—your sleep, your boundaries, or your routine—needs a patch or an update.',
    },
  ];

  const reflectionData = [
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      combination: "Angry-work-impatience",
      text: "We often judge ourselves harshly for our bad days.",
    },
    {
      timestamp: "Nov 16, 2025, 02:37 PM",
      combination: "Angry-work-impatience",
      text: "We often judge ourselves harshly for our bad days.",
    },
  ];

  const tabs = [
    { name: "Overview", icon: overviewNavIcon },
    { name: "Protocol", icon: protocolNavIcon },
    { name: "Graph", icon: graphNavIcon },
    { name: "Diary", icon: diaryNavIcon },
    { name: "Reflections", icon: reflectionNavIcon },
    { name: "Mind-o-Meter", icon: mindOMeterNavIcon },
  ];

  useEffect(() => {
    if (location.state?.openDiary) {
      setActiveTab("Diary");
      setShowNewDiaryEntry(true);
      // Clean up state so it doesn't re-open on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const timeFilters = ["This Week", "This Month", "This Year"];
  const activeTabConfig = tabs.find((tab) => tab.name === activeTab) || tabs[0];

  useEffect(() => {
    if (!isNavOpen) return;

    const onPointerDown = (e) => {
      if (!mobileNavRef.current) return;
      if (!mobileNavRef.current.contains(e.target)) setIsNavOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsNavOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isNavOpen]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(64,112,218,0.15)_0%,transparent_70%)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 sm:px-8 pt-24 lg:pt-20 pb-12">
        <div className="w-full max-w-[1300px] flex flex-col gap-8 md:gap-10">
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full md:w-auto">
              <div className="flex items-center gap-5">
                <img
                  src={statisticIcon}
                  alt="Stats"
                  className="w-10 h-10 object-contain"
                />
                <div className="flex flex-col">
                  <h1 className="text-[28px] sm:text-[38px] font-inter font-bold leading-tight tracking-tight">
                    Statistics
                  </h1>
                  <p className="text-[16px] sm:text-[20px] font-inter font-medium text-[#9CA1A7]">
                    Track your mindfulness journey
                  </p>
                </div>
              </div>

              {/* Time Filters - Integrated for Mind-o-Meter */}
              {activeTab === "Mind-o-Meter" && (
                <div className="flex items-center bg-[#1C1C24] p-1 rounded-xl border border-white/5 sm:ml-4 w-full sm:w-auto overflow-x-auto custom-scrollbar">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-[13px] font-inter font-bold transition-all whitespace-nowrap ${
                        timeFilter === filter
                          ? "bg-[#4070DA] text-white shadow-lg"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] md:rounded-[18px] flex items-center justify-center hover:bg-white/5 transition-all shadow-2xl shrink-0"
            >
              <img
                src={shareIcon}
                alt="Share"
                className="w-12 h-12 object-contain"
              />
            </button>
          </header>

          <div className="w-full mb-[2px]">
            <nav className="hidden md:flex items-center bg-[#1A1C26] rounded-[12px] h-[44px] border-[1.5px] border-[#595C66] p-[4px] overflow-x-auto custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 h-full rounded-[8px] text-[14px] font-inter font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.name
                      ? "bg-[#4070DA] text-white shadow-lg"
                      : "text-[#9CA1A7] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    className="w-4 h-4 object-contain brightness-0 invert"
                    style={{
                      opacity: activeTab === tab.name ? 1 : 0.6,
                    }}
                  />
                  {tab.name}
                </button>
              ))}
            </nav>

            <div ref={mobileNavRef} className="md:hidden relative">
              <button
                onClick={() => setIsNavOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-3 bg-[#1A1C26] rounded-[12px] h-[44px] border-[1.5px] border-[#595C66] px-3 text-[12px] font-inter font-bold text-white"
              >
                <span className="flex items-center gap-2 truncate">
                  <img
                    src={activeTabConfig.icon}
                    alt=""
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                  {activeTab}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-white/70 transition-transform ${isNavOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isNavOpen && (
                <div className="absolute z-60 mt-2 w-full rounded-[12px] border border-[#595C66] bg-[#1A1C26] p-2 shadow-2xl">
                  <div className="max-h-[50dvh] overflow-auto custom-scrollbar">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => {
                          setActiveTab(tab.name);
                          setIsNavOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 rounded-[8px] px-3 py-2 text-left text-[12px] font-inter font-bold transition-all ${
                          activeTab === tab.name
                            ? "bg-[#4070DA] text-white"
                            : "text-[#9CA1A7] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <img
                          src={tab.icon}
                          alt=""
                          className="w-4 h-4 object-contain brightness-0 invert"
                          style={{
                            opacity: activeTab === tab.name ? 1 : 0.6,
                          }}
                        />
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-h-[600px] mb-12">
            {activeTab === "Overview" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-in fade-in duration-500">
                <div className="flex flex-col gap-8">
                  {col1.map((section, idx) => (
                    <StatCard key={idx} {...section} />
                  ))}
                </div>
                <div className="flex flex-col gap-8">
                  {col2.map((section, idx) => (
                    <StatCard key={idx} {...section} />
                  ))}
                </div>
              </div>
            ) : activeTab === "Protocol" ? (
              <div className="flex flex-col gap-8 max-w-[1300px] animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 py-4">
                  <FileText size={32} className="text-[#4070DA]" />
                  <h2 className="text-[28px] font-inter font-bold">
                    Mindset Protocol
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {protocolData.map((entry, idx) => (
                    <ProtocolEntry key={idx} {...entry} />
                  ))}
                </div>
              </div>
            ) : activeTab === "Graph" ? (
              <div className="flex flex-col gap-10 max-w-[1300px] animate-in slide-in-from-bottom-4 duration-500">
                {/* Stress Analysis Card */}
                <div className="rounded-[24px] p-8 border border-[#4070DA]/60 bg-[#1A1C26]/40 backdrop-blur-md flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <BarChart3 size={32} className="text-[#4070DA]" />
                    <h2 className="text-[24px] font-inter font-bold text-white/95">
                      Stress Analysis (Overall)
                    </h2>
                  </div>
                  <div className="h-[400px] bg-black/30 rounded-xl relative p-relative overflow-hidden border border-white/5">
                    {/* Dummy Chart Background */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div className="flex items-start justify-between w-full h-full relative">
                        {/* Y-axis */}
                        <div className="flex flex-col justify-between h-full text-[12px] font-inter font-bold text-white/40 pb-10">
                          <span>+20</span>
                          <span>+10</span>
                          <span>0</span>
                          <span>-10</span>
                          <span>-20</span>
                        </div>
                        {/* Graph Content */}
                        <div className="flex-1 h-full relative ml-8 border-l border-b border-white/10">
                          {/* Dashed Baseline */}
                          <div className="absolute top-[50%] left-0 w-full border-t-2 border-dashed border-white/20" />
                          {/* Month Labels */}
                          <div className="absolute bottom-[-32px] left-0 w-full flex justify-around text-[12px] font-inter font-bold text-white/40">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Positive Mindsets"
                      value="7"
                      color="#88EC65"
                    />
                    <MetricCard
                      title="Unclear Mindsets"
                      value="9"
                      color="#EEF05C"
                    />
                    <MetricCard
                      title="Negative Mindsets"
                      value="2"
                      color="#FF595C"
                    />
                    <MetricCard
                      title="Exercises Scores"
                      value="4"
                      color="#4070DA"
                    />
                    <MetricCard
                      title="Mantra Scores"
                      value="3"
                      color="#FBA90B"
                    />
                    <MetricCard
                      title="Anchor Scores"
                      value="4"
                      color="#FF595C"
                    />
                  </div>
                  <div className="w-full lg:w-[320px]">
                    <div className="rounded-[24px] p-8 border border-[#4070DA]/60 bg-[#1A1C26]/60 backdrop-blur-md flex flex-col items-center justify-center gap-6 h-full lg:mt-20 max-h-[150px] text-center shadow-2xl">
                      <span className="text-[20px] font-inter font-bold text-white/70">
                        Mind-o-Meter
                      </span>
                      <span className="text-[72px] font-inter font-bold text-[#88EC65] leading-none drop-shadow-[0_0_20px_rgba(136,236,101,0.3)]">
                        0.67
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "Mind-o-Meter" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 animate-in zoom-in-95 duration-700 justify-items-center items-start">
                {/* Unified Layout for 2-per-line logic on MD */}
                <SatelliteMetric
                  title="Positive Mindsets"
                  value="42"
                  trend="+31%"
                  trendColor="#88EC65"
                />
                <SatelliteMetric
                  title="Unclear Mindsets"
                  value="13"
                  trend="+11%"
                  trendColor="#EEF05C"
                />
                <SatelliteMetric
                  title="Negative Mindsets"
                  value="17"
                  trend="-24%"
                  trendColor="#FF595C"
                />
                <SatelliteMetric
                  title="Total Entries"
                  value="47"
                  trend="+12%"
                  trendColor="#88EC65"
                />

                {/* Central "Mindset Distribution" Card - Spans 2 on MD, 1 on LG */}
                <div className="w-full md:col-span-2 lg:col-span-1 max-w-[540px] rounded-[32px] p-6 sm:p-10 border border-white/10 bg-[#1A1C30] backdrop-blur-3xl shadow-3xl flex flex-col gap-6 sm:gap-8 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[22px] font-inter font-bold text-white/95">
                      Mindset Distribution
                    </h3>
                  </div>

                  {/* Radial Stacked SVG Donut Chart */}
                  <div className="relative w-full aspect-square flex items-center justify-center py-4 sm:py-6">
                    <svg
                      viewBox="0 0 340 340"
                      className="w-full h-full max-w-[340px] transform -rotate-90"
                    >
                      {/* Inner Circle Track */}
                      <circle
                        cx="170"
                        cy="170"
                        r="115"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="80"
                      />

                      {/* Positive Mindset (Green) - Thicker */}
                      <svg width="340" height="340">
                        <defs>
                          <linearGradient
                            id="circleGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#96FF71" />
                            <stop offset="100%" stopColor="#5EAE41" />
                          </linearGradient>
                        </defs>

                        <circle
                          cx="170"
                          cy="170"
                          r="115"
                          fill="transparent"
                          stroke="url(#circleGradient)"
                          strokeWidth="80"
                          strokeDasharray="361 722"
                          strokeDashoffset="0"
                          className="transition-all duration-1000 ease-out"
                          // style={{
                          //   filter:
                          //     "drop-shadow(0 0 15px rgba(136,236,101,0.25))",
                          // }}
                        />
                      </svg>

                      {/* Unclear Mindset (Yellow) */}
                      <circle
                        cx="166"
                        cy="170"
                        r="115"
                        fill="transparent"
                        stroke="#F9C515"
                        strokeWidth="70"
                        strokeDasharray="181 722"
                        strokeDashoffset="-541"
                        className="transition-all duration-1000 ease-out delay-500"
                      />

                      {/* Negative Mindset (Red) */}
                      <defs>
                        <linearGradient
                          id="redCircleGradient"
                          x1="0%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#FF7E7E" />
                          <stop offset="100%" stopColor="#CD4343" />
                        </linearGradient>
                      </defs>

                      <circle
                        cx="174"
                        cy="170"
                        r="115"
                        fill="transparent"
                        stroke="url(#redCircleGradient)"
                        strokeWidth="70"
                        strokeDasharray="181 722"
                        strokeDashoffset="-361"
                        className="transition-all duration-1000 ease-out delay-700"
                      />

                      {/* Outer Exercises Ring (Blue) */}
                      <circle
                        cx="169"
                        cy="170"
                        r="150"
                        fill="transparent"
                        stroke="#1457EA"
                        strokeWidth="11"
                        strokeDasharray="500 942"
                        strokeDashoffset="-631"
                        className="transition-all duration-1000 ease-out delay-300"
                      />
                    </svg>

                    {/* Integrated Brain Center Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[102px] h-[102px] flex items-center justify-center">
                        <img src={mindsetLogo} alt="Logo" />
                      </div>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="flex flex-col gap-4 mt-2 px-6">
                    <div className="flex items-center justify-between group/item">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#96FF71] to-[#5EAE41]" />
                        <span className="text-[16px] font-inter font-bold text-white/80 group-hover/item:text-white transition-colors">
                          Positive Mindset
                        </span>
                      </div>
                      <span className="text-[16px] font-inter font-bold text-white/95">
                        +12%
                      </span>
                    </div>

                    <div className="flex items-center justify-between group/item">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#FF7E7E] to-[#CD4343]" />
                        <span className="text-[16px] font-inter font-bold text-white/80 group-hover/item:text-white transition-colors">
                          Negative Mindset
                        </span>
                      </div>
                      <span className="text-[16px] font-inter font-bold text-white/95">
                        -8%
                      </span>
                    </div>

                    <div className="flex items-center justify-between group/item">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F9C515]" />
                        <span className="text-[16px] font-inter font-bold text-white/80 group-hover/item:text-white transition-colors">
                          Unclear Mindset
                        </span>
                      </div>
                      <span className="text-[16px] font-inter font-bold text-white/95">
                        30%
                      </span>
                    </div>

                    <div className="flex items-center justify-between group/item">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1457EA]" />
                        <span className="text-[16px] font-inter font-bold text-white/80 group-hover/item:text-white transition-colors">
                          Exercises score
                        </span>
                      </div>
                      <span className="text-[16px] font-inter font-bold text-white/95">
                        12%
                      </span>
                    </div>
                  </div>
                </div>

                <SatelliteMetric
                  title="Mind-o-Meter"
                  value="36"
                  trend="+12%"
                  trendColor="#88EC65"
                />
                <SatelliteMetric
                  title="Total Exercises"
                  value="36"
                  trend="+12%"
                  trendColor="#88EC65"
                />
                <SatelliteMetric
                  title="Total Mantras"
                  value="36"
                  trend="+12%"
                  trendColor="#88EC65"
                />
                <SatelliteMetric
                  title="Total Anchors"
                  value="36"
                  trend="+12%"
                  trendColor="#88EC65"
                />
              </div>
            ) : activeTab === "Diary" ? (
              <div className="flex flex-col gap-8 max-w-[1300px] animate-in slide-in-from-bottom-4 duration-500">
                {!showNewDiaryEntry ? (
                  <>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <BookOpen size={24} className="text-[#4070DA]" />
                        <h2 className="text-[28px] font-inter font-bold">
                          Diary
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowNewDiaryEntry(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-[#4070DA] text-white font-inter font-bold hover:bg-[#4070DA]/90 transition-all shadow-lg active:scale-95"
                      >
                        <Plus size={18} />
                        New Entry
                      </button>
                    </div>
                    <div className="flex flex-col gap-6">
                      {diaryData.map((entry, idx) => (
                        <DiaryEntry key={idx} {...entry} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                    <div className="flex items-center gap-4 py-4">
                      <BookOpen size={32} className="text-[#4070DA]" />
                      <h2 className="text-[28px] font-inter font-bold">
                        New Diary Entry
                      </h2>
                    </div>

                    <div className="rounded-[24px] p-6 md:p-10 border-2 border-[#4070DA] shadow-2xl flex flex-col gap-10">
                      {/* Mood Selection */}
                      <div className="flex flex-col gap-4">
                        <label className="text-[18px] font-inter font-bold text-white/90">
                          Current Mood
                        </label>
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "Positive", color: "#13A902" }, // Reddish label in screenshot? Wait, let me re-check.
                            { label: "Uncertain", color: "#D7DA40" },
                            { label: "Negative", color: "#D94141" }, // Blue label in screenshot?
                          ].map((mood) => (
                            <label
                              key={mood.label}
                              className="flex items-center gap-3 cursor-pointer group w-fit"
                            >
                              <div className="relative w-5 h-5 flex items-center justify-center">
                                <input
                                  type="radio"
                                  name="mood"
                                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#4070DA]  transition-all"
                                />
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#4070DA] scale-0 peer-checked:scale-100 transition-transform" />
                              </div>
                              <span
                                style={{ color: mood.color }}
                                className="text-[16px] font-inter font-bold opacity-80 group-hover:opacity-100 transition-opacity"
                              >
                                {mood.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Motivation/Topic */}
                      <div className="flex flex-col gap-4">
                        <label className="text-[18px] font-inter font-bold text-white/90">
                          Motivation/ Topic
                        </label>
                        <input
                          type="text"
                          placeholder="What inspired you to write?"
                          className="w-full bg-[#1A1C26] border border-[#4070DA] rounded-xl px-5 py-4 text-white font-inter placeholder:text-white/70 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Your Thoughts */}
                      <div className="flex flex-col gap-4">
                        <label className="text-[18px] font-inter font-bold text-white/90">
                          Your Thoughts
                        </label>
                        <textarea
                          placeholder="Enter your thought here..."
                          rows={8}
                          className="w-full bg-[#1A1C26] border border-[#4070DA] rounded-xl px-5 py-4 text-white font-inter placeholder:text-white/70 focus:outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 pt-4">
                        <button
                          onClick={() => setShowNewDiaryEntry(false)}
                          className="px-8 py-3 rounded-xl bg-[#4070DA] text-white font-inter font-bold hover:bg-[#4070DA]/90 transition-all shadow-lg active:scale-95"
                        >
                          Save Entry
                        </button>
                        <button
                          onClick={() => setShowNewDiaryEntry(false)}
                          className="px-8 py-3 rounded-xl border border-[#4070DA] text-white font-inter font-bold hover:bg-white/5 transition-all active:scale-95"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === "Reflections" ? (
              <div className="flex flex-col gap-8 max-w-[1300px] animate-in slide-in-from-bottom-4 duration-500">
                {!showNewReflectionEntry ? (
                  <>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <Link size={32} className="text-[#FBA90B]" />
                        <h2 className="text-[28px] font-inter font-bold">
                          Reflection History
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowNewReflectionEntry(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-[#4070DA] text-white font-inter font-bold hover:bg-[#4070DA]/90 transition-all shadow-lg active:scale-95"
                      >
                        <Plus size={18} />
                        New Entry
                      </button>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {reflectionData.map((entry, idx) => (
                        <ReflectionEntry key={idx} {...entry} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                    <div className="flex flex-col gap-2 py-4">
                      <div className="flex items-center gap-4">
                        <Link size={32} className="text-[#FBA90B]" />
                        <h2 className="text-[32px] font-inter font-bold">
                          Reflection Radar
                        </h2>
                      </div>
                      <p className="text-[18px] font-inter font-medium text-white/60">
                        Dialectical thinking: Separate emotional from rational
                        aspects
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Emotional Card */}
                      <div className="rounded-[32px] p-8 bg-[#4070DA] flex flex-col gap-8 shadow-2xl min-h-[500px]">
                        <h3 className="text-[22px] font-inter font-bold text-white leading-tight min-h-[64px]">
                          Emotional aspects; Pro aspects;
                          <br />
                          Preferred behaviour; best-case
                        </h3>
                        <div className="flex-1 bg-[#1C1C24] rounded-[24px] border border-white/10 p-4">
                          {/* Textarea or Radar placeholder */}
                          <textarea
                            placeholder="Describe emotional aspects here..."
                            className="w-full h-full bg-transparent border-none outline-none text-white font-inter resize-none placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Rational Card */}
                      <div className="rounded-[32px] p-8 bg-[#4070DA] flex flex-col gap-8 shadow-2xl min-h-[500px]">
                        <h3 className="text-[22px] font-inter font-bold text-white leading-tight min-h-[64px]">
                          Rational aspects; contra aspects;
                          <br />
                          real behaviour; worst-case
                        </h3>
                        <div className="flex-1 bg-[#1C1C24] rounded-[24px] border border-white/10 p-4">
                          <textarea
                            placeholder="Describe rational aspects here..."
                            className="w-full h-full bg-transparent border-none outline-none text-white font-inter resize-none placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        onClick={() => setShowNewReflectionEntry(false)}
                        className="px-8 py-3 rounded-xl bg-[#4070DA] text-white font-inter font-bold hover:bg-[#4070DA]/90 transition-all shadow-lg active:scale-95"
                      >
                        Save Entry
                      </button>
                      <button
                        onClick={() => setShowNewReflectionEntry(false)}
                        className="px-8 py-3 rounded-xl border border-white/10 text-white font-inter font-bold hover:bg-white/5 transition-all active:scale-95"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-[#9CA1A7] text-[20px] font-inter italic animate-pulse">
                View coming soon...
              </div>
            )}
          </div>
        </div>
      </main>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default StatisticsDetail;
