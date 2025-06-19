
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiUserPlus, FiLogOut, FiSearch, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const clearSearch = () => {
    setSearchText("");
    navigate('/search'); 
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-2"> 
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-18"> 
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/FullLogo.png" 
              alt="Logo" 
              className="h-18 w-auto object-contain" 
            />
          </Link>

          <div className="hidden md:flex mx-8 flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-12 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#982fc1] focus:border-transparent shadow-sm text-lg" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {searchText && (
                  <button 
                    onClick={clearSearch}
                    className="text-gray-500 hover:text-[#982fc1] p-1"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
                <button className="text-gray-500 hover:text-[#982fc1] p-1">
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-5"> 
            <Link 
              to="/cart" 
              className="p-3 rounded-full hover:bg-gray-100 relative" 
              title="Cart"
            >
              <FiShoppingCart className="w-6 h-6 text-gray-700" /> 
              <span className="absolute -top-1 -right-1 bg-[#982fc1] text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                1
              </span>
            </Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center px-5 py-2.5 text-gray-700 hover:text-[#982fc1] transition-colors text-lg" 
                >
                  <FiLogOut className="mr-2 w-5 h-5" />
                  Logout
                </button>
                <Link 
                  to="/account" 
                  className="p-3 rounded-full hover:bg-gray-100"
                  title="Account"
                >
                  <FiUser className="w-7 h-7 text-gray-700" /> 
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center px-5 py-2.5 text-gray-700 hover:text-[#982fc1] transition-colors text-lg" 
                >
                  <FiUser className="mr-2 w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:flex items-center px-4 py-2.5 bg-[#982fc1] text-white rounded-md hover:bg-[#5a3866] transition-colors text-lg" 
                >
                  <FiUserPlus className="mr-2 w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4 px-2 mt-2"> 
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-12 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#982fc1] focus:border-transparent shadow-sm text-lg" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {searchText && (
                <button 
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-[#982fc1] p-1"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
              <button className="text-gray-500 hover:text-[#982fc1] p-1">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}