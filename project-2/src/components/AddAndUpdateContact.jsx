// src/components/AddAndUpdateContact.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";   
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().optional(),
});

const AddAndUpdateContact = ({ contact, isOpen, onClose, isUpdate }) => {
  const { currentUser } = useAuth();

  const addContact = async (contactData) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, {
        ...contactData,
        userId: currentUser.uid, // User ID যোগ করুন
        createdAt: new Date().toISOString(),
      });
      toast.success("Contact Added Successfully ✅");
      onClose();
    } catch (error) {
      toast.error("Failed to add contact ❌");
      console.log(error);
    }
  };

  const updateContact = async (contactData, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contactData);
      toast.success("Contact Updated Successfully ✅");
      onClose();
    } catch (error) {
      toast.error("Failed to update contact ❌");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          enableReinitialize
          initialValues={
            isUpdate
              ? { 
                  name: contact.name, 
                  email: contact.email,
                  phone: contact.phone || ""
                }
              : { 
                  name: "", 
                  email: "",
                  phone: ""
                }
          }
          onSubmit={async (values) => {
            if (isUpdate) {
              await updateContact(values, contact.id);
            } else {
              await addContact(values);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-white">Name</label>
                <Field 
                  name="name" 
                  className="border border-white/20 h-10 rounded-xl bg-white/5 text-white px-4" 
                />
                <div className="text-red-500 text-xs">
                  <ErrorMessage name="name" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-white">Email</label>
                <Field 
                  name="email" 
                  type="email"
                  className="border border-white/20 h-10 rounded-xl bg-white/5 text-white px-4" 
                />
                <div className="text-red-500 text-xs">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-white">Phone (Optional)</label>
                <Field 
                  name="phone" 
                  className="border border-white/20 h-10 rounded-xl bg-white/5 text-white px-4" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-xl self-end transition-colors disabled:opacity-50"
              >
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;