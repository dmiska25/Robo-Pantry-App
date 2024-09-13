import { array, object, number, string, mixed } from "yup";
import {
  getProductCategoryFromJson,
  getUnitOfMeasureFromJson,
} from "../../../helpers/deserializationHelpers";
import { purchase } from "./purchaseValidate";

export let productListing = object({
  id: number().required(),
  name: string().required(),
  category: object()
    .required()
    .transform((val, org) => getProductCategoryFromJson(org)),
  unitOfMeasure: object()
    .required()
    .transform((val, org) => getUnitOfMeasureFromJson(org)),
  brand: string().required(),
  productsOnHand: number().required().positive(),
  unitsPerProduct: number().required().positive(),
  barcode: number().required()
})
  .camelCase();

export let productDetails = object({
  id: number().required(),
  name: string().required(),
  category: object()
    .required()
    .transform((val, org) => getProductCategoryFromJson(org)),
  unitOfMeasure: object()
    .required()
    .transform((val, org) => getUnitOfMeasureFromJson(org)),
  brand: string().required(),
  productsOnHand: number().required().positive(),
  unitsPerProduct: number().required().positive(),
  purchases: array().required().of(purchase),
  barcode: number().required()
})
  .camelCase();
