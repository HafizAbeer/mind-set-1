import React, { useState } from "react";
import { CircleCheck } from "lucide-react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Pro Monthly");

  const plans = [
    {
      name: "Free",
      description: "Everything you need to supercharge your mindfulnes.",
      price: "$0",
      period: "/ per month",
      features: [
        "Mindset-Radar",
        "Trigger-Radar",
        "Causes-Radar",
        "Mind-o-meter",
        "1x free insight-tour",
      ],
      isPopular: false,
    },
    {
      name: "Pro Monthly",
      description: "Unlock a new level of your personal mindfulnes.",
      price: "24,90",
      period: "/ per month",
      features: [
        "Everything in Free",
        "Advanced Statistics",
        "Therapeutic Dialog",
        "Unlimited Mindset Analysis",
        "Reflection-Radar",
        "Body-Radar",
        "Symptoms-Radar",
        "Intention-Radar",
        "Anchor-Radar",
        "Exercises-Radar",
        "Life Script-Radar",
        "Old Script-Radar",
        "New Script-Radar",
        "High-resolution exports",
      ],
      isPopular: true,
    },
    {
      name: "Pro Quarterly",
      description: "Unlock a new level of your personal mindfulnes.",
      price: "22,50",
      period: "/ per month",
      features: [
        "Everything in Free",
        "Advanced Statistics",
        "Therapeutic Dialog",
        "Unlimited Mindset Analysis",
        "Reflection-Radar",
        "Body-Radar",
        "Symptoms-Radar",
        "Intention-Radar",
        "Anchor-Radar",
        "Exercises-Radar",
        "Life Script-Radar",
        "Old Script-Radar",
        "New Script-Radar",
        "High-resolution exports",
      ],
      isPopular: false,
    },
    {
      name: "Pro Yearly",
      description: "Unlock a new level of your personal mindfulnes.",
      price: "19,90",
      period: "/ per month",
      features: [
        "Everything in Free",
        "Advanced Statistics",
        "Therapeutic Dialog",
        "Unlimited Mindset Analysis",
        "Reflection-Radar",
        "Body-Radar",
        "Symptoms-Radar",
        "Intention-Radar",
        "Anchor-Radar",
        "Exercises-Radar",
        "Life Script-Radar",
        "Old Script-Radar",
        "New Script-Radar",
        "High-resolution exports",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-inter">
      <div className="min-h-screen flex flex-col items-center pt-24 pb-16 px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 mt-4">
          <div className="flex items-center justify-center h-[28px] px-[12px] py-[6px] rounded-[100px] border border-white/10 bg-gradient-to-b from-[#71CFFF]/50 to-[#0089CF]/50 text-white text-[12px] font-medium leading-none mb-6">
            Bring your Mindset to the best scale
          </div>

          <h1 className="text-4xl md:text-[52px] font-bold text-white text-center mb-6 leading-tight tracking-tight">
            Discover Products <br />
            With the{" "}
            <span className="bg-gradient-to-b from-[#FFFFFF]/80 to-[#02A0F3] bg-clip-text text-transparent">
              Best Pricing
            </span>
          </h1>

          <p className="text-[#A0A0A0] text-sm sm:text-base text-center max-w-2xl px-4 leading-relaxed">
            Your free trial ends at this stage of the protocol. Unlock the full
            potential of New Mindset <br className="hidden md:block" />
            and continue your journey to mental wellness.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px]">
          {plans.map((plan, index) => {
            const isActive = selectedPlan === plan.name;
            const isFree = plan.name === "Free";

            return (
              <div
                key={index}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative rounded-[24px] p-6 lg:p-8 flex flex-col shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isActive
                    ? "backdrop-blur-[84px] bg-[linear-gradient(180deg,rgba(0,159,229,0.12)_0%,rgba(0,159,229,0.04)_50%,rgba(0,159,229,0.07)_100%)] border-transparent"
                    : "bg-[#1C1C24] border border-white/5 hover:border-white/20"
                }`}
              >
                {/* Active Card Glow / Border */}
                {isActive && (
                  <>
                    {/* Inner Gradient Border */}
                    <div
                      className="absolute inset-0 rounded-[24px] pointer-events-none"
                      style={{
                        padding: "2px",
                        background:
                          "linear-gradient(180deg, rgba(0, 159, 229, 0) 0%, rgba(0, 159, 229, 1) 50%, rgba(0, 159, 229, 0) 100%)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* Top Edge Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-[#009FE5] to-transparent shadow-[0_0_20px_4px_rgba(0,159,229,0.5)] pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-[#009FE5] shadow-[0_0_12px_2px_rgba(0,159,229,0.9)] pointer-events-none" />
                  </>
                )}

                {/* Top Section */}
                <div className="flex items-center justify-between mb-6 z-10">
                  <div className="relative">
                    {/* Radio Button */}
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? "bg-[#009FE5]"
                          : "bg-white/10 border border-white/5"
                      }`}
                    >
                      <div className="w-[12px] h-[12px] rounded-full border-[2.5px] border-white bg-transparent" />
                    </div>
                  </div>

                  {plan.isPopular && (
                    <div className="bg-[#38BDF8] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
                      Most Popular
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 mb-6 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
                    {plan.name === "Free" ? (
                      "Free"
                    ) : (
                      <>
                        Pro{" "}
                        <span className="font-normal text-white/90">
                          {plan.name.split(" ")[1]}
                        </span>
                      </>
                    )}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] h-10 line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2.5 mb-8 z-10 h-[52px]">
                  <span className="text-4xl sm:text-[52px] font-medium text-white leading-none tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-white/70 font-medium">
                    {plan.period}
                  </span>
                </div>

                <div className="z-10 w-full">
                  <button className="w-full py-3.5 bg-gradient-to-t from-[#6BC7FF] to-[#009FE5] hover:from-[#38BDF8] hover:to-[#38BDF8] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_rgba(56,189,248,0.3)] active:scale-[0.98]">
                    Get Started
                  </button>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-6 z-10"></div>

                <div className="z-10 w-full">
                  <p className="text-sm font-semibold text-white mb-4">
                    What you will get
                  </p>
                  <ul className="flex flex-col gap-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {isFree ? (
                          <CircleCheck
                            className="w-5 h-5 shrink-0 mt-[1px] text-[#A0A0A0]"
                            strokeWidth={2}
                          />
                        ) : (
                          <CircleCheck
                            className="w-5 h-5 shrink-0 mt-[1px]"
                            fill="#009FE5"
                            color="black"
                            strokeWidth={2}
                          />
                        )}
                        <span
                          className={`text-sm ${isFree ? "text-[#A0A0A0]" : "text-white/90"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
