import { date, object, number, string } from "yup";


let embeddedProductSchema = object({
    product: object({
        id: number(),
        product_name: string().required(),
        category: string().required(),
        unit_of_measure: string().required()
    }),
    product_variant: object({
        id: number(),
        brand: string().required(),
        units_per_product: number().required(),
        barcode: number().required()
    }),
    purchase: object({
        id: number(),
        purchase_date: date().required(),
        products_purchased: number().required()
    })
});

export default embeddedProductSchema;