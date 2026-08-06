import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from "@/components/common/PaginationComponent";
import { vi, describe, test, expect } from "vitest";

describe("PaginationComponent", () => {
  test("should render nothing if totalPages is 1 or less", () => {
    const { container } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("should render correct active and total pages", () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={4}
        onPageChange={() => {}}
      />
    );

    // Page 2 is current
    const page2Button = screen.getByRole("button", { name: "2" });
    expect(page2Button).toBeInTheDocument();
    expect(page2Button).toHaveAttribute("aria-current", "page");

    // Total page number link exists
    const lastPageButton = screen.getByRole("button", { name: "4" });
    expect(lastPageButton).toBeInTheDocument();
  });

  test("should trigger onPageChange when clicking a page number", () => {
    const mockOnPageChange = vi.fn();
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const page4Button = screen.getByRole("button", { name: "4" });
    fireEvent.click(page4Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test("should trigger onPageChange when clicking next button", () => {
    const mockOnPageChange = vi.fn();
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("should trigger onPageChange when clicking previous button", () => {
    const mockOnPageChange = vi.fn();
    render(
      <PaginationComponent
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: "Go to previous page" });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("should disable previous button on first page", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
      />
    );

    const prevButton = screen.getByRole("button", { name: "Go to previous page" });
    expect(prevButton).toHaveClass("pointer-events-none");
  });

  test("should disable next button on last page", () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={5}
        onPageChange={() => {}}
      />
    );

    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    expect(nextButton).toHaveClass("pointer-events-none");
  });
});
