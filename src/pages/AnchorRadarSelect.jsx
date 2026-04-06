import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Info } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import anchorIcon from "../assets/radarModulesIcon/anchor-pink-icon.svg";

const AnchorRadarSelect = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6">
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">
            {/* spacer keeps the same horizontal layout on larger screens, matching header width (220px + 13px left) */}

            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[60px] gap-[16px] w-full shrink-0">
                <img
                  src={anchorIcon}
                  alt="Icon"
                  className="w-12 h-12 object-contain shrink-0"
                />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Anchor Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    You have now gone through all the steps of the mindfulness
                    process.
                  </p>
                </div>
              </div>

              <div className="flex items-center w-full min-h-0 bg-[#FF5B86]/15 border-2 border-[#FF5B86] rounded-[16px] p-4 sm:p-[16px] gap-[16px] shrink-0">
                <div className="flex items-center justify-center w-[32px] h-[32px] shrink-0">
                  <Info size={24} color="white" />
                </div>
                <p className="text-[clamp(16px,4vw,20px)] font-inter font-bold text-[#FF5B86] m-0 leading-tight sm:leading-[24px]">
                  Now you can choose a favorite background image that will be a
                  support and anchor for you in moments of crisis and need.
                </p>
              </div>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] border-2 border-[#FF5B86] rounded-[24px] bg-[#1C1C24] flex flex-col gap-8 shadow-2xl relative overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[clamp(20px,5vw,28px)] font-inter font-bold text-[#FF5B86] m-0">
                    Background Image
                  </h2>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0">
                    To anchor yourself, use your favorite image from the media
                    library.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[18px] font-inter font-bold text-white">
                    Choose Image
                  </label>
                  <div className="w-full h-[64px] bg-[#14141B] border-[1px] border-white/10 rounded-[12px] flex items-center px-4 relative cursor-pointer hover:border-[#FF5B86] transition-all overflow-hidden group">
                    <span className="text-[16px] font-inter font-medium text-[#C5C5C5]">
                      {selectedFile ? "File selected" : "Choose File"}
                    </span>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="w-full h-[360px] shrink-0 rounded-[24px] overflow-hidden border-[1px] border-white/10 shadow-inner relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-[120px] h-[40px] bg-[#00AEEF] flex items-center justify-center rounded-sm">
                          <span className="text-[12px] font-bold text-white tracking-widest">
                            ALAMY
                          </span>
                        </div>
                        <h3 className="text-[clamp(24px,8vw,42px)] font-inter font-black text-white leading-none tracking-tight">
                          NEW MINDSET
                          <br />
                          NEW RESULTS
                        </h3>
                        <div className="w-[60px] h-[60px] transform rotate-[45deg] border-t-[8px] border-r-[8px] border-[#00AEEF] mt-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/anchor")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#FF5B86] text-[15px] md:text-[20px] active:scale-95 bg-gradient-to-b from-[#FF658E]/50 to-[#D22C57]/50"
                >
                  <ArrowLeft size={24} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/exercises")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[16px] flex items-center justify-center gap-[12px] p-[10px] md:p-[16px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#FF5B86] text-[15px] md:text-[20px] active:scale-95"
                  style={{
                    background: "linear-gradient(180deg, #FF658E, #D22C57)",
                  }}
                >
                  <Save size={24} />
                  Save
                </button>
              </div>
              <div className="h-10 w-full shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnchorRadarSelect;
