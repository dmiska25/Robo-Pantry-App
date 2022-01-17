// ./src/api.js
import axios from 'axios';
import embeddedProductSchema from '../objectValidation/post/embeddedProductValidate';
import { productsWrapper } from '../objectValidation/get/productsWrapperValidate';
import { productWrapper } from '../objectValidation/get/productWrapperValidate';

const BASE_URL = "http://172.16.4.51:8080/robo-pantry";

// api calls

export const getProducts = () => {
    return axios.get(`${BASE_URL}/products`, {
        transformResponse: (res) => productsWrapper.cast(JSON.parse(res)).products
    });
}

export const getProductById = (id) => {
    if (!id || !Number.isInteger(id)) throw new TypeError(`Must provide a valid int as an id! recieved value: ${id}`);
    const url = `${BASE_URL}/products/${id}`;
    return axios.get(url, {
        transformResponse: (res) => productWrapper.cast(JSON.parse(res)).product
    });
};

export const postEmbeddedProduct = (embeddedProduct) => {
    embeddedProductSchema.validateSync(embeddedProduct);
    const url = `${BASE_URL}/products`;
    return axios.post(url, embeddedProduct);
};