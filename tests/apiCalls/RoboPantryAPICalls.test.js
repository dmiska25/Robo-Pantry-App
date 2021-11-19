import { getProductById, getProducts } from "../../apiCalls/RoboPantryAPICalls";
import axios from "axios";

jest.mock("axios");

describe("getProducts", () => {
    describe("on call", () => {
        it("should return call to baseUrl/products", () => {
            getProducts();
            expect(axios.get).toHaveBeenCalledWith("/robo-pantry/products");
        })
    })
})

describe("getProductsById", () => {
    describe("with valid id", () => {
        it("should return call to baseUrl/products/:id", () => {
            getProductById(10);
            expect(axios.get).toHaveBeenCalledWith("/robo-pantry/products/10");
        })
    })

    describe("with non-integer id", () => {
        it("should throw TypeError", () => {
            expect(() => {
                getProductById("invalid id");
            }).toThrow(TypeError);
        })
    })

    describe("with no passed id", () => {
        it("should throw TypeError", () => {
            expect(() => {
                getProductById();
            }).toThrow(TypeError);
        })
    })
})