import React from "react";

const AuthButton = ({
  children,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full sm:w-[484px] h-[48px] text-white font-semibold cursor-pointer rounded-[8px]
             px-[40px] py-[10px] transition-all 
             active:scale-[0.98] mt-4
             bg-gradient-to-b from-[#6BC7FF] to-[#009FE5] 
             hover:from-[#5AB0E0] hover:to-[#008DCB] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;
