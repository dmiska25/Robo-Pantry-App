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

    it("should pass down location and execute on press", () => {
      const navFuncMock = jest.fn();
      const navMock = {
        navigate: navFuncMock,
      };

      const { getByTestId } = render(
        <AddElementButton location="test" navigation={navMock} />
      );

      const result = getByTestId("AddElementButton");
      fireEvent.press(result);
      expect(navFuncMock).toHaveBeenCalledWith("test");
    });
  });
});
