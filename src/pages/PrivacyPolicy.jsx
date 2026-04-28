import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-10 sm:px-10 sm:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <img src={skipBackIcon} alt="" className="h-6 w-6 opacity-90" />
        </button>

        <h1 className="font-sans font-medium text-white text-4xl sm:text-6xl tracking-wide">
          Privacy Policy
        </h1>

        <div className="mt-6 font-inter text-white/85 text-xs sm:text-sm leading-6">
          <p className="text-white/90">1. General Information</p>

          <p className="mt-4 max-w-[760px]">
            The protection of your personal data is important to us. This
            privacy policy informs you about what data we collect, how we use it
            and what rights you have.
          </p>

          <p className="mt-4 max-w-[760px]">
            Personal data is any data that can be used to identify you
            personally.
            <br />
            We do not use or sell your data or entries.
            <br />
            In case you want to share your entries with friends, family,
            therapists or doctors it's up to you to do so by sharing your
            statistical page.
          </p>

          <p className="mt-10 text-white/90">2. Responsible body</p>

          <p className="mt-4 max-w-[760px]">
            The responsible body for data processing within the meaning of the
            GDPR is:
          </p>

          <div className="mt-6 whitespace-pre-line text-white/85">
            <p>Osteomaps UG</p>
            <p>Lemberger Str. 68 a</p>
            <p>D-66957 Ruppertsweiler</p>
            <p>[info@newmindsetapp.com]</p>
            <p>+4916090288339</p>
          </div>
        </div>
      </div>
    </div>
  );
}

