import { createMachine } from "xstate";

const newPurchaseMachine = createMachine({
  id: "new_purchase_form",
  initial: "new_purchase",
  states: {
    new_purchase: {
      on: {
        CLICK_EXISTING_PRODUCT: "existing_product",
        CLICK_NEW_PRODUCT: "new_product",
      },
      meta: {
        test: ({ getByTestId }) => ensureElemenets(getByTestId, [1, 5]),
      },
    },
    new_product: {
      on: {
        CLICK_SELECT_PRODUCT: "new_purchase",
        CLICK_EXISTING_PRODUCT: "existing_product",
      },
      meta: {
        test: ({ getByTestId }) =>
          ensureElemenets(getByTestId, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      },
    },
    existing_product: {
      on: {
        CLICK_SELECT_PRODUCT: "new_purchase",
        CLICK_NEW_PRODUCT: "new_product",
        CLICK_NEW_VARIANT: "new_variant",
        CLICK_EXISTING_VARIANT: "existing_variant",
      },
      meta: {
        test: ({ getByTestId }) => ensureElemenets(getByTestId, [1, 5]),
      },
    },
    new_variant: {
      on: {
        CLICK_SELECT_PRODUCT: "new_purchase",
        CLICK_NEW_PRODUCT: "new_product",
        CLICK_SELECT_VARIANT: "existing_product",
        CLICK_EXISTING_VARIANT: "existing_variant",
      },
      meta: {
        test: ({ getByTestId }) =>
          ensureElemenets(getByTestId, [1, 5, 6, 7, 8, 9, 10]),
      },
    },
    existing_variant: {
      on: {
        CLICK_SELECT_PRODUCT: "new_purchase",
        CLICK_NEW_PRODUCT: "new_product",
        CLICK_SELECT_VARIANT: "existing_product",
        CLICK_NEW_VARIANT: "new_variant",
      },
      meta: {
        test: ({ getByTestId }) => ensureElemenets(getByTestId, [1, 5, 9, 10]),
      },
    },
  },
});

const ensureElemenets = (getByTestId, elementIds) => {
  elementIds.forEach((elementId) => {
    getByTestId(elements[elementId]);
  });
};

const elements = {
  1: "productPicker",
  2: "productNameInput",
  3: "productCategoryPicker",
  4: "productUOMPicker",
  5: "productVariantPicker",
  6: "variantBrandInput",
  7: "variantUPPInput",
  8: "variantBarcodeInput",
  9: "purchaseDateSelecter",
  10: "purchaseProductsPurchasedInput",
};

export default newPurchaseMachine;
