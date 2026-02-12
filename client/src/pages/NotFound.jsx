import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          404 - Page Not Found
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Extra Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
