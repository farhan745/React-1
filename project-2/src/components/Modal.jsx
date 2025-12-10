import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="
          fixed inset-0 z-40 
          bg-black/40 
          backdrop-blur-md
          animate-fadeIn
        "
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="
            relative w-full max-w-lg 
            rounded-2xl
            bg-white/10 backdrop-blur-xl 
            border border-white/20
            shadow-2xl 
            p-6 
            animate-scaleIn
          "
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              text-white/80 text-2xl 
              hover:text-white 
              transition
            "
          >
            <AiOutlineClose />
          </button>

          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
