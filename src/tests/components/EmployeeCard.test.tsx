import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmployeeCard from "@/components/employee/EmployeeCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Employee } from "@/types/employee";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useFavorites hook
vi.mock("@/hooks/useFavorites", () => ({
  useFavorites: vi.fn(),
}));

const mockEmployee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  age: 28,
  gender: "male",
  email: "john.doe@example.com",
  phone: "+1234567890",
  image: "https://example.com/john.jpg",
  company: {
    department: "Engineering",
    name: "Acme Corp",
    title: "Software Engineer",
  },
  address: {
    city: "San Francisco",
    country: "United States",
  },
} as unknown as Employee;

describe("EmployeeCard component", () => {
  const mockToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFavorites as any).mockReturnValue({
      isFavorite: () => false,
      toggleFavorite: mockToggleFavorite,
    });
  });

  test("should render employee card details correctly", () => {
    render(
      <BrowserRouter>
        <EmployeeCard employee={mockEmployee} />
      </BrowserRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Engineering · 28 yrs")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("+1234567890")).toBeInTheDocument();
    expect(screen.getByText("San Francisco, United States")).toBeInTheDocument();
    
    const img = screen.getByAltText("John Doe");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/john.jpg");
  });

  test("should toggle favorite when favorite button is clicked", () => {
    render(
      <BrowserRouter>
        <EmployeeCard employee={mockEmployee} />
      </BrowserRouter>
    );

    const favoriteButton = screen.getByRole("button", { name: "Toggle favorite" });
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });

  test("should navigate to employee details page when card is clicked", () => {
    render(
      <BrowserRouter>
        <EmployeeCard employee={mockEmployee} />
      </BrowserRouter>
    );

    // Clicking the card itself should trigger navigation
    const cardTitle = screen.getByText("John Doe");
    fireEvent.click(cardTitle);

    expect(mockNavigate).toHaveBeenCalledWith("/employee/1");
  });
});
