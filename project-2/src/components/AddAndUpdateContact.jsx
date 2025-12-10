import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";   
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),  // ✅ Email key consistent
});

const AddAndUpdateContact = ({ contact, isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact Added Successfully ✅");
      onClose();
    } catch (error) {
      toast.error("Failed to add contact ❌");
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
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
              ? { name: contact.name, Email: contact.Email }
              : { name: "", Email: "" }
          }
          onSubmit={async (values) => {
            isUpdate
              ? await updateContact(values, contact.id)
              : await addContact(values);
            onClose();
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10 rounded-3xl" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Email">Email</label>
              <Field name="Email" className="border h-10 rounded-3xl" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="Email" />   {/* ✅ নাম ঠিক করা হলো */}
              </div>
            </div>

            <button type="submit" className="bg-orange-400 px-3 py-1.5 border self-end">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
