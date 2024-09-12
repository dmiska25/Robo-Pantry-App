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
import * as api from "../../content/api/Hooks/useAPI";
import NewPurchaseForm from "../../content/Components/NewPurchase";
import { createTestModel } from "@xstate/graph";
import newPurchaseMachine from "../xstate/machines/NewPurchase";

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

  describe("When an products error occurs", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, null, "error loading page"];
          case getProductById:
            return [false, mockTestProduct1Details, undefined];
          case postEmbeddedProduct:
            return [false, {}, undefined];
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

  describe("When a product error occurs", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, null, undefined];
          case getProductById:
            return [false, mockTestProduct1Details, "error loading page"];
          case postEmbeddedProduct:
            return [false, {}, undefined];
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

  describe("When a new purchase error occurs", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, null, undefined];
          case getProductById:
            return [false, mockTestProduct1Details, undefined];
          case postEmbeddedProduct:
            return [false, {}, "error submitting product"];
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

  describe("When navigated to from a details page", () => {
    beforeAll(() => {
      spy.mockImplementation((apiFunction) => {
        switch (apiFunction) {
          case getProducts:
            return [false, mockListingData, undefined];
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

    it("should select passed itemId for product", () => {
      const mockRoute = {
        params: {
          itemId: 1,
        },
      };
      const { getByTestId, debug } = render(
        <NewPurchaseForm route={mockRoute} />
      );

      const result = getByTestId("productPicker");
      expect(result._fiber.pendingProps.selectedIndex).toBe(2);
      // TODO: Should also check that the selecter is disabled, but not sure how to do this currently
    });
  });
  
  const newPurchaseModel = createTestModel(newPurchaseMachine);
  
  // Mapping of testId elements
  const elements = {
    1: "productPicker",
    2: "productNameInput",
    3: "productCategoryPicker",
    4: "productUOMPicker",
    6: "productBrandInput",
    7: "productUPPInput",
    8: "productBarcodeInput",
    9: "purchaseDateSelecter",
    10: "purchaseProductsPurchasedInput",
  };
  
  // Function to ensure elements exist
  const ensureElements = async (getByTestId, elementIds) => {
    for (const elementId of elementIds) {
      await getByTestId(elements[elementId]);
    }
  };
  
  describe("New Purchase Form", () => {
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

    // Test all possible paths
    newPurchaseModel.getSimplePaths().forEach((path) => {
      it(path.description, async () => {
        const screen = render(<NewPurchaseForm />);
  
        await path.test({
          // Define what each state should assert
          states: {
            new_purchase: async () => {
              // Check for specific elements in 'new_purchase' state
              await ensureElements(screen.getByTestId, [1]);
            },
            new_product: async () => {
              // Check for specific elements in 'new_product' state
              await ensureElements(screen.getByTestId, [
                1, 2, 3, 4, 6, 7, 8, 9, 10,
              ]);
            },
            existing_product: async () => {
              // Check for specific elements in 'existing_product' state
              await ensureElements(screen.getByTestId, [1, 9, 10]);
            },
          },
          // Implement the event logic as before
          events: {
            CLICK_EXISTING_PRODUCT: async () => {
              const picker = screen.getByTestId("productPicker");
              fireEvent(picker, "onValueChange", 1);
            },
            CLICK_NEW_PRODUCT: async () => {
              const picker = screen.getByTestId("productPicker");
              fireEvent(picker, "onValueChange", "new");
            },
            CLICK_SELECT_PRODUCT: async () => {
              const picker = screen.getByTestId("productPicker");
              fireEvent(picker, "onValueChange", null);
            },
          },
        });
  
        // Clean up after each test
        cleanup();
      });
    });
  });  
});
