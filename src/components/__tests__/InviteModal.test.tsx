import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import InviteModal from "../InviteModal";

// Mock fetch
global.fetch = jest.fn();

describe("InviteModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(<InviteModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Request an invite")).toBeInTheDocument();
  });

  it("validates email matching", async () => {
    render(<InviteModal isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText("Email");
    const confirmEmailInput = screen.getByLabelText("Confirm email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "different@example.com" },
    });
    fireEvent.blur(confirmEmailInput);

    await waitFor(() => {
      expect(screen.getByText("Emails do not match")).toBeInTheDocument();
    });
  });

  it("handles successful submission", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<InviteModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Confirm email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByText("All done!")).toBeInTheDocument();
    });
  });

  it("handles API error", async () => {
    const errorMessage = "Email already exists";
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ errorMessage }),
    });

    render(<InviteModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "usedemail@airwallex.com" },
    });
    fireEvent.change(screen.getByLabelText("Confirm email"), {
      target: { value: "usedemail@airwallex.com" },
    });

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
