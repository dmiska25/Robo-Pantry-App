import { createServer } from "miragejs";
import { getProduct, getProducts } from '../constants/mockProductData';

export function startMockAPIServer({ environment = "development" } = {}) { 
    console.log("Mock API Server starting!");
    return createServer({
        environment: environment,
        namespace: "/robo-pantry",
        routes() {
            this.get("/products", () => {
                return getProducts();
            });

            this.get("/products/:id", (schema, request) => {
                let id = request.params.id
                return getProduct(id);
            });
        }
    });
}