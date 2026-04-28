import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1100px] rounded-xl border border-white/15 bg-black/80 px-6 py-10 sm:px-10 sm:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <img src={skipBackIcon} alt="" className="h-6 w-6 opacity-90" />
        </button>

        <div className="mx-auto w-full max-w-[900px]">
          <h1 className="text-center font-sans font-medium text-white text-4xl sm:text-6xl tracking-[0.18em]">
            Terms of Use
          </h1>

          <div className="mt-8 text-center text-white/85 font-inter tracking-[0.28em]">
            <p className="text-sm sm:text-base">1. Purpose of the app</p>
          </div>

          <div className="mt-10 text-center font-inter text-white/80 text-sm sm:text-base leading-8 tracking-[0.22em] sm:tracking-[0.28em]">
            <p>
              The New Mindset web app helps users to consciously recognise
              moments of stress and develop a mindful, reflective approach to
              challenging situations.
            </p>

            <p className="mt-8">
              The app guides users through a structured process consisting of
              twelve steps with multiple options to choose from as well as
              optional journal entries.
            </p>

            <p className="mt-12">
              The content is intended solely for self-reflection, information
              and personal development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

