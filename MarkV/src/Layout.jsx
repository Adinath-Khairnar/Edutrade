import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { Menu, X, User } from 'lucide-react';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for custom "userLogin" event to update user state
    const handleLoginEvent = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener("userLogin", handleLoginEvent);
    return () => window.removeEventListener("userLogin", handleLoginEvent);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-gray-100 text-black shadow-md sticky top-0 z-40 font-medium">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="https://i.ibb.co/Hxj7tJz/pixelcut-exyuiport.png"
                className="mr-3 h-12"
                alt="Logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              {["/", "/Books", "/Notes", "/Question-Papers", "/Stationery", "/About", "/Contact"].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className={`hover:text-orange-600 ${location.pathname === path ? "text-orange-600" : ""}`}
                >
                  {path.replace("/", "") || "Home"}
                </Link>
              ))}

              {/* User Logged In */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="ml-4 bg-white border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
                  >
                    <User size={18} className="text-gray-600" />
                    <span>{user.full_name}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                      <Link
                        to={`/profile/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // User Not Logged In
                <Link
                  to="/login"
                  className="ml-4 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="md:hidden text-black focus:outline-none">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-3">
              {["/", "/books", "/notes", "/question-papers", "/stationery", "/about", "/contact"].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className="block hover:text-orange-600"
                  onClick={toggleMobileMenu}
                >
                  {path.replace("/", "") || "Home"}
                </Link>
              ))}
              {user ? (
                <div className="mt-2 border-t pt-2">
                  <Link to={`/profile/${user.id}`} className="block px-2 py-1 hover:text-orange-600">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-2 py-1 text-red-600 hover:text-red-800">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-2 border-t pt-2">
                  <Link to="/login" className="block px-2 py-1 hover:text-orange-600">
                    Login
                  </Link>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
