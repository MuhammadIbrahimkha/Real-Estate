import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    `font-medium px-2 py-1 transition-colors ${
      isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-black text-blue-600 tracking-tight">
          RealEstate<span className="text-gray-800">Portal</span>
        </NavLink>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Links */}
        <div
          className={`flex-1 justify-end items-center gap-6 sm:flex ${
            isMenuOpen ? "flex flex-col mt-4 sm:mt-0 sm:flex-row" : "hidden sm:flex"
          }`}
        >
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {token ? (
            <>
              <NavLink to="/my-properties" className={linkClass}>
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 font-bold transition-colors py-1 px-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`
                }
              >
                Join as Agent
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
