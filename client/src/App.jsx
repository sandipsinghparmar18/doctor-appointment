import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  // routes where footer/navbar should be hidden
  const hideLayoutRoutes = ["/login", "/register"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <AppRoutes />
      </main>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
