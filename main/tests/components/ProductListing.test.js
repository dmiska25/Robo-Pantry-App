import React from "react";
import { render } from "@testing-library/react-native";
import ProductListing from "../../content/Components/ProductListing";
import * as api from '../../content/Hooks/useAPI';

describe("ProductListing page", () => {
    describe("when `isLoading`==true", () => {
        const spy = jest.spyOn(api, 'useAPI');
        spy.mockReturnValue([true, null, null]);
        const { getByTestId, debug } = render(<ProductListing/>)

        it("should display loading screen", () => {
            debug();
            results = getByTestId('loadComponent');
        })
    })

    // describe("when products are recieved", () => {
    //     // before all, render component with mocked data
    //     it("displays 'My Pantry'", () => {

    //     })

    //     it("displays correct number of listing items", () => {

    //     })

    //     describe("each listing item", () => {
    //         it("should have a link", () => {

    //         })

    //         it("should display the items name", () => {

    //         })

    //         it("should go to respective detail page on click", () => {

    //         })
    //     })
    // })
})