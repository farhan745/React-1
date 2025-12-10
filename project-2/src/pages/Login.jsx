import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
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
            Login to Your Account
          </h2>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3
                bg-blue-500 hover:bg-blue-600
                text-white font-semibold
                rounded-xl
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/60 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="
              w-full py-3
              flex items-center justify-center gap-3
              bg-white hover:bg-gray-100
              text-gray-800 font-semibold
              rounded-xl
              transition-all
            "
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-white/70 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;