// src/components/ContactsDashboard.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import ContactCard from "./ContactCard";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import NotFOundContact from "./NotFOundContact";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ContactsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const contactsRef = collection(db, "contacts");
    // শুধুমাত্র current user এর contacts fetch করুন
    const userContactsQuery = query(contactsRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(userContactsQuery, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts(contactsList);
      setAllContacts(contactsList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setContacts(filtered);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-[420px]">
        {/* Updated Navbar with user info and logout */}
        <Navbar />

        {/* User Info Section */}
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {currentUser.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <p className="text-white font-semibold">
                  {currentUser.displayName || 'User'}
                </p>
                <p className="text-white/70 text-sm">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white rounded-xl transition-all border border-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <FiSearch className="text-gray-300 text-xl absolute left-4" />
          <input
            onChange={filterContacts}
            type="text"
            placeholder="Search contacts..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/10 text-white 
            backdrop-blur-md border border-white/20 
            placeholder-gray-300 shadow-md 
            focus:ring-2 focus:ring-white/40 focus:outline-none transition-all"
          />
        </div>

        {/* Contacts List */}
        <div className="mt-6 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFOundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>

        {/* Add Contact Button */}
        <AiFillPlusCircle
          onClick={onOpen}
          className="fixed bottom-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 
          text-white text-6xl cursor-pointer drop-shadow-xl 
          hover:scale-110 transition-transform hover:text-blue-300"
        />
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default ContactsDashboard;