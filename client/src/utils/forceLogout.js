import { store } from "../app/store";
import { persistor } from "../app/store";
import { logout } from "../features/slices/authSlice";

export const forceLogout = async () => {
  store.dispatch(logout()); // clear redux
  await persistor.purge(); // clear redux-persist
  window.location.href = "/login";
};
