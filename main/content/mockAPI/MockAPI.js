import { commerce, company, datatype, date, random } from "faker";
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
  RestSerializer,
} from "miragejs";
import { getUnitsOfMeasure } from "../constants/unitsOfMeasure";
import ApplicationSerializer from "./ApplicationSerializer";
import generateCalculatedMockData from "./generateCalculatedMockData";
import { getProductCategories } from "../constants/productCategory";

export function startMockAPIServer({ environment = "development" } = {}) {
  if (environment !== "test") console.log("Mock API Server starting!");

  return createServer({
    environment: environment,
    routes() {
      this.urlPrefix = "http://172.16.4.51:8080";
      this.namespace = "/robo-pantry";

      this.get("/products", (schema) => {
        return schema.products.all();
      });

      this.get("/products/:id", (schema, request) => {
        let id = request.params.id;
        return schema.products.findBy({ id: id });
      });

      this.post("/products", (schema, request) => {
        const { product, product_variant, purchase } = JSON.parse(
          request.requestBody
        );

        const createdProduct = schema.products.create(product);
        const createdProductVariant = schema.productVariants.create(
          Object.assign(product_variant, { product: createdProduct })
        );
        const createdPurchase = schema.purchases.create(
          Object.assign(purchase, { productVariant: createdProductVariant })
        );

        return schema.products.findBy({ id: product.id });
      });

      // pass through for sentry logging
      this.passthrough("http://172.16.4.51:19000/**");
      this.passthrough("https://o1119110.ingest.sentry.io/**");
    },
    models: {
      product: Model.extend({
        productVariants: hasMany(),
      }),
      productVariant: Model.extend({
        purchases: hasMany(),
        product: belongsTo(),
      }),
      purchase: Model.extend({
        productVariant: belongsTo(),
      }),
    },
    serializers: {
      product: ApplicationSerializer.extend({
        include: ["productVariants"],
        embed: true,
      }),
      productVariant: ApplicationSerializer.extend({
        include: ["purchases"],
        embed: true,
      }),
      application: ApplicationSerializer,
    },
    factories: {
      product: Factory.extend({
        name() {
          return commerce.productName();
        },
        category() {
          return random.arrayElement(Object.values(getProductCategories()))
            .json;
        },
        unitsOnHand: datatype.number({ min: 4, max: 200 }),
        unitOfMeasure() {
          return random.arrayElement(Object.values(getUnitsOfMeasure())).json;
        },
      }),
      productVariant: Factory.extend({
        brand() {
          return company.companyName();
        },
        productsOnHand: datatype.number({ min: 4, max: 200 }),
        unitsPerProduct: datatype.number({ min: 2, max: 10 }),
        barcode() {
          return datatype.number({ min: 10000000, max: 10000000000 });
        },
      }),
      purchase: Factory.extend({
        purchaseDate() {
          return date.past();
        },
        productsPurchased: datatype.number({ min: 2, max: 20 }),
      }),
    },
    seeds(server) {
      const productsData = generateCalculatedMockData();

      for (var i = 0; i < productsData.length; i++) {
        const productData = productsData[i];
        const variantsData = productData.variantData;
        const product = server.create("product", {
          unitsOnHand: productData.unitsOnHand,
        });
        for (var j = 0; j < variantsData.length; j++) {
          const variantData = variantsData[j];
          const purchaseData = variantData.productsOnHandPartitions;
          const variant = server.create("productVariant", {
            product: product,
            productsOnHand: variantData.productsOnHand,
            unitsPerProduct: variantData.unitsPerProduct,
          });

          for (var k = 0; k < purchaseData.length; k++) {
            server.create("purchase", {
              productVariant: variant,
              productsPurchased: purchaseData[k],
            });
          }
        }
      }
    },
  });
}
