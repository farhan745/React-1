// src/components/Signup.jsx
import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup 
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { FaGithub, FaGoogle, FaEnvelope } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Account created with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success("Account created with GitHub!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar />
      
      <div className="flex justify-center items-center pt-10">
        <div className="
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          border border-white/20
          rounded-2xl p-8
          shadow-2xl
        ">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create New Account
          </h2>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full px-4 py-3
                  bg-white/5 border border-white/20
                  rounded-xl text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  placeholder:text-white/40
                "
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3
                  bg-white/5 border border-white/20
                  rounded-xl text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  placeholder:text-white/40
                "
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3
                  bg-white/5 border border-white/20
                  rounded-xl text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  placeholder:text-white/40
                "
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                Minimum 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3
                bg-green-500 hover:bg-green-600
                text-white font-semibold
                rounded-xl
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              <FaEnvelope />
              {loading ? "Creating Account..." : "Sign Up with Email"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/60 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              className="
                w-full py-3
                flex items-center justify-center gap-3
                bg-white hover:bg-gray-100
                text-gray-800 font-semibold
                rounded-xl
                transition-all
              "
            >
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>

            <button
              onClick={handleGithubSignup}
              className="
                w-full py-3
                flex items-center justify-center gap-3
                bg-gray-800 hover:bg-gray-900
                text-white font-semibold
                rounded-xl
                transition-all
                border border-gray-700
              "
            >
              <FaGithub className="text-white" />
              Sign up with GitHub
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-white/70 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;