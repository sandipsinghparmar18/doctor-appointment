import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome{userData?.name ? `, ${userData.name}` : ""} 👋
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Book appointments, manage schedules, and access healthcare services
            seamlessly.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/book-appointment"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Book Appointment
            </Link>

            <Link
              to="/appointments"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              View Appointments
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "General Consultation",
                desc: "Expert doctors for everyday health concerns.",
              },
              {
                title: "Specialist Care",
                desc: "Access top specialists across multiple domains.",
              },
              {
                title: "Online Appointments",
                desc: "Book and manage appointments anytime, anywhere.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="text-blue-600 font-semibold hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-blue-600">10k+</h3>
              <p className="text-gray-600 mt-2">Patients Served</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600">100+</h3>
              <p className="text-gray-600 mt-2">Expert Doctors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
              <p className="text-gray-600 mt-2">Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
