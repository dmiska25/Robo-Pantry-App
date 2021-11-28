// ./src/api.js
import axios from 'axios';
import { getUnitOfMeasureFromJson } from '../helpers/unitOfMeasureHelpers';

const BASE_URL = "/robo-pantry";

// api calls

export const getProducts = () => {
    return axios.get(`${BASE_URL}/products`, {
        transformResponse: (res) => stdDeserialize(res)   
    });
}

export const getProductById = (id) => {
    if (!id || !Number.isInteger(id)) throw new TypeError("Must provide a valid int as a id!");
    const url = `${BASE_URL}/products/${id}`;
    return axios.get(url, {
        transformResponse: (res) => stdDeserialize(res)
    });
};

// helper functions

const stdDeserialize = (res) => JSON.parse(res, (key, value) => parseKeyValue(key,value));

const parseKeyValue = (key, value) => {
    switch(key) {
        case 'unitOfMeasure': return getUnitOfMeasureFromJson(value);
        case 'purchaseDate': return new Date(value);
        default: return value;
    }
}

export const exportedForTesting = {
    stdDeserialize,
    parseKeyValue
};