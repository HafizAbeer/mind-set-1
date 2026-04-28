import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

export default function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-[980px] border border-white/20 bg-black/80 px-6 py-12 sm:px-10 sm:py-14">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors"
        >
          <img src={skipBackIcon} alt="" className="h-6 w-6 opacity-90" />
        </button>

        <h1 className="text-center font-sans font-medium text-white text-4xl sm:text-6xl tracking-wide">
          Disclaimer
        </h1>

        <div className="mx-auto mt-10 max-w-[760px] text-center font-inter text-white/80 text-sm sm:text-base leading-8 tracking-[0.22em] sm:tracking-[0.28em]">
          <p>
            The contents of this app are intended solely for self-reflection and
            personal development and do not constitute medical or therapeutic
            advice.
          </p>

          <p className="mt-7">
            The web-app aims to a better coping ability with the stresses of
            daily life.
          </p>

          <p className="mt-7">Use of the app is at your own risk.</p>

          <p className="mt-7">
            Further information can be found in the Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}
