import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import Home from "../pages/Home.jsx";
import Services from "../pages/services.jsx";
import BookingAppointment from "../pages/BookingAppointment.jsx";
import Appointments from "../pages/Appointments.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";

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
