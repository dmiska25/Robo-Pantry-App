import { fireEvent } from "@testing-library/react-native";
import { createModel } from "@xstate/test";
import newPurchaseMachine from "../machines/NewPurchase";

const newPurchaseModel = createModel(newPurchaseMachine).withEvents({
  CLICK_EXISTING_PRODUCT: ({ getByTestId }) => {
    const picker = getByTestId("productPicker");
    fireEvent(picker, "onValueChange", 1);
  },
  CLICK_NEW_PRODUCT: ({ getByTestId }) => {
    const picker = getByTestId("productPicker");
    fireEvent(picker, "onValueChange", "new");
  },
  CLICK_SELECT_PRODUCT: ({ getByTestId }) => {
    const picker = getByTestId("productPicker");
    fireEvent(picker, "onValueChange", null);
  },
  CLICK_EXISTING_VARIANT: ({ getByTestId }) => {
    const picker = getByTestId("productVariantPicker");
    fireEvent(picker, "onValueChange", 3);
  },
  CLICK_NEW_VARIANT: ({ getByTestId }) => {
    const picker = getByTestId("productVariantPicker");
    fireEvent(picker, "onValueChange", "new");
  },
  CLICK_SELECT_VARIANT: ({ getByTestId }) => {
    const picker = getByTestId("productVariantPicker");
    fireEvent(picker, "onValueChange", null);
  },
});

export default newPurchaseModel;
