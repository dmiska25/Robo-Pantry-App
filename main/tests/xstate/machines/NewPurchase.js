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
    },
    new_product: {
      on: {
        CLICK_SELECT_PRODUCT: "new_purchase",
        CLICK_EXISTING_PRODUCT: "existing_product",
      },
    },
    existing_product: {
      on: {
        CLICK_NEW_PRODUCT: "new_product",
        CLICK_SELECT_PRODUCT: "new_purchase",
      },
    },
  },
});

export default newPurchaseMachine;
