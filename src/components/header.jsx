import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiUserPlus } from "react-icons/fi";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-22 bg-white shadow-lg z-50 flex items-center px-4 md:px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center h-full">
        <img
          src="/FullLogo.png"
          alt="Logo"
          className="h-20 w-auto object-contain"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex justify-center items-center gap-6 md:gap-12">
        <Link
          to="/"
          className="text-lg font-semibold text-gray-700 hover:text-[#7574e6] transition-colors"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-lg font-semibold text-gray-700 hover:text-[#7574e6] transition-colors"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-lg font-semibold text-gray-700 hover:text-[#7574e6] transition-colors"
        >
          About
        </Link>
        <Link
          to="/help"
          className="text-lg font-semibold text-gray-700 hover:text-[#7574e6] transition-colors"
        >
          Help
        </Link>
      </nav>

      {/* Right Section: Cart, Login, Signup */}
      <div className="flex items-center gap-4 ml-4">
        <Link
          to="/cart"
          className="flex items-center px-3 py-2 rounded-lg hover:bg-orange-50 transition"
          title="View Cart"
        >
          <FiShoppingCart className="text-2xl text-[#360d47]" />
        </Link>
        <Link
          to="/login"
          className="flex items-center px-4 py-2 border border-[#6d447d] text-[#360d47] rounded-lg font-semibold hover:bg-orange-50 transition"
        >
          <FiUser className="mr-2" />
          Login
        </Link>
        <Link
          to="/signup"
          className="flex items-center px-4 py-2 bg-[#6d447d] text-white rounded-lg font-semibold hover:bg-[#360d47] transition"
        >
          <FiUserPlus className="mr-2" />
          Signup
        </Link>
      </div>
    </header>
  );
}

