// ./src/api.js
import axios from 'axios';

const BASE_URL = "/robo-pantry";

export const getProducts = () => axios.get(`${BASE_URL}/products`);

export const getProductById = (id) => {
    if (!id || !Number.isInteger(id)) throw new Error("Must provide a valid int as a id!");
    const url = `${BASE_URL}/products/${id}`;
    return axios.get(url);
};