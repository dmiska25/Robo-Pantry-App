import { object, array } from "yup";
import { productListing } from "./productValidate";

export let productsWrapper = object({
    products: array().required().of(productListing)
})