// ./src/api.js
import axios from "axios";
import embeddedProductSchema from "../objectValidation/post/embeddedProductValidate";
import { productsWrapper } from "../objectValidation/get/productsWrapperValidate";
import { productWrapper } from "../objectValidation/get/productWrapperValidate";

const BASE_URL = "http://172.16.4.51:8080/robo-pantry";
// const BASE_URL = "http://10.0.2.2:8080/robo-pantry"; local dev url

// api calls

export const getProducts = () => {
  return axios.get(`${BASE_URL}/products`, {
    transformResponse: (res) => productsWrapper.cast(JSON.parse(res)).products,
    timeout: 5000,
  });
};

export const getProductById = (id) => {
  if (!Number.isInteger(id))
    throw new TypeError(
      `Must provide a valid int as an id! recieved value: ${id}`
    );
  const url = `${BASE_URL}/products/${id}`;
  return axios.get(url, {
    transformResponse: (res) => productWrapper.cast(JSON.parse(res)).product,
    timeout: 5000
  });
};

export const postEmbeddedProduct = (embeddedProduct) => {
  const url = `${BASE_URL}/products`;
  return axios.post(url, embeddedProductSchema.cast(embeddedProduct), {timeout: 5000});
};
