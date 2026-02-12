import { toast } from "react-toastify";
import { persistor, store } from "../app/store.js";
import { logout } from "../features/slices/authSlice";

export const handleApiError = (err, setError, navigate) => {
  if (err.response) {
    const status = err.response.status;
    const message = err.response.data?.message || "Something went wrong";

    // 🔐 Session expired
    if (status === 401) {
      setError("Session expired. Please login again.");
      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        store.dispatch(logout());
        persistor.purge();

        if (navigate) {
          navigate("/login", { replace: true });
        } else {
          window.location.href = "/login";
        }
      }, 2500);

      return;
    }

    // ⚠️ Other backend errors (409, 400, etc.)
    setError(message);
    toast.error(message);
  } else if (err.request) {
    const msg = "🚫 No response from server. Please try again.";
    setError(msg);
    toast.error(msg);
  } else {
    const msg = err.message || "Unexpected error occurred";
    setError(msg);
    toast.error(msg);
  }
};
