import React from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgreementModal = ({ isOpen, onClose, role, onAccept }) => {
  if (!isOpen) return null;

  const isTherapist = role === "Therapist";

  const handleAccept = () => {
    if (onAccept) onAccept();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/95 backdrop-blur-sm custom-scrollbar">
      <div className="flex flex-col items-center min-h-full p-6 sm:p-12">
        <div className="my-auto relative w-full max-w-[1000px] flex flex-col items-center">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Agreement</h1>

          <div className="flex flex-col gap-6 sm:gap-8 text-center max-w-[900px]">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
                {isTherapist ? (
                  <>
                    1. I am aware as therapist that this app gives no medical or therapeutic advice. <br />
                    The contents of this web app are for general information, inspiration and personal <br className="hidden sm:block" />
                    development purposes only. <br />
                    They do not constitute medical, psychological, therapeutic or other professional <br className="hidden sm:block" />
                    advice and are not a substitute for diagnosis, counselling or treatment by qualified <br className="hidden sm:block" />
                    doctors, psychologists, therapists or other professionals. <br />
                    I consent that using this this App I only supply the therapeutic process remotely by <br className="hidden sm:block" />
                    sending hints and tasks to my patients, and follow their development.
                  </>
                ) : (
                  <>
                    1. I am aware that this app gives no medical or therapeutic advice. <br />
                    The contents of this web app are for general information, inspiration and personal <br className="hidden sm:block" />
                    development purposes only. <br />
                    They do not constitute medical, psychological, therapeutic or other professional <br className="hidden sm:block" />
                    advice and are not a substitute for diagnosis, counselling or treatment by qualified <br className="hidden sm:block" />
                    doctors, psychologists, therapists or other professionals. <br />
                    I am aware that in the event of an acute mental health crisis, I must contact a qualified <br className="hidden sm:block" />
                    professional or emergency service.
                  </>
                )}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-white text-base sm:text-lg leading-relaxed font-bold">
                2. User responsibility:
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
                {isTherapist ? (
                  <>
                    My patient is solely responsible for the use of the content. I decide professionaly <br className="hidden sm:block" />
                    which suggestions, exercises or content I give to my patient. No liability is <br className="hidden sm:block" />
                    accepted for decisions or actions taken on the basis of the content of this app.
                  </>
                ) : (
                  <>
                    I am solely responsible for the use of the content. I decide for myselve how to <br className="hidden sm:block" />
                    interpret and apply the suggestions, exercises or content offered. No liability is <br className="hidden sm:block" />
                    accepted for decisions or actions taken on the basis of the content of this app.
                  </>
                )}
              </p>
            </div>

            <p className="text-[#EE1E1E] text-sm sm:text-lg font-bold mt-2 sm:mt-4 leading-relaxed">
              I have read and understood the disclaimer and agree with the above conditions and <br className="hidden sm:block" />
              declarations by clicking the check button.
            </p>

            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                onClick={handleAccept}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00A3FF] rounded-[8px] flex items-center justify-center transition-all active:scale-95 shadow-[0_0_15px_rgba(0,163,255,0.4)]"
              >
                <Check className="text-white" size={28} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4A4D53;
          border-radius: 10px;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default AgreementModal;
