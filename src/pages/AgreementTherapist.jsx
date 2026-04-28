import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function AgreementTherapist() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData;

  const handleAccept = async () => {
    if (!formData) {
      navigate("/signup", { replace: true });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          role: "Therapist",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      navigate("/enter-pin", { state: { email: formData.email } });
    } catch (err) {
      navigate("/signup", {
        state: { agreementError: err?.message || "Registration failed" },
      });
    }
  };

  return (
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[1040px] flex flex-col items-center text-center px-3 py-10">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
          Agreement
        </h1>

        <div className="flex flex-col gap-6 sm:gap-8 max-w-[920px]">
          <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
            1. I am aware as therapist that this app gives no medical or
            therapeutic advice. <br />
            The contents of this web app are for general information, inspiration
            and personal development purposes only. <br />
            They do not constitute medical, psychological, therapeutic or other
            professional advice and are not a substitute for diagnosis,
            counselling or treatment by qualified <br className="hidden sm:block" />
            doctors, psychologists, therapists or other professionals. <br />
            I consent that using this this App I only supply the therapeutic
            process remotely by <br className="hidden sm:block" />
            sending hints and tasks to my patients, and follow their development.
          </p>

          <div>
            <p className="text-white text-base sm:text-lg leading-relaxed font-bold">
              2. User responsibility:
            </p>
            <p className="mt-3 sm:mt-4 text-white text-base sm:text-lg leading-relaxed font-medium">
              My patient is solely responsible for the use of the content. I
              decide professionaly <br className="hidden sm:block" />
              which suggestions, exercises or content I give to my patient. No
              liability is accepted <br className="hidden sm:block" />
              for decisions or actions taken on the basis of the content of this
              app.
            </p>
          </div>

          <p className="text-[#EE1E1E] text-sm sm:text-lg font-bold mt-2 sm:mt-4 leading-relaxed">
            I have read and understood the disclaimer and agree with the above
            conditions and <br className="hidden sm:block" />
            declarations by clicking this checkbox.
          </p>

          <div className="flex justify-center mt-2 sm:mt-6">
            <button
              type="button"
              onClick={handleAccept}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00A3FF] rounded-[8px] flex items-center justify-center transition-all active:scale-95 shadow-[0_0_15px_rgba(0,163,255,0.4)]"
              aria-label="Accept agreement"
            >
              <Check className="text-white" size={28} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

