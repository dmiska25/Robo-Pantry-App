// ./src/api.js
import axios from 'axios';
import { getProductCategoryFromJson, getUnitOfMeasureFromJson } from '../../helpers/deserializationHelpers';
import embeddedProductSchema from '../objectValidation/embeddedProductValidate';

const BASE_URL = "/robo-pantry";

// api calls

export const getProducts = () => {
    return axios.get(`${BASE_URL}/products`, {
        transformResponse: (res) => stdDeserialize(res)   
    });
}

export const getProductById = (id) => {
    if (!id || !Number.isInteger(id)) throw new TypeError(`Must provide a valid int as an id! recieved value: ${id}`);
    const url = `${BASE_URL}/products/${id}`;
    return axios.get(url, {
        transformResponse: (res) => detailsDeserialize(res)
    });
};

export const postEmbeddedProduct = (embeddedProduct) => {
    embeddedProductSchema.validateSync(embeddedProduct);
    const url = `${BASE_URL}/products`;
    return axios.post(url, embeddedProduct, {
        transformResponse: (res) => stdDeserialize(res)
    });
};

// helper functions

const stdDeserialize = (res) => {
    const {products} = JSON.parse(res, (key, value) => parseKeyValue(key,value));
    return products;
}

const detailsDeserialize = (res) => {
    const {product} = JSON.parse(res, (key, value) => parseKeyValue(key,value));
    return product;
}

const parseKeyValue = (key, value) => {
    switch(key) {
        case 'unitOfMeasure': return getUnitOfMeasureFromJson(value);
        case 'category': return getProductCategoryFromJson(value);
        case 'purchaseDate': return new Date(value);
        default: return value;
    }
}

export const exportedForTesting = {
    stdDeserialize,
    parseKeyValue
};