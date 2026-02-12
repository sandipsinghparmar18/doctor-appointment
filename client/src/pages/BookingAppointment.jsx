import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function BookingAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    date: "",
    time: "",
    comments: "",
    report: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "report") {
      setFormData((prev) => ({
        ...prev,
        report: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("doctorName", formData.doctorName);
      payload.append("department", formData.department);
      payload.append("date", formData.date);
      payload.append("time", formData.time);
      payload.append("comments", formData.comments);

      if (formData.report) {
        payload.append("report", formData.report);
      }

      await axiosInstance.post("/appointments", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/appointments");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Book Appointment
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="doctorName"
                className="block text-sm font-medium mb-1"
              >
                Doctor Name
              </label>
              <input
                id="doctorName"
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Dr. Rahul Sharma"
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium mb-1"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="General">General Physician</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Time
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-medium mb-1"
            >
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Describe symptoms or notes"
            />
          </div>

          <div>
            <label htmlFor="report" className="block text-sm font-medium mb-1">
              Upload Report (Image / PDF)
            </label>
            <input
              id="report"
              type="file"
              name="report"
              accept="image/*,.pdf"
              onChange={handleChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Only one file allowed</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
