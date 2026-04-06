import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Info, X } from "lucide-react";
import mindsetLogo from "../assets/mindset-logo.svg";
import collapseIcon from "../assets/icons/collapse-icon.svg";
import exerciseIcon from "../assets/radarModulesIcon/exercise-orange-icon.svg";
import ExerciseOverlayCard from "../components/dashboard/ExerciseOverlayCard";

/**
 * Data mapping for exercise quotes associated with exercise IDs.
 * Simply add new ID-Quote pairs here to scale up to 200+ cards.
 */
const EXERCISE_QUOTES = {
  1: "As soon as I feel my familiar stress trigger coming on, I place my calming hand/s on the part of my body that I feel connected to it. I am determined to mindfully apply my desired mindset and no longer follow the old paths.",
  2: "Starting today, I will go for a walk in the fresh air once a day. I will merge with nature and enjoy the movement and breathing.I will let all my thoughts run through my head and organise them.",
  3: "I allow myself a short power nap to recharge my batteries. Sleep is still the best therapy. Afterwards, I get back to work with renewed energy.",
  4: "As soon as I notice my stressors again, I breathe in and out slowly for one minute. 7 seconds in and 5 seconds out. This calms my nerves.",
  5: "Today, I am planning to set aside some free time in which I can meditate and reflect. That is my priority today. I want to find myself.",
  6: "Today, I am going on a journey through my body. I am visiting the places in my body where my stress tends to accumulate. I am allowing my tissues to relax and my emotions to be released.",
  7: "I paint a picture that matches my emotional state, depicting my fears or tensions. Anything goes; there are no rules in this exercise.",
  8: "Today, I will relieve my stress through exercise and sports channeling all my pent-up energy into movement. Afterwards, I will feel  exhausted but even relaxed and serene.",
  9: "A yoga session always successfully relieves my tension. Moving and breathing is also possible in the office without a mat. The main thing is that I concentrate mindfully and enjoyably on my body.",
  10: "As soon as I notice stressful feelings, I concentrate on the tension in my tongue. I place my tongue relaxed on the floor of my mouth instead of pressing it against the teeth. It calms my emotions like a warming blanket .",
  11: "When I find myself clenching my teeth again, I massage my chewing muscles on my cheek and temple in a circular motion, slowly move my lower jaw in a circular motion to relax, or chew gum to release the tension.",
  12: "After stressful situations and when I go to bed at night, I stretch my neck, bend my head forwards and backwards alternately, turn and tilt it to the right and left to relieve tension. ",
  13: "When thoughts race through my mind at night, I slow down the flood of inner images by first sExercises my eyes by squinting, then letting go with relish and staring into the void, which makes the images fade away.",

  14: "When I cannot fall asleep, I observe my breathing neutrally from the outside and avoid influencing it. The next breath will surely come on its own. I let go of the effort of breathing. Then I fall asleep easily.",

  15: "When I feel pent-up anger again, I go into the garden and chop wood. It's a great way to let off steam. Stacking the wood helps me calm down and I feel balanced afterwards.",

  16: "Today I'm going to tidy up my messy corners; everything that's lying around will be thrown away or sorted.Afterwards, I'll feel tidy and purified.",
  17: "Today, I'm writing down everything that's on my mind – the pros and cons, the things that still feel unclear to me. This creates clarity and helps me see more clearly which decisions are right for me.",
  18: "Using Jacobson's relaxation technique, I alternately tense and relax my muscles in groups, starting from my feet and working my way up. This helps me to relieve tension.",
  19: "Today, I'm watching a funny programme with my loved ones that makes us all laugh. Afterwards, we're all exhausted from laughing, but very relaxed and happy.",
  20: "To ground myself, I take time to really focus on my pet. Grooming, playing or practising something new leaves me feeling very balanced.",
  21: "From now on, I will begin and end each day with a personal form of prayer, in which I give thanks for the good things and ask for the important things in my life. This is also part of my new mindset.",
  22: "Today, I am seeking therapy to help me with my issues and redefine my mindsets. Not next week or month, now is the moment to seek for professional aid.",
  23: "Starting tomorrow, I will give up what I feel dependent on. It will be difficult, but it will make me freer and happier. I can do it and will pay off.",
  24: "Today, I want to turn up the corners of my mouth and not frown. I will radiate positivity. I will rejoice in the grateful reactions of those around me.",
  25: "Accepting what has happened is the first step towards overcoming the consequences of misfortune. I am practising accepting what has happened, bit by bit.",
  26: "Starting today, I will show my sweetheart how much I love her/him and what she/he means to me. That will do us both so much good. Giving love is so wonderful.",
  27: "I devote my energy to promoting and strengthening peace and harmony in my environment. This gives others a lot of strength, and I get a lot of energy back from them.",
  28: "When I feel tense, I say out loud what I am going to do, calm myself down audibly and thus calm my nerves. That's not crazy, it's healthy.",
  29: "Tomorrow, I will treat myself to a delightful day full of fun and entertainment, with no obligations or considerations; only my Intention shall be important.",
  30: "Today, I consciously pay attention to my upright posture, especially when I see stress coming. It helps me through the turbulence of the day and gives me stability.",
  31: "Every day, I forgive my parents, partner and children and especially myself for all the deeds, words and thoughts that have not done me good in the past and today. This lightens my soul wonderfully and gives me strength and freedom.",
  32: "When I see problems looming on the horizon, I sit down and start making a list of ideas on how to deal with them. I divide the list into items that are easy to achieve and those that require more energy and time and need to be tackled later. ",
  33: "Starting tomorrow, I will practise not questioning and controlling everything. I want to give my fellow human beings an advance of trust. That will make feel all better.",
  34: "Today, I won't argue or complain, but do what I'm told and praise others, even if it's difficult for me. It feels so good at the end of the day.",
  35: "I carefully confront the triggers that frighten me so that I can deal with them better. There is no need to hurry, but a need to begin with the process.",
  36: "I avoid any kind of media, stimuli and contacts that distract me from myself and my true needs. As soon as I feel more stable, I allow myself small amounts of them again.",
  37: "I make sure to avoid thinking or saying ‘I must’. I replace it with the words ‘I want’,  ‘I will’ or ‘I should’. This takes the pressure off my day and gives me freedom.",
  38: "Every evening, I focus on what will motivate me the next morning to set my goals for an energetic day.",
  39: "When I think I NEED something, I immediately check whether I really need it or just WANT it. When I realise that I don't really need it, it frees me up mentally and emotionally.",
  40: "We act as if comfort and luxury are the most important requirements in life, when all we need to be happy is something to get excited about.",
  41: "When stress factors are too frequent and too difficult to cope with, I take a short trip to find new ideas and strategies in a different environment. This significantly increases my resilience and coping skills.",
  42: "I plan to calm my nervous tension every time it arises by stoking and rubbing gently over the associated structures witch get symptomatic with stress. That helps relaxing. ",
  43: "Every time I begin to have spinning thought that give me trouble, I will use the system of “if that then that” (ITTT) from the first thought to the last step. Though I achieve moro clarity and security about the issue.",
  44: "When times are tough and the wind is constantly blowing against me, I build myself a refuge, light a fire or set up candles, prepare a warm tea and hide from the storm around me to calm my nerves.",
  45: "I Intentionfor the strength to change what I can change, the humility to accept what I cannot change, and the wisdom to distinguish one from the other.",
  46: "I am grateful for all the good things that happen to us, for the health and prosperity we enjoy, and for the peace and love in which we live together.",
  47: "When I feel tensed I use my skills in autogenic Exercises in order to regain a state of emotional equilibrium and tranquility. ",
  48: "I am planning to meet up with my friends after a long period of seclusion or heavy workload. It will take energy to get myself organised, but the result will be worthwhile and make me happy. ",
  49: "With whom I often get in discussions and dispute I propose a new kind of conversation, the art of active listening. This will bring us in a new relationship-dimension. Maybe we search for a moderator/mediator. ",
  50: "Rather than letting the conflict drag on without resolving it, I seek a constructive discussion with the other person.",
  51: "When the next conflict looms, I stand up straight, speak in a calm voice and stand firm and steadfast in my position.",
  52: "Avoid pointless arguments or conflicts that always follow the same pattern and leave you feeling bad afterwards. Change the context or the situation to achieve a more mutually beneficial outcome.",
};

const ExercisesSelect = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([7]); // Default selected: visualization (id 7)
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
    const quote = EXERCISE_QUOTES[id];
    if (quote && !selectedIds.includes(id)) {
      setOverlayConfig({ isVisible: true, text: quote });
    }

    if (selectedIds.includes(id)) {
      setSelectedIds([]);
    } else {
      setSelectedIds([id]);
    }
  };

  const exercises = [
    { id: 1, label: "hands on stress" },
    { id: 2, label: "walk in the park" },
    { id: 3, label: "sleep / powernap" },
    { id: 4, label: "breathing deeply" },
    { id: 5, label: "Meditation" },
    { id: 6, label: "body Voyage" },
    { id: 7, label: "visualization" },
    { id: 8, label: "Sports" },
    { id: 9, label: "Yoga" },
    { id: 10, label: "tongue relaxation" },
    { id: 11, label: "jaw-Muscle relaxation" },
    { id: 12, label: "cervical relaxation movements" },
    { id: 13, label: "eyeball release" },
    { id: 14, label: "diaphragm release" },
    { id: 15, label: "chopping wood" },
    { id: 16, label: "tidying up" },
    { id: 17, label: "writing down" },
    { id: 18, label: "Jacobson relaxation" },
    { id: 19, label: "laughing" },
    { id: 20, label: "pet care" },
    { id: 21, label: "regular prayer" },
    { id: 22, label: "search for therapy" },
    { id: 23, label: "abstention" },
    { id: 24, label: "smiling" },
    { id: 25, label: "acceptance" },
    { id: 26, label: "give Love" },
    { id: 27, label: "peace maker" },
    { id: 28, label: "self talk" },
    { id: 29, label: "delightful day" },
    { id: 30, label: "upright posture" },
    { id: 31, label: "forgive" },
    { id: 32, label: "problem solving" },
    { id: 33, label: "trust someone" },
    { id: 34, label: "without replying" },
    { id: 35, label: "confronting fears" },
    { id: 36, label: "media fasting" },
    { id: 37, label: "I must not" },
    { id: 38, label: "search for sense" },
    { id: 39, label: "not needing" },
    { id: 40, label: "enthusiasm" },
    { id: 41, label: "change of scenery" },
    { id: 42, label: "gentle touch" },
    { id: 43, label: "consistent thinking" },
    { id: 44, label: "seek refuge" },
    { id: 45, label: "serenity prayer" },
    { id: 46, label: "thanks giving prayer" },
    { id: 47, label: "autogenic Exercises" },
    { id: 48, label: "meet friends" },
    { id: 49, label: "active listening dialogue" },
    { id: 50, label: "seeking a clarifying exchange" },
    { id: 51, label: "stand steady" },
    { id: 52, label: "avoid useless conflicts" },
  ];

  const themeColor = "#FF6721";
  const themeGradient = "linear-gradient(180deg, #FF996A 0%, #FF6721 100%)";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full flex items-start justify-center pt-[100px] sm:pt-[100px] md:pt-[120px] xl:pt-6 pb-4 overflow-y-auto custom-scrollbar">
        <div
          className="relative flex flex-col w-full max-w-[1400px] h-full text-white font-sans transition-all duration-300 px-3 sm:px-6"
        >
          <div className="flex w-full gap-[20px] sm:gap-[32px] md:gap-[48px] xl:gap-[0px] h-full relative z-10 justify-center">
            <div className="w-full max-w-[956px] flex flex-col h-full gap-[16px] sm:gap-[24px]">
              <div className="flex items-center h-auto min-h-[68px] gap-[16px] w-full shrink-0">
                <img
                  src={exerciseIcon}
                  alt="Icon"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <div className="flex flex-col justify-center w-full">
                  <h1 className="text-[clamp(24px,5vw,32px)] font-inter font-bold text-white m-0 leading-tight tracking-[-0.3px]">
                    Exercises Radar
                  </h1>
                  <p className="text-[clamp(14px,4vw,18px)] font-inter font-medium text-[#C5C5C5] m-0 leading-snug mt-1 sm:mt-2">
                    Select which exercises you prefer to strengthen your new mindset.
                  </p>
                </div>
              </div>

              <div className="w-full min-h-0 bg-[#FF6721]/10 border-[2px] border-[#FF6721] rounded-[16px] p-[20px] flex items-center gap-[8px] shrink-0">
                <Info size={24} className="text-white shrink-0" />
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-inter font-semibold text-[22px] leading-[28px] tracking-[0px] text-[#FF6721] m-0 text-center">
                    Which exercises do you want to use to support your new
                    mindset?
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
                  <span>Add your own Exercise</span>
                </div>
              </button>

              <div className="w-full flex-1 min-h-[250px] p-4 sm:p-[32px] md:p-[40px] xl:p-[50px] border-2 border-[#FF6721] rounded-[24px] bg-white/2 backdrop-blur-md relative overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[10px] justify-items-center">
                  {exercises.map((exercise) => (
                    <button
                      key={exercise.id}
                      onClick={() => toggleSelection(exercise.id)}
                      className={`h-[48px] w-full max-w-[440px] rounded-[10px] p-[12px_20px] flex items-center justify-between transition-all font-inter font-medium text-[15px] border ${selectedIds.includes(exercise.id)
                        ? "text-white border-transparent shadow-lg active:scale-95"
                        : "text-[#C2C2C2] hover:text-white"
                        }`}
                      style={{
                        background: selectedIds.includes(exercise.id)
                          ? themeGradient
                          : "linear-gradient(#27282E, #27282E) padding-box, linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 50%) border-box",
                        borderColor: selectedIds.includes(exercise.id)
                          ? "#FF6721"
                          : "transparent",
                      }}
                    >
                      <span className="truncate pr-2">{exercise.label}</span>
                      <span className="opacity-80 shrink-0">+ 1 p</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 md:flex-row md:items-center md:justify-between w-full pb-4 sm:pb-8 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/anchor")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all border-2 border-[#FF6721]/50 text-[15px] md:text-[20px] hover:bg-[#FF6721]/10 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(180deg, #FF996A50, #FF672150)",
                  }}
                >
                  <ArrowLeft size={24} className="shrink-0" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/life-script")}
                  className="flex-1 md:w-[calc(50%-8px)] h-[64px] rounded-[10px] flex items-center justify-center gap-[10px] p-[10px] md:p-[20px] font-inter font-bold text-white transition-all shadow-lg border-2 border-[#FF6721] text-[15px] md:text-[20px] hover:opacity-90 active:scale-95"
                  style={{ background: themeGradient }}
                >
                  Continue
                  <ArrowRight size={24} className="shrink-0" />
                </button>
              </div>

              <div className="h-10 w-full shrink-0" />
            </div>

            {/* Exercise Quote Overlay Modal (Dynamic Quote) */}
            {overlayConfig.isVisible &&
              createPortal(
                <div
                  className="fixed inset-0 z-400 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="exercise-quote-title"
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
                    <span id="exercise-quote-title" className="sr-only">
                      Exercise quote
                    </span>
                    <ExerciseOverlayCard
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

            {/* Add Custom Exercise Modal */}
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
                    backgroundImage:
                      "linear-gradient(#27282E, #27282E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
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
                      Add Custom Exercise
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
                      placeholder="Enter your Exercise..."
                      className="w-full h-[56px] rounded-[10px] text-white font-inter text-[16px] outline-none placeholder:text-white transition-all"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid transparent",
                        backgroundImage:
                          "linear-gradient(#35374380, #46474E), linear-gradient(180deg, #46474E 0%, rgba(53, 55, 67, 0.5) 100%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        padding: "16px 20px",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 h-[44px] rounded-[10px] border-2 border-[#FF6721] text-white font-inter font-bold text-[15px] hover:bg-[#FF6721]/10 transition-all active:scale-95 flex items-center justify-center m-0"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log("Adding exercise:", customInput);
                        setIsModalOpen(false);
                        setCustomInput("");
                      }}
                      className="px-6 h-[44px] rounded-[10px] text-white font-inter font-bold text-[15px] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center m-0"
                      style={{ background: themeGradient }}
                    >
                      Add Exercise
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

export default ExercisesSelect;
