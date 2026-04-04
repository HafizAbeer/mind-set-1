import React from "react";

const AuthBackground = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50"></div>

      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1c1e26_100%)]"></div>
    </>
  );
};

export default AuthBackground;
