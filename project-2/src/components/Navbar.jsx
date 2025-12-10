import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {/* Only App Name in Navbar Box */}
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

      {/* User Info - Completely Separate */}
      {currentUser && (
        <div className="fixed top-6 right-6 z-50">
          <div className="
            flex items-center gap-3
            bg-gradient-to-r from-blue-900/90 to-purple-900/90
            backdrop-blur-xl
            border border-blue-400/40
            rounded-2xl
            px-5 py-3
            shadow-2xl
            min-w-[250px]
          ">
            {/* Avatar */}
            <div className="
              w-12 h-12 
              rounded-full 
              bg-gradient-to-br from-blue-500 to-purple-600 
              flex items-center justify-center
              border-2 border-white/40
              flex-shrink-0
            ">
              <span className="font-bold text-white text-lg">
                {currentUser.displayName?.charAt(0).toUpperCase() || 
                 currentUser.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Details */}
            <div className="min-w-0">
              <p className="text-white font-bold truncate">
                {currentUser.displayName || currentUser.email.split('@')[0]}
              </p>
              <p className="text-white/80 text-sm truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;