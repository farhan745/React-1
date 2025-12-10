// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOGglP9CPvbuVuWG3gYUsndsLXAlNAG0w",
  authDomain: "vite-contact-d3cc7.firebaseapp.com",
  projectId: "vite-contact-d3cc7",
  storageBucket: "vite-contact-d3cc7.firebasestorage.app",
  messagingSenderId: "1093670514088",
  appId: "1:1093670514088:web:ab87edcd5bf17a908b419d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// GitHub provider কনফিগারেশন
githubProvider.setCustomParameters({
  allow_signup: 'false'
});

export { app, db, auth, googleProvider, githubProvider };