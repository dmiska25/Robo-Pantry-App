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
    });
}