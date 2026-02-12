import axiosInstance from "../api/axiosInstance";
import { store, persistor } from "../app/store";
import { logout } from "../features/slices/authSlice";

export const handleLogout = async () => {
  try {
    await axiosInstance.post("/users/logout");
  } catch (_) {
    // ignore backend error
  } finally {
    store.dispatch(logout());
    await persistor.purge();
    window.location.href = "/login";
  }
};
