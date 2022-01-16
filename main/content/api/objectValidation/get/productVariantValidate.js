import { array, object, number, string } from "yup";
import { purchase } from "./purchaseValidate";

export let productVariant = object({
    id: number().required().positive(),
    brand: string().required(),
    productsOnHand: number().required().positive(),
    unitsPerProduct: number().required().positive(),
    purchases: array().required().of(purchase),
    barcode: number().required()
}).camelCase()

