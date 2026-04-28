import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

const literature = [
  "Kennerley, Helen; Kirk, Joan; Westbrook, David. An Introduction to Cognitive Behaviour Therapy: Skills and Applications (English Edition)",
  "Ellis A., Rational, Emotive, Behavioural Therapy",
  "Hüther G., Biology of Fear",
  "Fromm, E. (1976). Haben oder sein (p. 11). München: Deutsche Verlags Anstalt",
  "Erdelyi, M., Buschke, H. & Finkelstein, S. (1977). Hypermnesie für sokratische Reize: Die Steigerung des Abrufs einer intern generierten Gedächtnisliste, die aus einer Reihe von Rätseln abstrahiert wurde. Memory & Cognition , 5 (3), 283–286",
  "David, Burns & Burns, M. D. (1980). Feeling good: The new mood therapy. NY: Signet Books. Chin, Richard. 42-3.",
];

export default function Literature() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1200px] rounded-xl border border-white/15 bg-black/80 px-6 py-10 sm:px-10 sm:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <img src={skipBackIcon} alt="" className="h-6 w-6 opacity-90" />
        </button>

        <h1 className="font-sans font-medium text-white text-4xl sm:text-6xl tracking-wide">
          Related Literature
        </h1>

        <ol className="mt-10 space-y-5 font-inter text-white/85 text-sm sm:text-base leading-7">
          {literature.map((item, idx) => (
            <li key={item} className="flex gap-3">
              <span className="w-6 shrink-0 text-white/90">{idx + 1}.</span>
              <span className="wrap-break-word">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

