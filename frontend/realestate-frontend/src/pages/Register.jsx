import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData);
      if (result.isSuccess) {
        alert("Registration Successful! Please Login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email might already be taken.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-3 sm:px-0">
      <form 
        onSubmit={handleRegister} 
        className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Create Account
        </h2>
        
        {error && (
          <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4 text-center">
            {error}
          </p>
        )}

        <div className="space-y-3 sm:space-y-4">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password (Min 8 chars, 1 Uppercase)"
            className="w-full border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg mt-6 sm:mt-8 hover:bg-blue-700 transition-all text-sm sm:text-base"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
