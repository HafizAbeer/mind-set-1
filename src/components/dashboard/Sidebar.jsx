import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import mindsetLogo from "../../assets/mindset-logo.svg";
import collapseIcon from "../../assets/icons/collapse-icon.svg";
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import statisticIcon from "../../assets/icons/statistic-icon.svg";
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
import lifeScriptIcon from "../../assets/icons/script-icon.svg";
import oldScriptIconAsset from "../../assets/icons/script-icon.svg";
import newScriptIconAsset from "../../assets/icons/script-icon.svg";
import successGuageIcon from "../../assets/icons/success-guage-icon.svg";
import rewardIcon from "../../assets/icons/reward-icon.svg";
import therapistIcon from "../../assets/icons/therapist-icon.svg";
import settingIcon from "../../assets/icons/setting-icon.svg";

const SidebarItem = ({
  iconPath,
  label,
  active,
  hasDropdown,
  isOpen,
  onClick,
  activeClass = "bg-white/10",
  isCollapsed,
  to,
}) => {
  const content = (
    <div
      onClick={onClick}
      className={`
        flex items-center ${isCollapsed ? "justify-center" : "gap-2 px-[12px]"} py-[6px] rounded-[10px] cursor-pointer transition-[width,background] duration-300 ease-in-out
        ${isCollapsed ? "w-[44px]" : "w-[220px]"} h-[44px] shrink-0
        ${active ? activeClass : "hover:bg-white/5"}
        text-white
      `}
      title={isCollapsed ? label : ""}
    >
      <img src={iconPath} alt="" className="w-6 h-6 object-contain" />

      <span
        className={`
    text-[16px] font-semibold flex-1 truncate
    transition-opacity duration-200
    ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
  `}
      >
        {label}
      </span>

      {hasDropdown && !isCollapsed && (
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block no-underline" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return content;
};

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [scriptOpen, setScriptOpen] = useState(false);
  const [user, setUser] = useState({
    name: "User Name",
    email: "user@email.com",
  });
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  return (
    <aside
      className={`
    fixed top-0 left-0 h-screen z-[120]
    transition-transform duration-300 ease-in-out
    ${isCollapsed ? "-translate-x-full md:translate-x-0 md:w-[80px]" : "translate-x-0 md:w-[260px]"}
    w-[260px]
  `}
    >
      <div
        className={`flex flex-col h-full bg-sidebar-bg relative text-white transition-[width] duration-300 ease-in-out ${isCollapsed ? "items-center py-6 rounded-[20px] w-[84px] overflow-visible" : "p-0 rounded-none overflow-hidden"}`}
        style={{
          borderRight: !isCollapsed ? "1px solid #3E444E" : "none",
          border: isCollapsed ? "1px solid rgba(255,255,255,0.1)" : "",
        }}
      >
        {!isCollapsed ? (
          <div className="w-[220px] h-[72px] rounded-[14px] bg-[#34363D] flex items-center justify-between mt-[21px] ml-[13px] mb-4 shrink-0 transition-all duration-300 p-[12px]">
            <div className="flex items-center gap-3">
              <img
                src={mindsetLogo}
                alt="New Mindset"
                className="w-11 h-11 object-contain"
              />
              <span className="font-bold text-lg leading-tight">
                New
                <br />
                <span className="text-slate-200">Mindset</span>
              </span>
            </div>
            <div
              className="w-6 h-6 rounded flex items-center justify-center cursor-pointer shrink-0 hover:bg-white/10 transition-colors"
              onClick={onToggle}
            >
              <img src={collapseIcon} alt="Collapse" className="w-6 h-6" />
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-center">
            <div className="w-12 h-12 rounded-[16px] bg-[#34363D] p-10 flex items-center justify-center">
              <img
                src={mindsetLogo}
                alt="New Mindset"
                className="w-11 h-11 object-contain"
              />
            </div>
          </div>
        )}

        <nav
          className={`flex-1 overflow-y-auto w-full ${isCollapsed ? "flex flex-col items-center" : "pl-5"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            nav::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div
            className={`${isCollapsed ? "w-auto" : "w-[220px]"} min-h-[80px] flex flex-col gap-1 mb-2`}
          >
            <SidebarItem
              iconPath={dashboardIcon}
              label="Dashboard"
              active
              activeClass="bg-gradient-to-r from-[#6BC7FF] to-[#009FE5]"
              isCollapsed={isCollapsed}
              to="/dashboard"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={statisticIcon}
              label="Statistics"
              active={["/statistic-revue", "/statistics-detail"].includes(
                location.pathname,
              )}
              activeClass="bg-[#4070DA]"
              isCollapsed={isCollapsed}
              to="/statistic-revue"
              onClick={onToggle}
            />
            {isCollapsed && (
              <div className="w-[40px] h-[1px] bg-white/10 my-2 self-center rounded-full" />
            )}
          </div>

          <div
            className={`${isCollapsed ? "w-auto" : "w-[220px]"} flex flex-col gap-1`}
          >
            {!isCollapsed && (
              <div className="pt-1 pb-1 px-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-inter">
                  Radar Modules
                </span>
              </div>
            )}
            <SidebarItem
              iconPath={mindsetIcon}
              label="Mindset"
              active={[
                "/mindset",
                "/mindset-select",
                "/positive-mindset",
                "/unclear-mindset",
                "/negative-mindset",
              ].includes(location.pathname)}
              activeClass={
                location.pathname === "/positive-mindset"
                  ? "bg-[#48C856]"
                  : location.pathname === "/unclear-mindset"
                    ? "bg-[#F0B614]"
                    : location.pathname === "/negative-mindset"
                      ? "bg-[#D16868]"
                      : "bg-[#803600]"
              }
              isCollapsed={isCollapsed}
              to="/mindset"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={triggerIcon}
              label="Trigger"
              active={["/trigger", "/trigger-radar"].includes(location.pathname)}
              activeClass="bg-[#3C56D8]"
              isCollapsed={isCollapsed}
              to="/trigger"
              onClick={onToggle}
            />

            <div className="flex flex-col items-center lg:items-start gap-1">
              <SidebarItem
                iconPath={causeIcon}
                label="Cause"
                active={["/cause", "/cause-select"].includes(location.pathname)}
                activeClass="bg-[#5EAE41]"
                isCollapsed={isCollapsed}
                to="/cause"
                onClick={onToggle}
              />
              <div
                className="bg-white rounded-full transition-all duration-300 ml-1"
                style={{ width: isCollapsed ? "40px" : "178px", height: "3px" }}
              />
            </div>

            <SidebarItem
              iconPath={reflectionIcon}
              label="Reflection"
              active={["/reflection", "/reflection-questions", "/reflection-trigger", "/reflection-aspects", "/reflection-experiences", "/reflection-behaviour", "/reflection-consequences", "reflection-views"].includes(
                location.pathname,
              )}
              activeClass="bg-[#F0B614]"
              isCollapsed={isCollapsed}
              to="/reflection"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={bodyIcon}
              label="Body"
              active={["/body", "/body-select"].includes(location.pathname)}
              activeClass="bg-[#D16868]"
              isCollapsed={isCollapsed}
              to="/body"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={symptomIcon}
              label="Symptom"
              active={["/symptom", "/symptom-select"].includes(location.pathname)}
              activeClass="bg-[#3B82F6]"
              isCollapsed={isCollapsed}
              to="/symptom"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={wishIcon}
              label="Intention"
              active={["/intention", "/intention-select"].includes(location.pathname)}
              activeClass="bg-[#E3A43F]"
              isCollapsed={isCollapsed}
              to="/intention"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={anchorIcon}
              label="Anchor"
              active={["/anchor", "/anchor-select"].includes(location.pathname)}
              activeClass="bg-[#FF5B86]"
              isCollapsed={isCollapsed}
              to="/anchor"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={exerciseIcon}
              label="Exercises"
              active={["/exercises", "/exercises-select"].includes(location.pathname)}
              activeClass="bg-[#F97316]"
              isCollapsed={isCollapsed}
              to="/exercises"
              onClick={onToggle}
            />
            {/* {!isCollapsed ? (
              <div className="w-[220px] h-[1px] bg-white/10 my-1 ml-[12px]" />
            ) : (
              <div className="w-[40px] h-[1px] bg-white/10 my-2 self-center rounded-full" />
            )} */}

            <div className="flex flex-col gap-1">
              <SidebarItem
                iconPath={scriptIcon}
                label="Script"
                hasDropdown
                isOpen={scriptOpen}
                onClick={() => !isCollapsed && setScriptOpen(!scriptOpen)}
                activeClass="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]"
                isCollapsed={isCollapsed}
              />

              {scriptOpen && !isCollapsed && (
                <div className="ml-9 space-y-0.5 mt-0.5">
                  <Link to="/life-script" className="no-underline" onClick={onToggle}>
                    <div
                      className={`flex items-center gap-3 py-1 px-3 rounded-lg text-white hover:bg-white/5 transition-all cursor-pointer w-[184px] ${location.pathname === "/life-script" ? "bg-[#E2E464]" : ""}`}
                    >
                      <img src={lifeScriptIcon} alt="" className="w-5 h-5" />
                      <span className="text-[16px] font-semibold leading-[20px] font-inter text-white">
                        Life Script
                      </span>
                    </div>
                  </Link>
                  <Link to="/new-script" className="no-underline" onClick={onToggle}>
                    <div
                      className={`flex items-center gap-3 py-1 px-3 rounded-lg text-white hover:bg-white/5 transition-all cursor-pointer w-[184px] ${location.pathname === "/new-script" ? "bg-[#CB4CE2]" : ""}`}
                    >
                      <img
                        src={newScriptIconAsset}
                        alt=""
                        className="w-5 h-5"
                      />
                      <span className="text-[16px] font-semibold leading-[20px] font-inter">
                        New Script
                      </span>
                    </div>
                  </Link>
                  <Link to="/old-script" className="no-underline" onClick={onToggle}>
                    <div
                      className={`flex items-center gap-3 py-1 px-3 rounded-lg text-white hover:bg-white/5 transition-all cursor-pointer w-[184px] ${location.pathname === "/old-script" ? "bg-[#70EC44]" : ""}`}
                    >
                      <img
                        src={oldScriptIconAsset}
                        alt=""
                        className="w-5 h-5"
                      />
                      <span className="text-[16px] font-semibold leading-[20px] font-inter text-white">
                        Old Script
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <SidebarItem
              iconPath={successGuageIcon}
              label="Success gauge"
              active={[
                "/success-gauge",
                "/success-gauge-select",
                "/slight-improvement",
                "/clear-improvement",
                "/inconstant-development",
                "/mostly-problem-free",
                "/little-worsening",
                "/no-changings",
                "/long-time-problem-free",
                "/slight-improvement-feedback",
                "/clear-improvement-feedback",
                "/inconstant-development-feedback",
                "/mostly-problem-free-feedback",
                "/little-worsening-feedback",
                "/no-changings-feedback",
                "/long-time-problem-free-feedback",
                "/success-gauge-feedback",
              ].includes(location.pathname)}
              activeClass="bg-[#D16868]"
              isCollapsed={isCollapsed}
              to="/success-gauge"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={rewardIcon}
              label="Reward Choice"
              active={["/reward-choice", "/reward-choice-select"].includes(location.pathname)}
              activeClass="bg-[#6CB083]"
              isCollapsed={isCollapsed}
              to="/reward-choice"
              onClick={onToggle}
            />
            <SidebarItem
              iconPath={therapistIcon}
              label="Therapist Dialog"
              active={["/therapist-dialog", "/therapist-new-entry"].includes(
                location.pathname,
              )}
              activeClass="bg-[#F0B614]"
              isCollapsed={isCollapsed}
              to="/therapist-dialog"
              onClick={onToggle}
            />
          </div>
        </nav>

        <div
          className={`
  ${isCollapsed ? "w-[80px]" : "w-[220px] mx-auto"}
  min-h-[100px] mt-auto flex flex-col gap-[10px] pt-2 shrink-0 bg-sidebar-bg
  transition-[width] duration-300
`}
          style={{ borderTop: "1px solid #3E444E" }}
        >
          <div
            className={`
    space-y-1 flex flex-col items-center
    ${isCollapsed ? "w-full" : "w-full"}
  `}
          >
            <SidebarItem
              iconPath={settingIcon}
              label="Settings"
              active={location.pathname === "/settings"}
              activeClass="bg-[#4070DA]"
              isCollapsed={isCollapsed}
              to="/settings"
              onClick={onToggle}
            />
          </div>

          <div className="bg-white/5 p-3 flex items-center gap-3 rounded-xl">
            <div
              className={`
      w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center shrink-0
      ${isCollapsed ? "ml-auto mr-auto" : ""}
    `}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-400" />
            </div>

            <div
              className={`
      flex-1 min-w-0 transition-opacity duration-200
      ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
    `}
            >
              <p className="text-[16px] font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {isCollapsed && (
          <div
            className="absolute top-8 -right-[14px] w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#40434a] transition-all z-[130] shadow-xl"
            onClick={onToggle}
          >
            <img
              src={collapseIcon}
              alt="Expand"
              className="w-6 h-6 rotate-180"
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
