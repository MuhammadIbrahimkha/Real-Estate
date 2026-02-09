import axiosInstance from "../api/axiosInstance";

// 🚀 POST endpoint for Login
export const login = async (email, password) => {
    // This matches your [HttpPost("login")] in .NET
    const response = await axiosInstance.post("/auth/login", { 
        email, 
        password 
    });
    return response.data; // This will contain your 'IsSuccess' and 'Token'
};

// 🚀 POST endpoint for Register
export const register = async (userData) => {
    // This matches your [HttpPost("register")] in .NET
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
};