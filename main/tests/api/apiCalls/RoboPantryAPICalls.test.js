import axios from "axios";
import * as uom from "../../../content/helpers/unitOfMeasureHelpers";
import { getUnitsOfMeasure } from "../../../content/constants/unitsOfMeasure";
import { getProductById, getProducts, postEmbeddedProduct, exportedForTesting } from "../../../content/api/apiCalls/RoboPantryAPICalls";
import { ValidationError } from "yup";
const { parseKeyValue } = exportedForTesting;

jest.mock("axios");

describe("getProducts", () => {
    describe("on call", () => {
        it("should return call to baseUrl/products", () => {
            getProducts();
            expect(axios.get).toHaveBeenCalledWith("/robo-pantry/products", expect.objectContaining({
                transformResponse: expect.any(Function)
            }));
        })
    })
})

describe("getProductsById", () => {
    describe("with valid id", () => {
        it("should return call to baseUrl/products/:id", () => {
            getProductById(10);
            expect(axios.get).toHaveBeenCalledWith("/robo-pantry/products/10", expect.objectContaining({
                transformResponse: expect.any(Function)
            }));
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

describe("postEmbeddedProduct", () => {
    let embeddedProductMock = {
        product: {
            product_name: "Root Beer",
            category: "Beverage",
            unit_of_measure: "oz"
        },
        product_variant: {
            brand: "A&W",
            units_per_product: "8",
            barcode: 76982361
        },
        purchase: {
            purchase_date: Date(),
            products_purchased: 2
        }
    };

    describe("With valid embedded object", () => {
        it("should return created/modified object back", () => {
            postEmbeddedProduct(embeddedProductMock);
            expect(axios.post).toHaveBeenCalledWith("/robo-pantry/products", embeddedProductMock, expect.objectContaining({
                transformResponse: expect.any(Function)
            }));
        })
    })

    describe("With invalid embedded object", () => {
        it("should throw an exception", () => {
            let invalidEmbeddedProductMock = delete embeddedProductMock.product.product_name;
            expect(() => {
                postEmbeddedProduct(invalidEmbeddedProductMock);
            }).toThrow(ValidationError);
        })
    })
})

describe("parseKeyValue", () => {
    describe("with key: 'unitOfMeasure'", () => {
        it("should convert to UnitOfMeasure", () => {
            const spy = jest.spyOn(uom, 'getUnitOfMeasureFromJson');
            spy.mockReturnValue(getUnitsOfMeasure().OUNCE);

            const result = parseKeyValue('unitOfMeasure', 'oz');
            expect(spy).toHaveBeenCalledWith('oz');
            expect(result).toBe(getUnitsOfMeasure().OUNCE)
        })
    })

    describe("with key: 'purchaseDate'", () => {
        it("should convert to Date", () => {
            const testDate = new Date();
            const testDateString = testDate.toISOString();

            const result = parseKeyValue('purchaseDate', testDateString);
            expect(result.toISOString()).toBe(testDate.toISOString());
        })
    })

    describe("with any other key", () => {
        it("should return the value", () => {
            const testValue = 10;

            const result = parseKeyValue('int', testValue);
            expect(result).toBe(testValue);
        })
    })
})