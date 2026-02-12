import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { handleLogout } from "../../utils/handleLogout";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Health<span className="text-emerald-500">Care+</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden min-[458px]:flex items-center gap-5">
          <Link to="/services" className="nav-link">
            Services
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/appointments" className="nav-link">
                My Appointments
              </Link>
              <Link to="/book-appointment" className="nav-link">
                Book
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <img
                  src={
                    userData?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="w-9 h-9 rounded-full cursor-pointer object-cover"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      User Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="min-[458px]:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="min-[458px]:hidden border-t bg-white px-4 py-3 space-y-3">
          <Link to="/services" className="mobile-link">
            Services
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/appointments" className="mobile-link">
                My Appointments
              </Link>
              <Link to="/book-appointment" className="mobile-link">
                Book
              </Link>
              <Link to="/profile" className="mobile-link">
                User Profile
              </Link>
              <button onClick={handleLogout} className="mobile-btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-btn-outline">
                Login
              </Link>
              <Link to="/register" className="mobile-btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
