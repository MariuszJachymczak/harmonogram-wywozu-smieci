import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WasteDisposal from "../WasteDisposal";

describe("WasteDisposal", () => {
  it("renders without crashing", () => {
    render(<WasteDisposal />);
  });

  it('initially sets the selected city to "Wybierz Miasto"', () => {
    const { getByTestId } = render(<WasteDisposal />);
    const selectedCityElement = getByTestId("selected-city");
    expect(selectedCityElement.textContent).toBe("Wybierz Miasto");
  });

  it("toggles the modal when toggleModal is called", async () => {
    const { getByTestId, queryByTestId } = render(<WasteDisposal />);

    const toggleButton = getByTestId("toggle-button");
    const modalElement = queryByTestId("modal");
    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(modalElement).toBeInTheDocument();
  });
});
