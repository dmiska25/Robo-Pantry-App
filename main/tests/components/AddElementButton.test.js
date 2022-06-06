import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import AddElementButton from "../../content/Components/AddElementButton";

describe("AddElementButton", () => {
  describe("on render", () => {
    it("should display pressable and text", () => {
      const { getByTestId, getByText } = render(
        <AddElementButton location="test" navigation="mock" />
      );
      getByTestId("AddElementButton");
      getByText("+");
    });
  });
});
