import React from "react";
import { createPortal } from "react-dom";

const ImpressumModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] bg-black flex flex-col p-6 sm:p-12 overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      {/* Back Button */}
      <div className="absolute top-6 right-6 sm:top-12 sm:right-12">
        <button
          onClick={onClose}
          className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
            <line x1="9" y1="12" x2="21" y2="12"></line>
            <path d="M3 19V5"></path>
          </svg>
        </button>
      </div>

      <div className="max-w-[800px] w-full mx-auto">
        <h1 className="text-[48px] sm:text-[64px] font-inter font-bold text-white mb-2">
          Impressum
        </h1>
        <p className="text-[18px] text-white/90 mb-8">Angaben gemäß § 5 TMG</p>

        <div className="flex flex-col gap-8 text-[16px] sm:text-[18px] text-white/80 font-inter leading-relaxed">
          <section>
            <h2 className="text-white font-bold mb-1">
              Anbieter / Verantwortlicher
            </h2>
            <p>Osteomaps UG</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-1">Anschrift</h2>
            <p>Lemberger Str. 68 a</p>
            <p>66957 Ruppertsweiler</p>
            <p>Deutschland</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-1">Kontakt</h2>
            <p>Telefon: 0160-90288339</p>
            <p>E-Mail: contact@newmindsetapp.com</p>
            <p>Domain: https://newmindsetapp.com</p>
          </section>

          <section>
            <p>Martin C. Hermann</p>
            <p>Geschäftsführer</p>
          </section>

          <section>
            <p>Register: IHK</p>
            <p>Registergericht: Zweibrücken</p>
            <p>Registernummer: IHK ID: 830703</p>
            <p>Umsatzsteuer-ID: DE350373080</p>
          </section>

          <section>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
            </p>
            <p>DE350373080</p>
          </section>

          <section>
            <p>Inhaltlich Verantwortliche:r gemäß § 18 Abs. 2 MStV</p>
            <p>(für redaktionelle Inhalte)</p>
            <br />
            <p>Martin C. Hermann</p>
            <br />
            <p>Lemberger Str. 68 a</p>
            <p>66957 Ruppertsweiler</p>
            <p>Deutschland</p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 text-[20px]">
              Streitschlichtung:
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit.
            </p>
            <p>
              Wir sind nicht verpflichtet und nicht bereit, an einem
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>
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
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default ImpressumModal;
