import React from "react";

const AuthCheckbox = ({ label, checked, onChange, ...props }) => {
    return (
        <div className="flex items-center gap-3 pt-1 pb-1">
            <div className="relative flex items-center justify-center w-4 h-4 rounded-sm bg-[#20a3fb] border border-[#20a3fb] shrink-0">
                <input
                    type="checkbox"
                    className="absolute opacity-0 w-full h-full cursor-pointer peer"
                    checked={checked}
                    onChange={onChange}
                    {...props}
                />
                <div className="pointer-events-none text-white transition-opacity">
                    <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                        <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            {label && (
                <label className="text-[14px] leading-[20px] text-gray-200 cursor-pointer">
                    {label}
                </label>
            )}
        </div>
    );
};

export default AuthCheckbox;
