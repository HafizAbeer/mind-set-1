import React, { useEffect, useRef, useState } from "react";
import micIcon from "../../assets/icons/mic-icon.svg";

const getSpeechRecognition = () =>
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const ReflectionTextCard = ({ title, placeholder, value, onChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef(null);
  const supported = !!getSpeechRecognition();

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleRecording = () => {
    if (!supported) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition = getSpeechRecognition();
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    const baseValue = value;
    const baseSeparator = baseValue && !baseValue.endsWith(" ") ? " " : "";
    let committed = "";

    recognition.onstart = () => {
      setErrorMessage("");
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) {
          committed += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      const addition = `${committed}${interim}`.trim();
      if (!addition) return;
      onChange(`${baseValue}${baseSeparator}${addition}`);
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      console.error("[SpeechRecognition] error:", event.error, event);
      setErrorMessage(
        event.error === "not-allowed"
          ? "Microphone permission denied. Allow it in browser site settings and retry."
          : event.error === "no-speech"
            ? "No speech detected. Try speaking again."
            : `Speech recognition error: ${event.error}`,
      );
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.error("[SpeechRecognition] failed to start:", err);
      setErrorMessage(`Failed to start: ${err.message || err}`);
      recognitionRef.current = null;
    }
  };

  return (
    <div
      className="w-full max-w-[554px] min-h-[180px] sm:min-h-[400px] xl:h-[452px] rounded-[20px] p-4 sm:p-[32px] flex flex-col gap-3 sm:gap-[20px] shadow-xl relative"
      style={{
        backgroundColor: "rgba(240, 182, 20, 0.3)",
        border: "2px solid #F0B61480",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="w-10 sm:w-[50px] shrink-0" aria-hidden="true" />
        <h2 className="flex-1 text-[20px] sm:text-[24px] font-inter font-bold text-white text-center m-0">
          {title}
        </h2>
        <button
          type="button"
          onClick={toggleRecording}
          disabled={!supported}
          title={
            supported
              ? isRecording
                ? "Stop recording"
                : "Start recording"
              : "Speech recognition not supported in this browser"
          }
          aria-label={isRecording ? "Stop recording" : "Start recording"}
          aria-pressed={isRecording}
          className="w-10 h-10 sm:w-[50px] sm:h-[50px] shrink-0 rounded-full flex items-center justify-center hover:opacity-90 transition-all active:scale-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: isRecording
              ? "linear-gradient(180deg, #FF6B6B 0%, #C0392B 100%)"
              : "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
          }}
        >
          <img src={micIcon} alt="" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 rounded-[16px] p-3 sm:p-[20px] bg-[#27282E]/50 border border-[#F0B614] overflow-hidden">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-[none] outline-none text-white font-inter text-[16px] sm:text-[18px] leading-[22px] sm:leading-[28px] placeholder:text-[#C2C2C2] resize-none"
        />
      </div>

      {errorMessage && (
        <p className="text-[14px] text-[#FFB3B3] font-inter m-0 px-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ReflectionTextCard;
