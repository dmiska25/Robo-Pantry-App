import { array, object, number, string, mixed } from "yup";
import { getProductCategoryFromJson, getUnitOfMeasureFromJson } from "../../../helpers/deserializationHelpers";
import { productVariant } from "./productVariantValidate";

export let productListing = object({
    id: number().required(),
    name: string().required(),
    category: object().required().transform((val, org) => getProductCategoryFromJson(org)),
    unitsOnHand: number().required(),
    unitOfMeasure: object().required().transform((val, org) => getUnitOfMeasureFromJson(org))
}).camelCase()

export let productDetails = object({
    id: number().required(),
    name: string().required(),
    category: object().required().transform((val, org) => getProductCategoryFromJson(org)),
    unitsOnHand: number().required(),
    unitOfMeasure: object().required().transform((val, org) => getUnitOfMeasureFromJson(org)),
    productVariants: array().required().of(productVariant)
}).camelCase()