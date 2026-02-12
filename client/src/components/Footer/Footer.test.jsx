import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer Component", () => {
  const renderFooter = () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  };

  test("renders brand name correctly", () => {
    renderFooter();

    const brandHeading = screen.getByRole("heading", { level: 2 });
    expect(brandHeading).toHaveTextContent("HealthCare+");
  });

  test("renders footer description", () => {
    renderFooter();

    expect(
      screen.getByText(/Book appointments with trusted doctors/i),
    ).toBeInTheDocument();
  });

  test("renders all quick navigation links with correct paths", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /Services/i })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(
      screen.getByRole("link", { name: /My Appointments/i }),
    ).toHaveAttribute("href", "/appointments");
    expect(
      screen.getByRole("link", { name: /Book Appointment/i }),
    ).toHaveAttribute("href", "/book-appointment");
  });

  test("renders support section items", () => {
    renderFooter();

    expect(screen.getByText(/Help Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms & Conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  test("renders contact information", () => {
    renderFooter();

    expect(screen.getByText(/Indore, Madhya Pradesh/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 78799 56069/i)).toBeInTheDocument();
    expect(screen.getByText(/support@healthcareplus.com/i)).toBeInTheDocument();
  });

  test("renders current year dynamically", () => {
    renderFooter();

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
