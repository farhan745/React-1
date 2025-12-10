import React from "react";

const Navbar = () => {
  return (
    <div
      className="
        h-[65px] 
        mx-4 mt-4 
        rounded-2xl 
        flex items-center gap-3 justify-center
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-lg
        text-white text-xl font-semibold
        animate-fadeIn
      "
    >
      <img src="/firebase.svg" alt="" className="w-8 drop-shadow-lg" />

      <h1 className="tracking-wide">Firebase Contact App</h1>
    </div>
  );
};

export default Navbar;
