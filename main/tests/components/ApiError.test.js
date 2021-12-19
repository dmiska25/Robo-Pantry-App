import React from 'react';
import { fireEvent, render, MouseEvent } from "@testing-library/react-native"
import ApiError from "../../content/Components/ApiError"


describe("ApiError", () => {
    const mockReload = jest.fn();

    afterEach(() => {
        mockReload.mockClear();
    })

    it("should display passed message", () => {
        const {getByText} = render(<ApiError message="testing" reload={mockReload}/>)
        const result = getByText("testing");
    })

    it("should reload on button press", () => {
        const {getByText} = render(<ApiError message="testing" reload={mockReload}/>)
        const reloadButton = getByText("Reload");
        fireEvent.press(reloadButton);
        expect(mockReload).toHaveBeenCalled();
    })
})