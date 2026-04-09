import {
  LayoutDashboard,
  Brain,
  Radar,
  BarChart3,
  Settings,
  Activity,
  HeartPulse,
  ChevronDown,
} from "lucide-react";
import mindsetLogo from "../../assets/mindset-logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import statisticsIcon from "../../assets/icons/statistic-icon.svg";
import mindsetIcon from "../../assets/icons/mindset-icon.svg";
import triggerIcon from "../../assets/icons/trigger-icon.svg";
import causeIcon from "../../assets/icons/cause-icon.svg";
import reflectionIcon from "../../assets/icons/reflection-icon.svg";
import bodyIcon from "../../assets/icons/body-icon.svg";
import symptomIcon from "../../assets/icons/symptom-icon.svg";
import intentionIcon from "../../assets/icons/wish-icon.svg";
import anchorIcon from "../../assets/icons/anchor-icon.svg";
import exercisesIcon from "../../assets/icons/exercise-icon.svg";
import scriptIcon from "../../assets/icons/script-icon.svg";
import successGaugeIcon from "../../assets/icons/success-guage-icon.svg";
import rewardChoiceIcon from "../../assets/icons/reward-icon.svg";
import therapistDialogIcon from "../../assets/icons/therapist-icon.svg";
import settingsIcon from "../../assets/icons/setting-icon.svg";

// Menu items ko categorize kiya hai
const navMain = [
  {
    items: [
      { title: "Dashboard", url: "/dashboard", icon: dashboardIcon },
      {
        title: "Statistics",
        url: "/statistic-revue",
        icon: statisticsIcon,
        activeClass: "!bg-[#4070DA] !text-white font-semibold shadow-md",
        activePaths: ["/statistic-revue", "/statistics-detail"],
      },
    ],
  },
  {
    title: "Radar Modules",
    items: [
      {
        title: "Mindset",
        url: "/mindset",
        icon: mindsetIcon,
        activePaths: [
          "/mindset",
          "/mindset-select",
          "/positive-mindset",
          "/unclear-mindset",
          "/negative-mindset",
        ],
      },
      {
        title: "Trigger",
        url: "/trigger",
        icon: triggerIcon,
        activeClass: "!bg-[#3C56D8] !text-white font-semibold shadow-md",
        activePaths: ["/trigger", "/trigger-radar"],
      },
      {
        title: "Cause",
        url: "/cause",
        icon: causeIcon,
        activeClass: "!bg-[#5EAE41] !text-white font-semibold shadow-md",
        activePaths: ["/cause", "/cause-select"],
      },
      {
        title: "Reflection",
        url: "/reflection",
        icon: reflectionIcon,
        activeClass: "!bg-[#F0B614] !text-white font-semibold shadow-md",
        activePaths: [
          "/reflection",
          "/reflection-questions",
          "/reflection-trigger",
          "/reflection-aspects",
          "/reflection-experiences",
          "/reflection-behaviour",
          "/reflection-consequences",
          "reflection-views",
        ],
      },
      {
        title: "Body",
        url: "/body",
        icon: bodyIcon,
        activeClass: "!bg-[#D16868] !text-white font-semibold shadow-md",
        activePaths: ["/body", "/body-select"],
      },
      {
        title: "Symptom",
        url: "/symptom",
        icon: symptomIcon,
        activeClass: "!bg-[#3B82F6] !text-white font-semibold shadow-md",
        activePaths: ["/symptom", "/symptom-select"],
      },
      {
        title: "Intention",
        url: "/intention",
        icon: intentionIcon,
        activeClass: "!bg-[#E3A43F] !text-white font-semibold shadow-md",
        activePaths: ["/intention", "/intention-select"],
      },
      {
        title: "Anchor",
        url: "/anchor",
        icon: anchorIcon,
        activeClass: "!bg-[#FF5B86] !text-white font-semibold shadow-md",
        activePaths: ["/anchor", "/anchor-select"],
      },
      {
        title: "Exercises",
        url: "/exercises",
        icon: exercisesIcon,
        activeClass: "!bg-[#F97316] !text-white font-semibold shadow-md",
        activePaths: ["/exercises", "/exercises-select"],
      },
      {
        title: "Script",
        url: "/script",
        icon: scriptIcon,
        subItems: [
          {
            title: "Life Script",
            url: "/life-script",
            activeClass: "!bg-[#E2E464] !text-white font-semibold shadow-md",
            activePaths: ["/life-script", "/life-script-select"],
            icon: scriptIcon,
          },
          {
            title: "New Script",
            url: "/new-script",
            activeClass: "!bg-[#CB4CE2] !text-white font-semibold shadow-md",
            activePaths: ["/new-script", "/new-script-select"],
            icon: scriptIcon,
          },
          {
            title: "Old Script",
            url: "/old-script",
            activeClass: "!bg-[#70EC44] !text-white font-semibold shadow-md",
            activePaths: ["/old-script", "/old-script-select"],
            icon: scriptIcon,
          },
        ],
      },
      {
        title: "Success Gauge",
        url: "/success-gauge",
        icon: successGaugeIcon,
        activeClass: "!bg-[#D16868] !text-white font-semibold shadow-md",
        activePaths: [
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
        ],
      },
      {
        title: "Reward Choice",
        url: "/reward-choice",
        icon: rewardChoiceIcon,
        activeClass: "!bg-[#FF35355C] !text-white font-semibold shadow-md",
        activePaths: ["/reward-choice", "/reward-choice-select"],
      },
      {
        title: "Therapist Dialog",
        url: "/therapist-dialog",
        icon: therapistDialogIcon,
        activeClass: "!bg-[#F0B614] !text-white font-semibold shadow-md",
        activePaths: ["/therapist-dialog", "/therapist-new-entry"],
      },
    ],
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleNavigation = (url) => {
    navigate(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const [user, setUser] = useState({
    name: "testuser",
    email: "testuser@gmail.com",
  });

  const isScriptActiveRoute = React.useMemo(() => {
    const radarGroup = navMain.find((g) => g.title === "Radar Modules");
    const scriptItem = radarGroup?.items?.find((i) => i.title === "Script");
    if (!scriptItem) return false;

    if (location.pathname === scriptItem.url) return true;

    if (!scriptItem.subItems) return false;

    return scriptItem.subItems.some((subItem) => {
      if (subItem.activePaths) {
        return subItem.activePaths.includes(location.pathname);
      }
      return location.pathname === subItem.url;
    });
  }, [location.pathname]);
  const [isScriptOpen, setIsScriptOpen] = useState(false);

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

  useEffect(() => {
    // Agar user submenu wali route par hai, to Script dropdown auto-open rahega.
    if (isScriptActiveRoute) setIsScriptOpen(true);
  }, [isScriptActiveRoute]);

  const sidebarVariant = isCollapsed ? "floating" : "sidebar";

  return (
    <Sidebar
      variant={sidebarVariant}
      collapsible="icon"
      className={[
        "bg-sidebar border-none ring-0 shadow-2xl overflow-hidden md:ml-4",
        isCollapsed ? "!rounded-xl" : "",
      ].join(" ")}
      style={
        isCollapsed
          ? {
              top: "16px",
              bottom: "16px",
              height: "auto",
            }
          : undefined
      }
    >
      <div
        className={`flex flex-col h-full transition-all duration-300 ease-in-out ${isCollapsed ? "items-center" : ""}`}
        style={{
          borderImage: "none",
          padding: "20px",
        }}
      >
        {/* Sidebar Header: Logo ya App Name */}
        <SidebarHeader className="p-0 border-none">
          <div
            className={`
                        flex items-center justify-between
                        bg-[#34363D] rounded-[14px] p-2
                        ${isCollapsed ? "w-11 h-11 justify-center" : "w-full h-18"}
                    `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                                shrink-0 flex items-center justify-center
                                ${isCollapsed ? "w-11 h-11" : "w-11 h-11"}
                            `}
              >
                <img
                  src={mindsetLogo}
                  alt="New Mindset"
                  className={`${isCollapsed ? "w-11 h-11" : "w-11 h-11"} object-contain`}
                />
              </div>

              {!isCollapsed && (
                <span className="font-bold text-lg leading-tight text-white whitespace-pre-line">
                  New
                  <br />
                  <span className="text-slate-200">Mindset</span>
                </span>
              )}
            </div>

            {!isCollapsed && (
              <SidebarTrigger className="hover:bg-white/10 text-slate-400 hover:text-white transition-colors h-9 w-9" />
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className={isCollapsed ? "gap-0" : ""}>
          {navMain.map((group, index) => (
            <React.Fragment key={index}>
              <SidebarGroup className={isCollapsed ? "pt-4" : ""}>
                {!isCollapsed && group.title && (
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu className={isCollapsed ? "gap-1" : ""}>
                    {group.items.map((item) => {
                      const hasSubItems = Array.isArray(item.subItems);
                      const isScriptItem =
                        item.title === "Script" && hasSubItems;

                      const isItemActive = item.activePaths
                        ? item.activePaths.includes(location.pathname)
                        : location.pathname === item.url;

                      if (hasSubItems) {
                        const activeSubItem = item.subItems.find((subItem) =>
                          subItem.activePaths
                            ? subItem.activePaths.includes(location.pathname)
                            : location.pathname === subItem.url,
                        );
                        const activeClassToUse =
                          activeSubItem?.activeClass ||
                          "!bg-gradient-to-r from-[#6BC7FF] to-[#009FE5] !text-white font-semibold shadow-md";

                        return (
                          <SidebarMenuItem
                            key={item.title}
                            className={`${isCollapsed ? "flex justify-center" : "flex-col"}`}
                          >
                            <SidebarMenuButton
                              tooltip={item.title}
                              onClick={() => {
                                // Collapsed mode mein submenu hide rehta hai, isliye toggle skip.
                                if (isCollapsed) return;
                                setIsScriptOpen((prev) => !prev);
                              }}
                              isActive={
                                isScriptItem ? isScriptActiveRoute : false
                              }
                              className={`
                                    ${
                                      isCollapsed
                                        ? "h-11 w-11 p-[10px]"
                                        : "h-11 w-full px-[12px] py-[10px] gap-2"
                                    }
                                    rounded-[10px] transition-all duration-200
                                    ${
                                      isScriptActiveRoute
                                        ? activeClassToUse
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                                  `}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className={`${isCollapsed ? "w-6 h-6" : "w-5 h-5"} object-contain transition-all duration-200 ${isScriptActiveRoute ? "brightness-200" : "opacity-90 group-hover:opacity-100"}`}
                              />
                              <span
                                className={`font-inter font-semibold text-[16px] leading-[20px] text-white ${isCollapsed ? "hidden" : "block"}`}
                              >
                                {item.title}
                              </span>

                              {!isCollapsed && (
                                <ChevronDown
                                  size={16}
                                  className={`ml-auto transition-transform duration-200 ${
                                    isScriptOpen ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </SidebarMenuButton>

                            {!isCollapsed && isScriptOpen && (
                              <SidebarMenuSub className="mt-1">
                                {item.subItems.map((subItem) => {
                                  const isSubActive = subItem.activePaths
                                    ? subItem.activePaths.includes(
                                        location.pathname,
                                      )
                                    : location.pathname === subItem.url;

                                  return (
                                    <SidebarMenuSubButton
                                      key={subItem.title}
                                      isActive={isSubActive}
                                      onClick={() =>
                                        handleNavigation(subItem.url)
                                      }
                                      className={`flex items-center gap-2 px-[12px] py-[8px] text-left rounded-[10px] transition-all duration-200 mt-1 ${
                                        isSubActive
                                          ? subItem.activeClass ||
                                            "!bg-white/20 !text-white font-semibold shadow-sm"
                                          : "text-slate-400 hover:text-white hover:bg-white/5"
                                      }`}
                                    >
                                      <img
                                        src={subItem.icon}
                                        alt=""
                                        className={`w-4 h-4 object-contain ${
                                          isSubActive
                                            ? "brightness-200"
                                            : "opacity-90"
                                        }`}
                                      />
                                      <span className="truncate">
                                        {subItem.title}
                                      </span>
                                    </SidebarMenuSubButton>
                                  );
                                })}
                              </SidebarMenuSub>
                            )}
                          </SidebarMenuItem>
                        );
                      }

                      const mindsetActiveClass =
                        item.title === "Mindset" && isItemActive
                          ? location.pathname === "/positive-mindset"
                            ? "!bg-[#48C856] !text-white font-semibold shadow-md"
                            : location.pathname === "/unclear-mindset"
                              ? "!bg-[#F0B614] !text-white font-semibold shadow-md"
                              : location.pathname === "/negative-mindset"
                                ? "!bg-[#D16868] !text-white font-semibold shadow-md"
                                : "!bg-[#803600] !text-white font-semibold shadow-md"
                          : null;

                      return (
                        <SidebarMenuItem
                          key={item.title}
                          className={`${
                            isCollapsed
                              ? item.title === "Cause"
                                ? "flex flex-col items-center"
                                : "flex justify-center"
                              : ""
                          }`}
                        >
                          <SidebarMenuButton
                            tooltip={item.title}
                            onClick={() => handleNavigation(item.url)}
                            isActive={isItemActive}
                            className={`
                                    ${
                                      isCollapsed
                                        ? "h-11 w-11 p-[10px]"
                                        : "h-11 w-full px-[12px] py-[10px] gap-2"
                                    }
                                    rounded-[10px] transition-all duration-200
                                    ${
                                      isItemActive
                                        ? item.activeClass ||
                                          mindsetActiveClass ||
                                          "!bg-gradient-to-r from-[#6BC7FF] to-[#009FE5] !text-white font-semibold shadow-md"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                                  `}
                          >
                            <img
                              src={item.icon}
                              alt=""
                              className={`${isCollapsed ? "w-6 h-6" : "w-5 h-5"} object-contain transition-all duration-200 ${
                                isItemActive
                                  ? "brightness-200"
                                  : "opacity-90 group-hover:opacity-100"
                              }`}
                            />
                            <span
                              className={`font-inter font-semibold text-[16px] leading-[20px] text-white ${isCollapsed ? "hidden" : "block"}`}
                            >
                              {item.title}
                            </span>
                          </SidebarMenuButton>

                          {/* "Cause" text ke neeche 1 line indicator (expanded + collapsed dono mein) */}
                          {item.title === "Cause" && (
                            <div
                              className={`bg-white rounded-full transition-all duration-300 ${
                                isCollapsed ? "mx-auto" : "ml-1"
                              }`}
                              style={{
                                width: isCollapsed ? "40px" : "178px",
                                height: "3px",
                              }}
                            />
                          )}
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              {isCollapsed && index === 0 && (
                <div className="w-[32px] h-[1px] bg-white/20 mx-auto my-2" />
              )}
            </React.Fragment>
          ))}
        </SidebarContent>

        {/* Sidebar Footer: Settings & User Profile */}
        <SidebarFooter
          className={`p-0 mt-auto ${isCollapsed ? "" : "border-t border-white/10 pt-4"}`}
        >
          <SidebarMenu>
            {/* Settings Item */}
            <SidebarMenuItem
              className={`${isCollapsed ? "flex justify-center" : ""}`}
            >
              <SidebarMenuButton
                tooltip="Settings"
                onClick={() => handleNavigation("/settings")}
                isActive={location.pathname === "/settings"}
                className={`
                                    ${isCollapsed ? "h-11 w-11 p-2" : "h-11 w-full px-[12px] py-[10px] gap-2"}
                                    rounded-[10px] transition-all duration-200
                                    ${
                                      location.pathname === "/settings"
                                        ? "!bg-[#4070DA] !text-white font-semibold shadow-md"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
              >
                <img
                  src={settingsIcon}
                  alt=""
                  className={`${isCollapsed ? "w-6 h-6" : "w-5 h-5"} object-contain ${location.pathname === "/settings" ? "brightness-200" : "opacity-90 group-hover:opacity-100"}`}
                />
                <span
                  className={`font-inter font-semibold text-[16px] leading-[20px] text-white ${isCollapsed ? "hidden" : "block"}`}
                >
                  Settings
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Logout (Keep it subtle or put inside a menu, but for now standard) */}
            {/* <SidebarMenuItem className="mb-4">
                            <SidebarMenuButton
                                tooltip="Logout"
                                className="h-[44px] w-full rounded-[10px] px-[12px] py-[10px] gap-2 text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className={`font-inter font-semibold text-[16px] leading-[20px] ${isCollapsed ? "hidden" : "block"}`}>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
          </SidebarMenu>

          {/* User Profile Card */}
          <div
            className={`
                        flex items-center gap-3 ${isCollapsed ? "bg-transparent" : "bg-white/5 rounded-[16px]"}
                        ${isCollapsed ? "p-0 justify-center mb-3" : "p-3 w-full"}
                    `}
          >
            <div
              className={`
                            shrink-0 rounded-full bg-gradient-to-br from-[#A8E063] to-[#56AB2F] shadow-[0_0_15px_rgba(168,224,99,0.4)]
                            ${isCollapsed ? "w-11 h-11" : "w-10 h-10"}
                        `}
            >
              {/* Avatar content if any, otherwise showing the gradient circle as design */}
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div className="flex flex-col min-w-0">
                  <p className="font-inter font-semibold text-[16px] text-white truncate leading-tight">
                    {user.name}
                  </p>
                  <p className="font-inter text-[10px] text-slate-400 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
                {/* <span className="text-[10px] text-slate-600 font-medium">Free</span> */}
              </div>
            )}
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
