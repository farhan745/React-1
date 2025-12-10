// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ নতুন

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOGglP9CPvbuVuWG3gYUsndsLXAlNAG0w",
  authDomain: "vite-contact-d3cc7.firebaseapp.com",
  projectId: "vite-contact-d3cc7",
  storageBucket: "vite-contact-d3cc7.firebasestorage.app",
  messagingSenderId: "1093670514088",
  appId: "1:1093670514088:web:ab87edcd5bf17a908b419d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider(); 