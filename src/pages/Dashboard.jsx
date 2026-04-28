import React from "react";
import StatusCard from "../components/dashboard/StatusCard";
import RadarVisualization from "../components/dashboard/RadarVisualization";
import { BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import successGaugeIcon from "../assets/radarModulesIcon/successGuage-red-icon.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-y-scroll overflow-x-hidden custom-scrollbar">
      <div className="w-full max-w-[1440px] min-h-[1024px] relative flex flex-col text-white">
        <main className="flex-1 relative flex flex-col items-center justify-center m-0 overflow-hidden">
          <div className="w-full max-w-[1300px] z-10 px-4 pt-18 md:pt-3 pb-4">
            <div className="relative min-h-[882px] flex flex-col">
              <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-8">
                {/* Desktop only: Status cards + logout (2-column, no absolute overlap) */}
                <div className="hidden lg:flex w-[234px] shrink-0 flex-col justify-end gap-6">
                  <div className="flex flex-col lg:gap-6 lg:ml-10 lg:mb-5 xl:gap-8 xl:ml-20 xl:mb-5">
                    <StatusCard
                      icon={BarChart3}
                      title="Statistics"
                      subtitle="View insights"
                      variant="blue"
                      onClick={() => navigate("/statistics-detail")}
                    />
                    <StatusCard
                      icon={successGaugeIcon}
                      title="Success gauge"
                      subtitle="Current mindset"
                      variant="red"
                      onClick={() => navigate("/success-gauge")}
                    />
                    <StatusCard
                      variant="green"
                      onClick={() => navigate("/statistics-detail", { state: { openDiary: true } })}
                      title={
                        <span>
                          You can enter a personal{" "}
                          <span style={{ color: "#FF3B30" }}>diary note</span>{" "}
                          via shortcut by clicking here
                        </span>
                      }
                    />
                    <StatusCard
                      variant="yellow"
                      onClick={() => navigate("/settings")}
                      title="You can invite your therapist to support you. Click here."
                    />
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full h-11 text-white font-inter font-semibold lg:ml-10 lg:mb-5 xl:ml-20 xl:mb-10 leading-[20px] flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                    style={{
                      borderRadius: "16px",
                      background:
                        "linear-gradient(180deg, #FF6A6A 0%, #C83636 100%)",
                    }}
                    type="button"
                  >
                    Log Out
                  </button>
                </div>

                {/* Welcome + Radar — below lg: stretch (full-width cards); lg+: centered */}
                <div className="flex-1 w-full max-lg:items-stretch flex flex-col items-center lg:items-center">
                  <div className="text-center mb-8 mt-3 shrink-0 w-full max-w-[900px] relative z-10">
                    <div className="flex justify-center mb-6">
                      <div
                        className="flex items-center justify-center gap-2"
                        style={{
                          width: 268,
                          height: 43,
                          borderRadius: 57,
                          border: "1px solid rgba(71, 128, 255, 0.66)",
                          backgroundColor: "rgba(71, 128, 255, 0.14)",
                          padding: "10px 18px",
                        }}
                      >
                        <Sparkles size={16} className="text-[#6BC7FF]" />
                        <span className="text-sm text-center font-medium text-slate-200">
                          Your mental wellness Journey
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-center mx-auto"
                      style={{
                        minHeight: 168,
                        gap: 48,
                      }}
                    >
                      <h1
                        className="m-0 text-center"
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "clamp(34px, 4vw, 48px)",
                          fontWeight: 400,
                          lineHeight: 1.25,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Welcome to{" "}
                        <span
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 700,
                            fontSize: "clamp(34px, 4vw, 48px)",
                          }}
                        >
                          New Mindset
                        </span>
                      </h1>

                      <button
                        onClick={() => navigate("/mindset")}
                        className="text-white font-bold flex items-center justify-center transform hover:scale-105 active:scale-95"
                        style={{
                          width: 224,
                          height: 56,
                          borderRadius: 999,
                          background:
                            "linear-gradient(180deg, #6BC7FF 0%, #009FE5 100%)",
                          boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                          maxWidth: "100%",
                        }}
                        type="button"
                      >
                        Start Process
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex max-w-full items-center justify-center mt-6 lg:mt-0 mb-18 px-2 sm:px-3">
                    {/* Radar ~570px wide before scale; max-sm needs ~0.65 so 425px viewports don't clip */}
                    <div className="relative h-[480px] w-full max-w-[min(100%,640px)] origin-center overflow-visible max-sm:scale-[0.65] sm:h-[560px] sm:scale-[0.82] md:h-[600px] md:scale-95 lg:h-[620px] lg:scale-100">
                      <RadarVisualization />

                      <button
                        onClick={() => navigate("/impressum")}
                        className="hidden lg:flex absolute z-30 glass text-white hover:bg-white/10 items-center justify-center w-[218px] h-[56px] font-inter font-semibold leading-[24px] tracking-[5px]
                        lg:left-[400px]
                        xl:left-[calc(50%+220px)]
                        bottom-[-30px] 
                        "
                        style={{
                          borderRadius: "13px",
                          border: "1px solid #FFFFFF",
                        }}
                        type="button"
                      >
                        Impressum
                      </button>
                    </div>
                  </div>

                  {/* Below lg (425px–1023px): radar ke neechay cards, phir dono buttons */}
                  <div className="flex lg:hidden w-full min-w-0 flex-col gap-6 mt-4 mb-6 px-0 sm:px-2">
                    <div className="flex w-full min-w-0 flex-col gap-6">
                      <StatusCard
                        className="w-full max-w-none"
                        icon={BarChart3}
                        title="Statistics"
                        subtitle="View insights"
                        variant="blue"
                        onClick={() => navigate("/statistics-detail")}
                      />
                      <StatusCard
                        className="w-full max-w-none"
                        icon={successGaugeIcon}
                        title="Success gauge"
                        subtitle="Current mindset"
                        variant="red"
                        onClick={() => navigate("/success-gauge")}
                      />
                      <StatusCard
                        className="w-full max-w-none"
                        variant="green"
                        onClick={() => navigate("/statistics-detail", { state: { openDiary: true } })}
                        title={
                          <span>
                            You can enter a personal{" "}
                            <span style={{ color: "#FF3B30" }}>diary note</span>{" "}
                            via shortcut by clicking here
                          </span>
                        }
                      />
                      <StatusCard
                        className="w-full max-w-none"
                        variant="yellow"
                        onClick={() => navigate("/therapist-dialog")}
                        title="You can invite your therapist to support you. Click here."
                      />
                    </div>
                    <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-stretch">
                      <button
                        onClick={handleLogout}
                        className="w-full sm:flex-1 h-11 text-white font-inter font-semibold leading-[20px] flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
                        style={{
                          borderRadius: "16px",
                          background:
                            "linear-gradient(1800deg, #FF6A6A 0%, #C83636 100%)",
                        }}
                        type="button"
                      >
                        Log Out
                      </button>
                      <button
                        onClick={() => navigate("/impressum")}
                        className="w-full sm:flex-1 h-[56px] glass text-white hover:bg-white/10 flex items-center justify-center text-center font-inter font-medium leading-[24px] tracking-[5px]"
                        style={{
                          borderRadius: "13px",
                          border: "1px solid #FFFFFF",
                          fontSize: "18px",
                        }}
                        type="button"
                      >
                        Impressum
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
