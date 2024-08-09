import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import ConfirmationDelete from "@/components/Modals/ConfirmationDelete";

describe("ConfirmationDelete", () => {
  const props = {
    message: "Are you sure you want to delete this item?",
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    isOpen: true
  };

  it("should not render the modal when isOpen is false", () => {
    render(<ConfirmationDelete {...props} isOpen={false} />);
    expect(screen.queryByText(props.message)).not.toBeInTheDocument();
  });

  it("should render the modal with the correct message when isOpen is true", () => {
    render(<ConfirmationDelete {...props} />);
    expect(screen.getByText(props.message)).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    render(<ConfirmationDelete {...props} />);
    fireEvent.click(screen.getByText("Close modal")); // Usando el texto alternativo del botón para simular clic
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should call onConfirm when the confirm button is clicked", () => {
    render(<ConfirmationDelete {...props} />);
    fireEvent.click(screen.getByText("Yes, I'm sure"));
    expect(props.onConfirm).toHaveBeenCalled();
  });

  it("should call onClose when the cancel button is clicked", () => {
    render(<ConfirmationDelete {...props} />);
    fireEvent.click(screen.getByText("No, cancel"));
    expect(props.onClose).toHaveBeenCalled();
  });
});
