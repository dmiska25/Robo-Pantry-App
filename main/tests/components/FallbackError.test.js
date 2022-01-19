import React from "react";
import { fireEvent, render, MouseEvent } from "@testing-library/react-native";
import FallbackError from "../../content/Components/FallbackError";

describe("FallbackError", () => {
  const mockReload = jest.fn();

  afterEach(() => {
    mockReload.mockClear();
  });

  it("should display passed message", () => {
    const { getByText } = render(
      <FallbackError error="testing" resetError={mockReload} />
    );
    const result = getByText("testing");
  });

  it("should reload on button press", () => {
    const { getByText } = render(
      <FallbackError error="testing" resetError={mockReload} />
    );
    const reloadButton = getByText("Try Again");
    fireEvent.press(reloadButton);
    expect(mockReload).toHaveBeenCalled();
  });
});
