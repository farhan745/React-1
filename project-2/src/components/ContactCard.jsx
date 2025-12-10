import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse(false);

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully ✅");
    } catch (error) {
      toast.error("Failed to delete contact ❌");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="
          flex items-center justify-between gap-3
          bg-white/10 backdrop-blur-md border border-white/20
          p-4 rounded-2xl shadow-lg transition-all
          hover:shadow-xl hover:scale-[1.02]
        "
      >
        {/* Left: Icon + Text */}
        <div className="flex items-center gap-3">
          <HiOutlineUserCircle className="text-5xl text-white/80" />

          <div className="text-white">
            <h2 className="font-semibold text-lg tracking-wide">
              {contact.name}
            </h2>
            <p className="text-sm text-white/70">{contact.Email}</p>
          </div>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-4 text-3xl text-white/80">
          <RiEditCircleLine
            onClick={onOpen}
            className="cursor-pointer hover:text-blue-300 transition"
          />

          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer hover:text-red-400 transition"
          />
        </div>
      </div>

      {/* Modal for Update */}
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
