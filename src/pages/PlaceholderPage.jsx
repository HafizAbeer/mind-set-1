import { useNavigate } from "react-router-dom";

export default function PlaceholderPage({ title }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh w-full bg-[#1e1f24] overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="font-sans font-medium text-white text-4xl md:text-6xl">
          {title}
        </h1>
        <p className="font-inter text-white/50 text-lg md:text-xl tracking-wide">
          This page is currently in development.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 border border-white rounded-full px-8 py-2 text-white/70 font-inter font-medium text-sm tracking-[3px] hover:text-white hover:border-white transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
