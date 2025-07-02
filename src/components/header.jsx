import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiUserPlus, FiLogOut, FiSearch, FiX, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, navigate]);

  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/');
    toast.success("Logged out successfully");
  }
};


  const clearSearch = () => {
    setSearchText("");
    navigate('/search'); 
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mx-2 md:mx-0">
            <img 
              src="/FullLogo.png" 
              alt="Logo" 
              className="h-16 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex mx-4 flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {searchText && (
                  <button 
                    onClick={clearSearch}
                    className="text-gray-500 hover:text-purple-600 p-1"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
                <button className="text-gray-500 hover:text-purple-600 p-1">
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 relative" 
              title="Cart"
            >
              <FiShoppingCart className="w-5 h-5 text-gray-700" /> 
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 text-gray-700 hover:text-purple-600 transition-colors text-sm"
                >
                  <FiLogOut className="mr-1 w-4 h-4" />
                  Logout
                </button>
                <Link 
                  to="/account" 
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Account"
                >
                  <FiUser className="w-5 h-5 text-gray-700" /> 
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-1.5 text-gray-700 hover:text-purple-600 transition-colors text-sm"
                >
                  <FiUser className="mr-1 w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-3 py-1.5 text-gray-700 hover:text-purple-600 transition-colors text-sm"
                >
                  <FiUserPlus className="mr-1 w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Cart Icon - Visible only on mobile */}
          <Link 
            to="/cart" 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 relative ml-auto" 
            title="Cart"
          >
            <FiShoppingCart className="w-5 h-5 text-gray-700" /> 
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Search - Hidden on desktop */}
        <div className="md:hidden pb-3 px-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {searchText && (
                <button 
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-purple-600 p-1"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
              <button className="text-gray-500 hover:text-purple-600 p-1">
                <FiSearch className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Only shows on mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/account"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="mr-2 w-5 h-5" />
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors text-left"
                >
                  <FiLogOut className="mr-2 w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 text-gray-700  hover:text-purple-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="mr-2 w-5 h-5" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-3 py-2  text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUserPlus className="mr-2 w-5 h-5" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}