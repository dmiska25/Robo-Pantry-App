import { createServer } from "miragejs";
import { getProduct, getProducts } from '../constants/mockProductCall';

if (window.server) {
    server.shutdown();
}

window.server = createServer({
    routes() {
        this.get("/robo-pantry/products", () => {
            return getProducts;
        });

        this.get("/robo-pantry/products/:id", (schema, request) => {
            let id = request.params.id
            return getProduct(id);
        });
    }
});