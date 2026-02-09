import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    `font-medium px-2 transition-colors ${
      isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-sm p-4 border-b flex justify-between items-center px-10 sticky top-0 z-50">
      {/* Logo */}
      <NavLink to="/" className="text-2xl font-black text-blue-600 tracking-tight">
        RealEstate<span className="text-gray-800">Portal</span>
      </NavLink>

      <div className="flex items-center gap-6">
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
              className="text-gray-500 hover:text-red-500 font-bold transition-colors"
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
    </nav>
  );
};

export default Navbar;
