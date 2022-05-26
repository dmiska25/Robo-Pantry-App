import { render } from "@testing-library/react-native";
import React from "react";
import { StyleSheet } from "react-native";
import DatePickerForm from "../../content/Components/DatePickerForm";

describe("DatePickerForm", () => {
  const date = new Date();
  const style = StyleSheet.create({ test: {} });
  const setDateMock = jest.fn();

  afterEach(() => {
    setDateMock.mockClear();
  });

  describe("on display", () => {
    it("should display passed title and date", () => {
      const { getByTestId, getByText } = render(
        <DatePickerForm
          title="title"
          date={date}
          setDate={setDateMock}
          style={style.test}
          testID="DatePicker"
        />
      );
      getByTestId("DatePicker");
      getByText(`title ${date.toLocaleDateString()}`);
    });
  });
});
