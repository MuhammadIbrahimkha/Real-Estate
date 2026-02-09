import { useState } from "react";
import { login } from "../services/authService";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const result = await login(credentials.email, credentials.password);
    
    if (result.isSuccess) {
      localStorage.setItem("token", result.token); // Store the JWT
      window.location.href = "/"; 
    }
  } catch (err) {
  console.error("Login failed:", err); // 👈 Now 'err' is being used!
  setError("Invalid email or password. Please try again.");
}
 };
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <input 
              type="email" 
              className="w-full border rounded-lg p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input 
              type="password" 
              className="w-full border rounded-lg p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-8 hover:bg-blue-700 transition-all">
          LOGIN
        </button>
        <p className="text-center text-gray-600 mt-4">
  Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Sign Up</Link>
</p>
      </form>
    </div>
  );
};

export default Login;