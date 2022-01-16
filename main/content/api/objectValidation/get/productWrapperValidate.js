import { object } from "yup";
import { productDetails } from "./productValidate";

export let productWrapper = object({
    product: productDetails
});