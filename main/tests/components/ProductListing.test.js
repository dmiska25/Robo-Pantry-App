import React from "react";
import { render } from "@testing-library/react-native";
import ProductListing from "../../content/Components/ProductListing";
import * as api from '../../content/Hooks/useAPI';

const spy = jest.spyOn(api, 'useAPI');

describe("ProductListing page", () => {
    describe("when `isLoading`==true", () => {
        beforeAll(() => {spy.mockReturnValue([true, null, null])})
        afterAll(() => { spy.mockReset(); })

        it("should display loading screen", () => {
            const { getByTestId } = render(<ProductListing/>)
            results = getByTestId('loadComponent');
        })
    })

    describe("when products are recieved", () => {
        const productsMock = [
            {
              id: 1,
              name: "Root Beer",
              unitsOnHand: 64.0,
              unitOfMeasure: "oz"
            },
            {
              id: 8,
              name: "Milk",
              unitsOnHand: 64.0,
              unitOfMeasure: "oz"
            }
        ];
        beforeAll(() => {spy.mockReturnValue([false, productsMock, null])});
        afterAll(() => { spy.mockReset(); })

        it("displays 'My Pantry'", () => {
            const { getByText } = render(<ProductListing/>);
            const results = getByText('My Pantry');
        })

        it("displays correct listing information", () => {
            const { queryAllByTestId } = render(<ProductListing/>);
            const results = queryAllByTestId("listingProduct");
            
            expect(results.length).toBe(productsMock.length);
            
            // assumes product listing will be in the same order as mocked list
            results.forEach((productListing, i) => {
                expect(productListing.props.accessibilityRole).toBe("link");
                expect(productListing.props.children).toBe(productsMock[i].name);
                expect(productListing.props.href).toBe(`/Product%20Details?itemId=${productsMock[i].id}`);
            })
        })
    })

    describe("when 0 products are returned", () => {
        beforeAll(() => {spy.mockReturnValue([false, [], null])});
        afterAll(() => { spy.mockReset(); })
        it("should display no items page", () => {
            const { getByText } = render(<ProductListing/>);
            const results = getByText(/NO PRODUCTS/i);
        })
    })
})