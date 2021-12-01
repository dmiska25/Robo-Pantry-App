import { commerce, company, datatype, date, fake, random } from "faker";
import { belongsTo, createServer, Factory, hasMany, Model } from "miragejs";
import { getProduct, getProducts } from '../constants/mockProductData';
import { getUnitsOfMeasure } from "../constants/unitsOfMeasure";

export function startMockAPIServer({ environment = "development" } = {}) { 
    console.log("Mock API Server starting!");
    return createServer({
        environment: environment,
        namespace: "/robo-pantry",
        routes() {
            this.get("/products", () => {
                return getProducts();
            });

            this.get("/products/:id", (request) => {
                let id = request.params.id
                return getProduct(id);
            });
        },
        models: {
            product: Model.extend({
                productVarients: hasMany(),
            }),
            productVarient: Model.extend({
                purchases: hasMany(),
                product: belongsTo(),
            }),
            purchase: Model.extend({
                productVarient: belongsTo(),
            })
        },
        factories: {
            product: Factory.extend({
                name: commerce.productName(),
                unitsOnHand: datatype.number({min: 4, max: 200}),
                unitOfMeasure: random.arrayElement(Object.values(getUnitsOfMeasure())).json
            }),
            productVarient: Factory.extend({
                brand: company.companyName(),
                productsOnHand() { return Math.floor(datatype.number({min: 4, max: this.product.unitsOnHand}) /2 ) },
                unitsPerProduct() { return this.product.unitsOnHand/this.productsOnHand },
                barcode: datatype.number({min: 10000000, max: 10000000000})
            }),
            purchase: Factory.extend({
                purchaseDate: date.past(),
                productsPurchased() {
                    const purchases = this.productVarient.purchases.length;
                    const productsOnHand = this.productVarient.productsOnHand;
                    if (purchases == 1) return productsOnHand;
                    return productsOnHand/2;
                } 
            }),
        },
        seeds(server) {
            const rand = datatype.number;

            server.createList("product", 10).forEach((product) => {
                server.createList("productVarient", rand({min: 1, max: 3}), {product}).forEach((productVarient) => {
                    server.createList("purchase", rand({min: 1, max: 2}), {productVarient});
                });
            });
        }
    });
}