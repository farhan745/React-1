import React from "react";

const NotFOundContact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4 animate-fadeIn">

      {/* Image */}
      <div className="w-40 opacity-90">
        <img src="/contact.png" alt="Not Found" className="w-full" />
      </div>

      {/* Text */}
      <h3 className="text-white text-xl font-semibold tracking-wide">
        No Contacts Found
      </h3>

      {/* Subtitle */}
      <p className="text-white/70 text-sm">
        Add a new contact to get started.
      </p>
    </div>
  );
};

export default NotFOundContact;
