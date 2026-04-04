import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * Modern custom dropdown to replace native select
 */
const AuthSelect = ({
  label,
  icon: Icon,
  options = [],
  value,
  onChange,
  name,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    const val = typeof option === "string" ? option : option.value;
    // Mock event object for compatibility
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (opt) => (typeof opt === "string" ? opt : opt.value) === value,
  );

  const displayValue = selectedOption
    ? typeof selectedOption === "string"
      ? selectedOption
      : selectedOption.label
    : value || "Select...";

  return (
    <div className="space-y-2 w-full relative" ref={dropdownRef}>
      {label && (
        <label className="text-[16px] leading-[24px] text-gray-300 block ml-1">
          {label}
        </label>
      )}

      <div className="relative group w-full">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-[#ffffff1f] backdrop-blur-md text-gray-200 text-[14px] rounded-xl outline-none py-3.5 pr-10 border border-[#ffffff15] hover:border-[#20a3fb]/40 focus:border-[#20a3fb]/50 focus:ring-1 focus:ring-[#20a3fb]/20 transition-all text-left flex items-center ${Icon ? "pl-11" : "pl-4"}`}
        >
          {Icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-hover:text-sky-400 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className="truncate">{displayValue}</span>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-sky-400" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#ffffff1f] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 origin-top">
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar flex flex-col gap-1">
              {options.map((opt, idx) => {
                const optValue = typeof opt === "string" ? opt : opt.value;
                const optLabel = typeof opt === "string" ? opt : opt.label;
                const isSelected = optValue === value;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-inter w-full text-left ${
                      isSelected
                        ? "bg-[#20a3fb] text-white font-bold"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{optLabel}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSelect;
