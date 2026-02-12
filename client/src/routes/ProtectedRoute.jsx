import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  // user logged in → allow route
  if (isAuthenticated) {
    return <Outlet />;
  }

  // user not logged in → redirect
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
