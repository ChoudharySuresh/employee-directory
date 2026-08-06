import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "@/pages/Notfound/NotFoundPage";
import { describe, test, expect } from "vitest";

describe("NotFoundPage component", () => {
  test("should render premium 404 elements correctly", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    // Verify error indicators
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(/the page you are looking for might have been removed/i)
    ).toBeInTheDocument();

    // Verify action navigation buttons
    const homeButton = screen.getByRole("button", { name: /back to home/i });
    expect(homeButton).toBeInTheDocument();

    const favoritesButton = screen.getByRole("button", { name: /view favorites/i });
    expect(favoritesButton).toBeInTheDocument();
  });
});
