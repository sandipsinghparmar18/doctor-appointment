import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Services from "../pages/Services";
import BookingAppointment from "../pages/BookingAppointment";
import Appointments from "../pages/Appointments";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      //Public Routes
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/" element={<Home />} />
      //Protected Routes
      <Route element={<ProtectedRoute />}>
        <Route path="/book-appointment" element={<BookingAppointment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      //Fallback
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
