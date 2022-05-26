import { date, object, number, string } from "yup";

let embeddedProductSchema = object({
  product: object({
    id: number(),
    product_name: string().required(),
    category: string().required(),
    unit_of_measure: string().required(),
  }).transformKeys((key) => underscore(key)),
  product_variant: object({
    id: number(),
    brand: string().required(),
    units_per_product: number().required(),
    barcode: number().required(),
  }).transformKeys((key) => underscore(key)),
  purchase: object({
    id: number(),
    purchase_date: date().required(),
    products_purchased: number().required(),
  }).transformKeys((key) => underscore(key)),
}).transformKeys((key) => underscore(key));

const underscore = (str) => {
  const regex1 = /([a-z\d])([A-Z]+)/g;
  const regex2 = /\-|\s+/g;

  return str.replace(regex1, "$1_$2").replace(regex2, "_").toLowerCase();
};

export default embeddedProductSchema;
