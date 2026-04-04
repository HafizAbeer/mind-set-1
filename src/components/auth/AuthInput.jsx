import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  rightLabelText,
  rightLabelHref = "#",
  footerText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const actualType = isPasswordType && showPassword ? "text" : type;

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-[16px] leading-[24px] text-gray-300 block">
            {label}
          </label>
        )}
        {rightLabelText && (
          <Link
            to={rightLabelHref}
            className="text-[14px] text-[#6BC7FF] hover:text-[#1b93e5] leading-[20px] transition-colors"
          >
            {rightLabelText}
          </Link>
        )}
      </div>

      <div className="relative group w-full">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-200 group-focus-within:text-sky-400 transition-colors">
            <Icon className="w-5 h-5 opacity-100" />
          </div>
        )}
        <input
          type={actualType}
          placeholder={placeholder}
          className={`w-full bg-[#ffffff1f] text-gray-200 placeholder-gray-400 text-[14px] rounded-lg outline-none py-3 pr-4 border border-[#ffffff33] focus:border-[#20a3fb]/50 focus:bg-[#ffffff1f]/80 focus:ring-1 focus:ring-[#20a3fb]/50 transition-all ${Icon ? "pl-11" : "pl-4"} ${isPasswordType ? "pr-11" : ""}`}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 opacity-70" />
            ) : (
              <Eye className="w-5 h-5 opacity-70" />
            )}
          </button>
        )}
      </div>

      {footerText && (
        <p className="text-[14px] leading-[20px] text-white mt-2 !mb-4">
          {footerText}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
