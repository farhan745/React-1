import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFOundContact from "./components/NotFOundContact";

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse(false);

  useEffect(() => {
    const contactsRef = collection(db, "contacts");

    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts(contactsList);
      setAllContacts(contactsList);
    });

    return () => unsubscribe();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setContacts(filtered);
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="w-full max-w-[420px]">

          <Navbar />

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

          <div className="mt-6 flex flex-col gap-3">
            {contacts.length <= 0 ? (
              <NotFOundContact />
            ) : (
              contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}
          </div>

          <AiFillPlusCircle
            onClick={() => {
              onOpen();
              toast.info("Opening add contact modal...");
            }}
            className="fixed bottom-6 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 
            text-white text-6xl cursor-pointer drop-shadow-xl 
            hover:scale-110 transition-transform hover:text-blue-300"
          />
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
