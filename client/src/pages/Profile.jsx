import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { login } from "../features/slices/authSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    age: userData?.age || "",
    height: userData?.height || "",
    weight: userData?.weight || "",
    address: userData?.address || "",
    city: userData?.city || "",
    state: userData?.state || "",
    zipcode: userData?.zipcode || "",
  });

  const fieldLabels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    age: "Age",
    height: "Height (cm)",
    weight: "Weight (kg)",
    address: "Address",
    city: "City",
    state: "State",
    zipcode: "Zip Code",
  };

  const [preview, setPreview] = useState(userData?.avatar || "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        e.preventDefault();
        setLoading(true);
        setPreview(URL.createObjectURL(file));
        const payload = new FormData();
        payload.append("avatar", file);
        const res = await axiosInstance.patch("/users/update-avatar", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(login(res.data.data));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.patch("/users/update-profile", formData);

      dispatch(login(res.data.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <div className="flex-1 p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Patient Details</h1>

        {/* Profile Image */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="cursor-pointer text-blue-600 font-medium">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-700"
              >
                {fieldLabels[field]}
              </label>

              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={fieldLabels[field]}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 btn-primary"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
