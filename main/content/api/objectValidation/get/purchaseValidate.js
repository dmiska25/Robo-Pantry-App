import { date, object, number } from "yup";

export let purchase = object({
    id: number().required().positive(),
    purchaseDate: date().required(),
    productsPurchased: number().required().positive()
}).camelCase()