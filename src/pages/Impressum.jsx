import { useNavigate } from "react-router-dom";
import skipBackIcon from "@/assets/icons/skip-back.svg";

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="mt-2 font-inter text-white/85 text-[11px] sm:text-xs leading-5">
          <p className="text-white/85">Angaben gemäß § 5 TMG</p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-white/90">Anbieter / Verantwortlicher</p>
              <p>Osteomaps UG</p>
            </div>

            <div>
              <p className="text-white/90">Anschrift</p>
              <p>Lemberger Str. 68 a</p>
              <p>66957 Ruppertsweiler</p>
              <p>Deutschland</p>
            </div>

            <div>
              <p className="text-white/90">Kontakt</p>
              <p>Telefon: 0160-90288339</p>
              <p>E-Mail: contact@newmindsetapp.com</p>
              <p>Domain: https://newmindsetapp.com</p>
            </div>

            <div>
              <p>Martin C. Hermann</p>
              <p>Geschäftsführer</p>
            </div>

            <div>
              <p className="text-white/90">Register</p>
              <p>Register: IHK</p>
              <p>Registergericht: Zweibrücken</p>
              <p>Registernummer: IHK ID: 830703</p>
              <p>Umsatzsteuer-ID: DE350373080</p>
            </div>

            <div>
              <p className="text-white/90">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
              </p>
              <p>DE350373080</p>
            </div>

            <div>
              <p className="text-white/90">
                Inhaltlich Verantwortliche:r gemäß § 18 Abs. 2 MStV
              </p>
              <p>(für redaktionelle Inhalte)</p>
              <div className="mt-4">
                <p>Martin C. Hermann</p>
              </div>
              <div className="mt-4">
                <p>Lemberger Str. 68 a</p>
                <p>66957 Ruppertsweiler</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div>
              <p className="text-white/90">Streitschlichtung:</p>
              <p className="mt-2 max-w-[900px]">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit.
                <br />
                Wir sind nicht verpflichtet und nicht bereit, an einem
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

