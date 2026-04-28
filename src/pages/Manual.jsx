import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

const steps = [
  {
    number: 1,
    text: (
      <>
        Open Web address:{" "}
        <span className="font-semibold">NewMindsetapp.com</span>
      </>
    ),
  },
  {
    number: 2,
    text: "The browser (preferably Google) translates the entire web app into the language set on your device.",
  },
  { number: 3, text: "Tap the centre of the logo to start the protocol." },
  {
    number: 4,
    text: "The footer contains the disclaimer, privacy policy, legal notice and instructions for use.",
  },
  {
    number: 5,
    text: "The login process depends on the access rights for the app.",
  },
  {
    number: 6,
    text: "If you are not yet registered, go to the registration page and confirm the disclaimer.",
  },
  {
    number: 7,
    text: 'The path to mindfulness begins on the home screen. Starting with number (1) "Mindset"',
  },
];

export default function Manual() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1100px] rounded-xl border border-white/15 bg-black/80 px-6 py-10 sm:px-10 sm:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md  hover:bg-white/10 transition-colors"
        >
          <img src={skipBackIcon} alt="" className="h-6 w-6 opacity-90" />
        </button>

        <h1 className="text-center font-sans font-semibold text-white text-3xl sm:text-5xl tracking-wide">
          Manual for New Mindset App
        </h1>

        <ol className="mt-10 space-y-5 text-white/85 font-inter text-sm sm:text-base leading-7">
          {steps.map((s) => (
            <li key={s.number} className="flex gap-3">
              <span className="w-6 shrink-0 text-white/90">{s.number}.</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
