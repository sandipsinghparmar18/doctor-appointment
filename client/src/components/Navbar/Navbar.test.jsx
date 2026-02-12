import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Navbar from "./Navbar";

// Mock redux
vi.mock("react-redux", () => ({
  useSelector: vi.fn(() => ({
    isAuthenticated: false,
    userData: null,
  })),
}));

// Mock logout
vi.mock("../../utils/handleLogout", () => ({
  handleLogout: vi.fn(),
}));

describe("Navbar Basic Test", () => {
  test("renders logo text", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Health/i)).toBeInTheDocument();
    expect(screen.getByText(/Care\+/i)).toBeInTheDocument();
  });

  test("shows login and register when not authenticated", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
