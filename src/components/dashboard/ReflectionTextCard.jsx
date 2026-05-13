import React, { useEffect, useRef, useState } from "react";
import micIcon from "../../assets/icons/mic-icon.svg";

const getSpeechRecognition = () =>
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const ReflectionTextCard = ({ title, placeholder, value, onChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const valueRef = useRef(value);
  const supported = !!getSpeechRecognition();

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

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
    recognition.interimResults = false;
    recognition.lang = navigator.language || "en-US";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (!transcript) return;
      const current = valueRef.current;
      const separator = current && !current.endsWith(" ") ? " " : "";
      onChange(`${current}${separator}${transcript.trim()}`);
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  };

  return (
    <div
      className="w-full max-w-[554px] min-h-[400px] xl:h-[452px] rounded-[20px] p-6 sm:p-[32px] flex flex-col gap-[20px] shadow-xl relative"
      style={{
        backgroundColor: "rgba(240, 182, 20, 0.3)",
        border: "2px solid #F0B61480",
        backdropFilter: "blur(4px)",
      }}
    >
      <h2 className="text-[20px] sm:text-[24px] font-inter font-bold text-white text-center m-0">
        {title}
      </h2>

      <div className="flex-1 rounded-[16px] p-[20px] bg-[#27282E]/50 border border-[#F0B614] overflow-hidden">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-[none] outline-none text-white font-inter text-[18px] leading-[28px] placeholder:text-[#C2C2C2] resize-none"
        />
      </div>

      <div className="flex items-center justify-end px-2">
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
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center hover:opacity-90 transition-all active:scale-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: isRecording
              ? "linear-gradient(180deg, #FF6B6B 0%, #C0392B 100%)"
              : "linear-gradient(180deg, #FFD767 0%, #DFA400 100%)",
          }}
        >
          <img src={micIcon} alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReflectionTextCard;
