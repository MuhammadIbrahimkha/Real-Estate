import { useState } from "react";
import { register } from "../services/authService"; // We'll update the service next
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
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email might already be taken.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password (Min 8 chars, 1 Uppercase)"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-8 hover:bg-blue-700 transition-all">
          Register
        </button>
          <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;