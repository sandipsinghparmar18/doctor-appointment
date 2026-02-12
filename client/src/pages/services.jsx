import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { Trash2, Plus, X } from "lucide-react";

const DEFAULT_IMAGE = "/defaultService.jpg";

export default function Services() {
  const { userData } = useSelector((state) => state.user);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingService, setCreatingService] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    durationInMinutes: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get("/services");
      setServices(res.data.data || []);
    } catch {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE SERVICE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    await axiosInstance.delete(`/services/${id}`);
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  /* ================= CREATE SERVICE ================= */
  const handleCreateService = async (e) => {
    e.preventDefault();
    setCreatingService(true);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) =>
        payload.append(key, formData[key]),
      );
      if (image) payload.append("image", image);

      await axiosInstance.post("/services", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        durationInMinutes: "",
      });
      setImage(null);
      setPreview("");
      fetchServices();
    } finally {
      setCreatingService(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading services…</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Medical Services</h1>

        {userData?.userType === "Admin" && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add Service
          </button>
        )}
      </div>

      {/* SERVICES GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service._id}
            className="relative rounded-2xl overflow-hidden shadow-md bg-white group"
          >
            <img
              src={service.image || DEFAULT_IMAGE}
              alt={service.name}
              className="h-48 w-full object-cover group-hover:scale-105 transition"
            />

            {/* ADMIN DELETE */}
            {userData?.userType === "Admin" && (
              <button
                onClick={() => handleDelete(service._id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {service.description || "Quality healthcare service"}
              </p>

              <div className="flex justify-between mt-4 text-sm">
                <span>⏱ {service.durationInMinutes} min</span>
                <span className="font-semibold text-blue-600">
                  ₹{service.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CREATE SERVICE MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <form
            onSubmit={handleCreateService}
            className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Create New Service</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-4 bg-white rounded-2xl">
              <div>
                <label className="label">Service Name</label>
                <input
                  className="input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Blood Test"
                  required
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  className="input resize-none h-24"
                  placeholder="Brief service description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price (₹)</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="300"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label">Duration (min)</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="15"
                    value={formData.durationInMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationInMinutes: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Service Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {preview && (
                  <img
                    src={preview}
                    className="mt-3 h-32 rounded-xl object-cover"
                  />
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingService}
                className={`btn-primary flex items-center justify-center gap-2
    ${creatingService ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
  `}
              >
                {creatingService ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Service"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
