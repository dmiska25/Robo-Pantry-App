import { render } from "@testing-library/react-native";
import React from "react";
import PurchaseListing from "../../content/Components/PurchaseListing";

describe("PurchaseListing", () => {
  const purchaseHistory = [
    {
      id: 1,
      purchaseDate: new Date("2023-09-01"),
      productsPurchased: 7,
      expiredQuantity: 2,
    },
    {
      id: 2,
      purchaseDate: new Date("2023-09-02"),
      productsPurchased: 5,
      expiredQuantity: 0,
    },
  ];

  describe("on display", () => {
    it("should render the purchase history header", () => {
      const { getByText } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      getByText("Purchase History");
    });

    it("should display purchase dates correctly", () => {
      const { getByText } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      getByText("09/01/2023");
      getByText("09/02/2023");
    });

    it("should display products purchased with remaining quantity", () => {
      const { getByText } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      getByText(/7 purchased, 5 left/);
      getByText(/5 purchased/);
    });

    it("should render correct number of non-expired icons", () => {
        const purchaseHistory = [
            {
              id: 1,
              purchaseDate: new Date("2023-09-01"),
              productsPurchased: 7,
              expiredQuantity: 2,
            },
        ];
      const { getAllByTestId } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      expect(getAllByTestId("FishIcon").length).toBe(5); // Non-expired icons for first item
    });

    it("should render correct number of expired icons", () => {
        const purchaseHistory = [
            {
              id: 1,
              purchaseDate: new Date("2023-09-01"),
              productsPurchased: 5,
              expiredQuantity: 2,
            },
        ];
      const { getAllByTestId } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      expect(getAllByTestId("FishIconExpired").length).toBe(2); // Expired icons for first item
    });

    it("should display '...' when there are more than 5 items", () => {
      const { getByText } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      getByText("...");
    });

    it("should render FlatList with correct number of items", () => {
      const { getAllByTestId } = render(
        <PurchaseListing purchaseHistory={purchaseHistory} />
      );
      expect(getAllByTestId("FlatListItem").length).toBe(2); // 2 items in the list
    });

    it("should handle empty purchase history", () => {
      const { queryByText } = render(<PurchaseListing purchaseHistory={[]} />);
      expect(queryByText("Purchase History")).toBeTruthy();
    });
  });
});
