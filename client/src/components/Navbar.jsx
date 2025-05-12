import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useaAuthStore";

function Navbar() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 bg-blue-600 text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">Request App</div>
        {user ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user.level === "admin" ? (
                <>
                  <a href="/dashboard" className="hover:text-gray-200">
                    Dashboard
                  </a>
                  <a href="/history" className="hover:text-gray-200">
                    History
                  </a>
                </>
              ) : (
                <a href="/home" className="hover:text-gray-200">
                  Home
                </a>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 hover:text-gray-200"
                >
                  <span>{user.username}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 grahover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsDrawerOpen(true)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <a href="/login" className="hover:text-gray-200">
              Login
            </a>
            <a href="/signup" className="hover:text-gray-200">
              Signup
            </a>
          </div>
        )}
      </div>
      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white w-64 h-full p-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="mb-4 text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col space-y-4">
              {user?.level === "admin" ? (
                <>
                  <a href="/dashboard" onClick={() => setIsDrawerOpen(false)}>
                    Dashboard
                  </a>
                  <a href="/history" onClick={() => setIsDrawerOpen(false)}>
                    History
                  </a>
                </>
              ) : (
                <a href="/home" onClick={() => setIsDrawerOpen(false)}>
                  Home
                </a>
              )}
              <a href="/profile" onClick={() => setIsDrawerOpen(false)}>
                Profile
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setIsDrawerOpen(false);
                }}
                className="text-left"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
