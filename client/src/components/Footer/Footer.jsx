// src/components/Foter/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-blue-600">
            Health<span className="text-emerald-500">Care+</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Book appointments with trusted doctors, manage your health records,
            and get quality healthcare services — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className="hover:text-blue-400 transition"
              >
                My Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/book-appointment"
                className="hover:text-blue-400 transition"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Indore, Madhya Pradesh</li>
            <li>📞 +91 78799 56069</li>
            <li>✉️ support@healthcareplus.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HealthCare+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
