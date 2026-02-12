/* ========================= src/pages/Appointments.jsx ========================= */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance.js";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  Video,
  CheckCircle,
  XCircle,
} from "lucide-react";

const DEFAULT_APPOINTMENT_IMAGE = "/AppointmentImage.avif";

export default function Appointments() {
  const { userData } = useSelector((state) => state.user);
  const userType = userData?.userType;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH APPOINTMENTS ================= */
  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get("/appointments");
      const allAppointments = res.data.data || [];

      if (userType === "Admin") {
        // Admin sees all appointments
        setAppointments(allAppointments);
      } else {
        // Patient sees only future appointments
        const now = new Date();

        const upcomingAppointments = allAppointments.filter((appt) => {
          const apptDateTime = new Date(appt.date);

          return apptDateTime >= now;
        });

        setAppointments(upcomingAppointments);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchAppointments();
    }
  }, [userData]);

  /* ================= ADMIN ACTION ================= */
  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await axiosInstance.patch(`/appointments/${appointmentId}`, {
        status,
      });

      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading appointments...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        {userType === "Admin" ? "All Appointments" : "My Appointments"}
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-40 w-full">
                <img
                  src={DEFAULT_APPOINTMENT_IMAGE}
                  alt="Appointment"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-semibold">
                  Patient: {appt.patientName}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Stethoscope size={16} />
                  <span>Dr. {appt.doctorName}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CalendarDays size={16} />
                  <span>{new Date(appt.date).toDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} />
                  <span>{appt.time}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm font-medium text-blue-600">
                    {appt.department}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        appt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : appt.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                  >
                    {appt.status}
                  </span>
                </div>

                {/* ================= ADMIN CONTROLS ================= */}
                {userType === "Admin" && appt.status === "pending" && (
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => handleStatusUpdate(appt._id, "confirmed")}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                    >
                      <CheckCircle size={16} />
                      Confirm
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(appt._id, "cancelled")}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </div>
                )}

                {/* ================= PATIENT JOIN BUTTON ================= */}
                {userType !== "Admin" && appt.status === "confirmed" && (
                  <button
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    onClick={() => alert("Video consultation coming soon 🚀")}
                  >
                    <Video size={18} />
                    Join Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
