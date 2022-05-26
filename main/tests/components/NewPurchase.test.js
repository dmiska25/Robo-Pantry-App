import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import {
  getProductById,
  getProducts,
  postEmbeddedProduct,
} from "../../content/api/apiCalls/RoboPantryAPICalls";
import { getProductCategories } from "../../content/constants/productCategory";
import { getUnitsOfMeasure } from "../../content/constants/unitsOfMeasure";
import newPurchaseModel from "../xstate/models/NewPurchase";
import * as api from "../../content/api/Hooks/useAPI";
import NewPurchaseForm from "../../content/Components/NewPurchase";

const mockListingData = [
  {
    id: 1,
    name: "test product",
    category: getProductCategories().OTHER,
    unitsOnHand: 10,
    unitOfMeasure: getUnitsOfMeasure().UNIT,
  },
  {
    id: 2,
    name: "test product 2",
    category: getProductCategories().OTHER,
    unitsOnHand: 20,
    unitOfMeasure: getUnitsOfMeasure().UNIT,
  },
];

const mockTestProduct1Details = {
  id: 1,
  name: "test product",
  category: getProductCategories().OTHER,
  unitsOnHand: 10,
  unitOfMeasure: getUnitsOfMeasure().UNIT,
  productVariants: [
    {
      id: 3,
      brand: "test product variant",
      productsOnHand: 2,
      unitsPerProduct: 2,
      purchases: [
        {
          id: 7,
          purchaseDate: new Date(),
          productsPurchased: 2,
        },
      ],
      barcode: 3456346,
    },
    {
      id: 4,
      brand: "test product variant 2",
      productsOnHand: 3,
      unitsPerProduct: 2,
      purchases: [
        {
          id: 8,
          purchaseDate: new Date(),
          productsPurchased: 3,
        },
      ],
      barcode: 3456346,
    },
  ],
};

const mockTestProduct2Details = {
  id: 2,
  name: "test product 2",
  category: getProductCategories().OTHER,
  unitsOnHand: 20,
  unitOfMeasure: getUnitsOfMeasure().UNIT,
  productVariants: [
    {
      id: 5,
      brand: "test product variant 3",
      productsOnHand: 4,
      unitsPerProduct: 2,
      purchases: [
        {
          id: 9,
          purchaseDate: new Date(),
          productsPurchased: 4,
        },
      ],
      barcode: 3456346,
    },
    {
      id: 6,
      brand: "test product variant 4",
      productsOnHand: 6,
      unitsPerProduct: 2,
      purchases: [
        {
          id: 10,
          purchaseDate: new Date(),
          productsPurchased: 6,
        },
      ],
      barcode: 3456346,
    },
  ],
};

const spy = jest.spyOn(api, "useAPI");

jest.mock("@sentry/react-native", () => ({ init: () => jest.fn() }));

describe("NewPurchase page", () => {
  describe("when data is loading", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [true, null, null];
          case getProductById:
            return [false, mockTestProduct1Details, null];
          case postEmbeddedProduct:
            return [false, {}, null];
        }
      });
    });
    afterAll(() => {
      spy.mockReset();
    });

    it("displays the loading page", () => {
      const { getByTestId } = render(<NewPurchaseForm />);
      getByTestId("loadComponent");
    });
  });

  describe("When an error occurs", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, null, "error loading page"];
          case getProductById:
            return [false, mockTestProduct1Details, null];
          case postEmbeddedProduct:
            return [false, {}, null];
        }
      });
    });
    afterAll(() => {
      spy.mockReset();
    });

    it("should display error page", () => {
      const { getByTestId } = render(<NewPurchaseForm />);
      const result = getByTestId("ApiError");
    });
  });

  describe("When navigating states", () => {
    const testPlans = newPurchaseModel.getSimplePathPlans();

    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, mockListingData, null];
          case getProductById:
            return [false, mockTestProduct1Details, null];
          case postEmbeddedProduct:
            return [false, {}, null];
        }
      });
    });
    afterAll(() => {
      spy.mockReset();
    });

    testPlans.forEach((plan) => {
      describe(plan.description, () => {
        afterEach(cleanup);
        plan.paths.forEach((path) => {
          it(path.description, () => {
            const rendered = render(<NewPurchaseForm />);
            return path.test(rendered);
          });
        });
      });
    });
  });
});
