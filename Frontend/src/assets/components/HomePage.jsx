import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    setError("");

    try {
      const respone = await axios.post("http://localhost:3000/api/auth/login",{
        username,
        password,
      });
      if (respone.data.success){
        localStorage.setItem("token",respone.data.token);
        navigate("/dashboard")
      }
    } catch (error){
      setError("Invalid username or password");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-700 to-purple-900 relative overflow-hidden">
      {/* Glowing Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute w-[500px] h-[500px] bg-white opacity-20 blur-3xl rounded-full top-10 left-20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute w-[400px] h-[400px] bg-white opacity-10 blur-3xl rounded-full bottom-20 right-20"
      />

      {/* POS Title with Stylish Effects */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-12 text-center"
      >
        <h1 className="text-7xl font-extrabold drop-shadow-lg font-[Rajdhani] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse">
        Heaven’s Kitchen
        </h1>
        <p className="text-lg text-gray-200 mt-2 tracking-wide font-[Rajdhani] relative inline-block">
        A Taste So Divine, You’ll Keep Coming Back!
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute left-0 bottom-0 h-[2px] bg-yellow-400"
          />
        </p>
      </motion.div>

      {/* Login Button */}
      {!showForm && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowForm(true)}
          className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 font-[Rajdhani]"
        >
          Login
        </motion.button>
      )}

      {/* Glassmorphic Login Form with Stylish Font */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-80 border border-white/20"
        >
          {/* Close Button */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-300/30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-4 text-center font-[Rajdhani]">
            Login
          </h2>
{/* Error Message */}
{error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          {/* Form Fields */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 font-[Rajdhani]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 font-[Rajdhani]"
          />

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition-all font-[Rajdhani]" onClick={handleLogin}>
            Login
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
