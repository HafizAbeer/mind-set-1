import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info, X } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import intentionIcon from "../assets/radarModulesIcon/intention-yellow-icon.svg";
import MindsetOverlayCard from "../components/dashboard/MindsetOverlayCard";

/**
 * Data mapping for mindset quotes associated with intention IDs.
 * Simply add new ID-Quote pairs here to scale up to 200+ cards.
 */
const INTENTION_QUOTES = {
  1: "I experience everything with mindful attention,\nexperiencing every moment very consciously.",
  2: "Today, I want to abandon old patterns\nand break new ground.",
  3: "Discipline is the best form of self-love.",
  4: "I am confident that everything \nwill be fine, and that gives me strength!",
  5: "Postponing my needs strengthens my willpower and allows me to appreciate their fulfilment more consciously.",
  6: "Today, I'm going on the offensive. I won't let myself be beaten down or outvoted.",
  7: "Love triumphs over my selfishness and weaknesses",
  8: "I strive for more harmony in my family my friends and work collegues.",
  9: "Serenity is my best medicine for stress.",
  10: "It carries me through trouble and sorrow.",
  11: "It also enriches me whenever I'm generous not only who received the gift",
  12: "Forgiveness lightens my soul and gives me peace.",
  13: "I'm going to take good care of myself today. First come my needs, afterwards my fellow people",
  14: "I'd rather turn a blind eye and not be so hard on myself. I'll try more self-forgiveness.",
  15: "I'd rather turn a blind eye and not be so hard on others",
  16: "Modesty gives me strength and peace every day, more than any claim to possessions.",
  17: "Curiosity and enthusiasm make life truly enjoyable.",
  18: "I want to respect my fellow human beings as I expect them to respect me.",
  19: "I won't give up, I'll stick with it even if it gets difficult. I'm very perseverant.",
  20: "Empathy enriches us all more than criticism and rejection.",
  21: "I concentrate on my most important issues, not letting me distract from the noise around me any more. It will bring me forward.",
  22: "With perseverance, I can overcome all obstacles and hurdles in life.",
  23: "I am humble and patiently endure difficulties, consciously enjoying the beautiful things in life.",
  24: "After days of hard work, I feel much better than after days of laziness.",
  25: "I will not be dissuaded from my goal and plan; I know that it is the right thing for me.",
  26: "It makes me feel so good when people call me ‘reliable’.",
  27: "With a sense of humour, I find the day easier to bear.",
  28: "I am grateful for the opportunities that come my way and I approach them with an open heart and mind.",
  29: "I go through the day feeling calm, nothing can upset me.",
  30: "tranquility is so comforting.",
  31: "I’m courageous, I can do it and face the challenge head on.",
  32: "Thoughts are free. No one can forbid them. Here I am my own master.",
  33: "I am thankful for all the good and beautiful things in everyday life.",
  34: "Patience resolves most of the conflicts that arise between me and those around me.",
  35: "I never give up hope and am rewarded for it sooner or later.",
  36: "When I put myself in someone else's shoes, I help us both. Benevolence is the foundation of each relation.",
  37: "It feels so good to speak my mind, even if it often gets me into trouble.",
  38: "Consoling others does me good and not only alleviates their pain.",
  39: "Tolerance for other opinions is my strength in conflict, not my weakness.",
  40: "I want to respect my fellow human beings as I expect them to respect me.",
  41: "Clarity is so beneficial that I do everything I can to achieve it.",
  42: "Today, I want to abandon old patterns and break new ground.",
  43: "Going outdoor, breathing free air and enjoiing nature brings me back to my real roots as child of this world.",
  44: "I love building a cosy nest for my loved ones and me.",
  45: "Postponing my needs strengthens my willpower and allows me to appreciate their fulfilment more consciously.",
  46: "Today, I will show myself and the world what I can achieve with my willpower.",
  47: "Today, I'm taking things easy, without any pressure or constraint.",
  48: "Today, joy shall be my constant companion in work, family and leisure.",
  49: "Today, I will say ‘NO’ when I feel overwhelmed, not ´YES´ like usualy.",
  50: "I'm not putting up with it today, I'm speaking my mind.",
  51: "With perseverance, I can overcome all obstacles and hurdles in life.",
  52: "I want to use this day as if it were the last day I could do so.",
  53: "Everything is in flow, nothing stands still, and I let myself be carried along without fear.",
  54: "I take a step back and show consideration. Afterwards, I feel much better.",
  55: "Today, I avoid using the word ‘I must’. Instead I use “I want to” or  “I intend to”.",
  56: "Fear can only affect me if I give in to it. I act in a controlled manner despite my fear, and this makes me strong.",
  57: "Off to new horizons! Only those who dare win. ",
  58: "In contentment, I find peace and wealth, rather then in consumption",
  59: "I cherish my islands of pleasure in a sea of duties.",
  60: "Today, I'm going on the offensive. I won't let myself be beaten down or outvoted.",
  61: "I let go of anyone or anything that does not want to stay or is no longer good for me.",
  62: "Today, I'm going on the offensive. I won't let myself be beaten down or outvoted.",
  63: "I will live this day carefree. No dark thoughts, no sorrow!",
  64: "I'm going to take a break today, just look after myself and recharge my batteries.",
  65: "Tidying up helps me when I'm bored, afterwards I feel organised.",
  66: "Today I'm tackling my plans, not waiting until tomorrow.",
  67: "Success is measured by whether you can share it with others. Today, we are starting together.",
  68: "When I feel anxious, it helps me to tackle clear goals immediately.",
  69: "I am allowing myself to get close to people again, even though it is difficult for me. I allow myself as well to withdraw when I want to be alone.",
  70: "I am happy to take on responsibility, even if it means extra work.",
  71: "I am worthy of being loved and appreciated. However, I do not make myself dependent on it.",
  72: "I can and want to strive for satisfaction every day. It’s no sin, but human.",
  73: "Curiosity and willpower help me succeed in new challenges.",
  74: "Today, I am taking the liberty to do what is good for me, regardless of what others want.",
  75: "A beggar envies me for my problems, a sick person envies me for my health.",
  76: "I fight resolutely for my goals. Nobody will dissuade me from my plan.",
  77: "Euphoria is the spice of life and routine is the foundation of my stability.",
};

const IntentionSelect = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([4]); // Default selected: Trust in the future (id 4)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overlayConfig, setOverlayConfig] = useState({ isVisible: false, text: "" });
  const [customInput, setCustomInput] = useState("");

  useEffect(() => {
    if (!overlayConfig.isVisible) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOverlayConfig({ isVisible: false, text: "" });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlayConfig.isVisible]);

  const toggleSelection = (id) => {
    // Scalable lookup: If a quote exists for this ID, show the overlay
    const quote = INTENTION_QUOTES[id];
    if (quote && !selectedIds.includes(id)) {
      setOverlayConfig({ isVisible: true, text: quote });
    }

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const intentions = [
    { id: 1, label: "Mindfulness" }, { id: 2, label: "New beginning" },
    { id: 3, label: "Discipline" }, { id: 4, label: "Trust in the future" },
    { id: 5, label: "Frugality" }, { id: 6, label: "Offensive Spirit" },
    { id: 7, label: "Love" }, { id: 8, label: "Harmony" },
    { id: 9, label: "Serenity" }, { id: 10, label: "Enthusiasm" },
    { id: 11, label: "Generosity" }, { id: 12, label: "Forgiveness" },
    { id: 13, label: "Self Care" }, { id: 14, label: "Indulgence towards oneself" },
    { id: 15, label: "Indulgence towards others" }, { id: 16, label: "Modesty" },
    { id: 17, label: "Curiosity" }, { id: 18, label: "Respectfulness" },
    { id: 19, label: "Determination" }, { id: 20, label: "Empathy" },
    { id: 21, label: "Dedication" }, { id: 22, label: "Persistent" },
    { id: 23, label: "Humility" }, { id: 24, label: "Diligence" },
    { id: 25, label: "Self-Confidence" }, { id: 26, label: "Reliable" },
    { id: 27, label: "Laughter Humor" }, { id: 28, label: "Tranquillity" },
    { id: 29, label: "Strength / Endurance" }, { id: 30, label: "Freedom" },
    { id: 31, label: "Gratitude" }, { id: 32, label: "Trust" },
    { id: 33, label: "Patience" }, { id: 34, label: "Optimism" },
    { id: 35, label: "Benevolence" }, { id: 36, label: "Honesty" },
    { id: 37, label: "Consolation" }, { id: 38, label: "Tolerance" },
    { id: 39, label: "Respect" }, { id: 40, label: "Clarity" },
    { id: 41, label: "Courage to try something new" }, { id: 42, label: "Nature-experience" },
    { id: 43, label: "Feeling of Security" }, { id: 44, label: "Make Sports" },
    { id: 45, label: "Asceticism" }, { id: 46, label: "Willpower" },
    { id: 47, label: "Reduce Constraints" }, { id: 48, label: "Joy of live" },
    { id: 49, label: "Retire" }, { id: 50, label: "Be casual" },
    { id: 51, label: "be combative" }, { id: 52, label: "perseverant" },
    { id: 53, label: "Carpe Diem" }, { id: 54, label: "Panta Rhei" },
    { id: 55, label: "consideration" }, { id: 56, label: 'not thinking: "I must"' },
    { id: 57, label: "fearless" }, { id: 58, label: "new horizons" },
    { id: 59, label: "contentment" }, { id: 60, label: "islands of pleasure" },
    { id: 61, label: "offensive" }, { id: 62, label: "letting go" },
    { id: 63, label: "offensive" }, { id: 64, label: "carefree living" },
    { id: 65, label: "take a break" }, { id: 66, label: "Tidying up" },
    { id: 67, label: "tackling things" }, { id: 68, label: "have success" },
    { id: 69, label: "organized" }, { id: 70, label: "allowing contact" },
    { id: 71, label: "responsibility" }, { id: 72, label: "love worthy" },
    { id: 73, label: "satisfaction" }, { id: 74, label: "curious" },
    { id: 75, label: "liberty" }, { id: 76, label: "no sorrows" },
    { id: 77, label: "resoluteness" }, { id: 78, label: "Euphoria" },
  ];

  const themeColor = "#FBA90B";
  const themeGradient = "linear-gradient(180deg, #FFD075 0%, #E39B10 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[90px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-hidden">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6 overflow-hidden"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center overflow-hidden">
            <div className="w-full max-w-[956px] flex flex-col h-full overflow-hidden gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img src={intentionIcon} alt="Icon" className="w-9 h-9 object-contain shrink-0" />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Intention Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Now select the mindset that you want for the near future
                  </p>
                </div>
              </div>

              <div className="w-full min-h-[108px] bg-[#FBA90B]/10 border-[2px] border-[#FBA90B] rounded-[16px] p-[20px] flex items-center gap-[8px] shrink-0">
                <Info
                  size={24}
                  className="text-white shrink-0"
                />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[22px] leading-[28px] tracking-[0px] text-[#FBA90B] m-0 text-center">
                    You have now successfully identified your mindset and its deeper relations.<br />
                    What new mindset do you want now to influence your state of mind?<br />
                    Double-clic those you want to see in your phone widget.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full h-[56px] sm:h-[64px] rounded-[10px] border-0 bg-sidebar-bg flex items-center justify-center p-4 sm:p-[20px] transition-all shrink-0 font-inter font-semibold text-[16px] sm:text-[20px] text-white hover:bg-[#2f3037] active:scale-95"
                style={{
                  backgroundColor: "#27282E",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2383848A' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus size={24} className="shrink-0" />
                  <span>Add your own intention</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#FBA90B] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                  {intentions.map((intention) => (
                    <button
                      key={intention.id}
                      onClick={() => toggleSelection(intention.id)}
                      className={`h-[48px] w-full max-w-[440px] rounded-[10px] p-[12px_20px] flex items-center justify-center transition-all font-inter font-medium text-[15px] border ${selectedIds.includes(intention.id)
                        ? "text-white border-transparent shadow-lg active:scale-95"
                        : "text-[#C2C2C2] hover:text-white"
                        }`}
                      style={{
                        background: selectedIds.includes(intention.id)
                          ? themeGradient
                          : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                        borderColor: selectedIds.includes(intention.id)
                          ? "#FBA90B"
                          : "transparent",
                      }}
                    >
                      {intention.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/symptom")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#FBA90B]/50 text-[15px] md:text-[20px] hover:bg-[#FBA90B]/10 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(180deg, #FFD07550, #E39B1050)" }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/anchor")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#FBA90B] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>

            {/* Mindset Quote Overlay Modal (Dynamic Quote) */}
            {overlayConfig.isVisible &&
              createPortal(
                <div
                  className="fixed inset-0 z-400 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mindset-quote-title"
                >
                  <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    onClick={() => setOverlayConfig({ isVisible: false, text: "" })}
                    aria-hidden
                  />
                  <div
                    className="relative z-1 max-h-[min(90dvh,350px)] w-full max-w-[502px] animate-in fade-in zoom-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span id="mindset-quote-title" className="sr-only">
                      Mindset quote
                    </span>
                    <MindsetOverlayCard
                      text={overlayConfig.text}
                      onShare={() => {
                        if (navigator.share) {
                          navigator
                            .share({
                              text: overlayConfig.text.replace(/\n/g, " "),
                            })
                            .catch(() => { });
                        } else {
                          navigator.clipboard?.writeText(overlayConfig.text.replace(/\n/g, " "));
                        }
                      }}
                    />
                  </div>
                </div>,
                document.body
              )}

            {/* Add Custom Intention Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-md"
                  onClick={() => setIsModalOpen(false)}
                />
                <div
                  className="relative w-[632px] h-auto bg-[#27282E] rounded-[20px] p-[20px] flex flex-col gap-[20px] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden"
                  style={{
                    border: "1px solid transparent",
                    backgroundImage: "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-[#83848A] hover:text-white transition-colors"
                  >
                    <X className="rotate-45" size={20} />
                  </button>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-[28px] font-inter font-bold text-white m-0">
                      Add Custom Intention
                    </h2>
                    <p className="text-[16px] font-inter font-medium text-white m-0 opacity-80">
                      Describe your current state in your own words
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter your Intention..."
                      className="w-full h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid transparent",
                        backgroundImage: "linear-gradient(#35374380, #46474E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        padding: "16px 20px",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 h-[44px] rounded-[10px] border-2 border-[#FBA90B] text-white font-inter font-bold text-[15px] hover:bg-[#FBA90B]/10 transition-all active:scale-95 flex items-center justify-center m-0"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log("Adding intention:", customInput);
                        setIsModalOpen(false);
                        setCustomInput("");
                      }}
                      className="px-6 h-[44px] rounded-[10px] text-white font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                      style={{ background: themeGradient }}
                    >
                      Add Intention
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntentionSelect;
