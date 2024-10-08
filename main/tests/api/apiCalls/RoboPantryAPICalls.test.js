import axios from "axios";
import {
  getProductById,
  getProducts,
  postEmbeddedProduct,
} from "../../../content/api/apiCalls/RoboPantryAPICalls";
import { ValidationError } from "yup";

jest.mock("axios");

describe("getProducts", () => {
  describe("on call", () => {
    it("should return call to baseUrl/products", () => {
      getProducts();
      expect(axios.get).toHaveBeenCalledWith(
        "http://172.16.4.51:8080/robo-pantry/products",
        expect.objectContaining({
          transformResponse: expect.any(Function),
          timeout: 5000
        })
      );
    });
  });
});

describe("getProductsById", () => {
  describe("with valid id", () => {
    it("should return call to baseUrl/products/:id", () => {
      getProductById(10);
      expect(axios.get).toHaveBeenCalledWith(
        "http://172.16.4.51:8080/robo-pantry/products/10",
        expect.objectContaining({
          transformResponse: expect.any(Function),
          timeout: 5000
        })
      );
    });
  });

  describe("with value 0", () => {
    it("should return call to baseUrl/products/:id", () => {
      getProductById(0);
      expect(axios.get).toHaveBeenCalledWith(
        "http://172.16.4.51:8080/robo-pantry/products/0",
        expect.objectContaining({
          transformResponse: expect.any(Function),
          timeout: 5000
        })
      );
    });
  });

  describe("with non-integer id", () => {
    it("should throw TypeError", () => {
      expect(() => {
        getProductById("invalid id");
      }).toThrow(TypeError);
    });
  });

  describe("with no passed id", () => {
    it("should throw TypeError", () => {
      expect(() => {
        getProductById();
      }).toThrow(TypeError);
    });
  });
});

describe("postEmbeddedProduct", () => {
  let embeddedProductMock = {
    product: {
      name: "Root Beer",
      category: "Beverage",
      unit_of_measure: "oz",
      brand: "A&W",
      units_per_product: 8,
      barcode: 76982361,
    },
    purchase: {
      purchase_date: new Date(),
      products_purchased: 2,
    },
  };

  describe("With valid embedded object", () => {
    it("should return created/modified object back", () => {
      postEmbeddedProduct(embeddedProductMock);
      expect(axios.post).toHaveBeenCalledWith(
        "http://172.16.4.51:8080/robo-pantry/products",
        embeddedProductMock,
        expect.objectContaining({
          timeout: 5000
        })
      );
    });
  });

  describe("With invalid embedded object", () => {
    it("should throw an exception", () => {
      let invalidEmbeddedProductMock =
        delete embeddedProductMock.product.product_name;
      expect(() => {
        postEmbeddedProduct(invalidEmbeddedProductMock);
      }).toThrow(TypeError);
    });
  });
});
