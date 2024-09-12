import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import ProductDetails from "../../content/Components/ProductDetails";
import * as api from "../../content/api/Hooks/useAPI";
import { getUnitsOfMeasure } from "../../content/constants/unitsOfMeasure";
import { getProductCategories } from "../../content/constants/productCategory";

const apiSpy = jest.spyOn(api, "useAPI");
const purchaseListingMock = () => <Text>Mocked Purchases</Text>;
jest.mock("../../content/Components/PurchaseListing", () => purchaseListingMock);
jest.mock("@sentry/react-native", () => ({ init: () => jest.fn() }));

describe("ProductDetails page", () => {
  describe("when `isLoading`==true", () => {
    beforeAll(() => {
      apiSpy.mockReturnValue([true, null, null]);
    });
    afterAll(() => {
      apiSpy.mockReset();
    });

    it("should display loading screen", () => {
      const { getByTestId } = render(<ProductDetails route={{ params: {} }} />);
      results = getByTestId("loadComponent");
    });
  });

  describe("when a product is recieved", () => {
    const productMock = {
      id: 10,
      name: "Banana",
      category: getProductCategories().PRODUCE,
      unitsOnHand: 7,
      unitOfMeasure: getUnitsOfMeasure().UNIT,
      brand: "Dole",
      productsOnHand: 7,
      unitsPerProduct: 1,
      purchases: [
        {
          id: 3,
          purchaseDate: new Date(2021, 8, 19),
          productsPurchased: 7,
        },
      ],
      barcode: 45634256,
    };
    beforeAll(() => {
      apiSpy.mockReturnValue([false, productMock, null]);
    });
    afterAll(() => {
      apiSpy.mockReset();
    });
    it("should display all details correctly", () => {
      const { getByText, getByTestId } = render(
        <ProductDetails route={{ params: {} }} />
      );

      const title = getByText("Banana");
      expect(title.props.style.fontSize).toBeGreaterThan(20);

      const details = getByText("Details");
      expect(details.props.style.fontSize).toBeGreaterThan(10);
      expect(details.props.style.fontSize).toBeLessThan(30);

      const uoh = getByText(
        `Brand: ${productMock.brand}`
      );

      const onHand = getByText(`Products On Hand: ${productMock.productsOnHand}`);

      const accordion = getByText("Mocked Purchases");

      const newElementButton = getByTestId("AddElementButton");
    });
  });

  describe("When an error occurs", () => {
    beforeAll(() => {
      apiSpy.mockReturnValue([false, null, "error loading page"]);
    });
    afterAll(() => {
      apiSpy.mockReset();
    });
    it("should display error page", () => {
      const { getByTestId } = render(<ProductDetails route={{ params: {} }} />);
      const result = getByTestId("ApiError");
    });
  });
});
