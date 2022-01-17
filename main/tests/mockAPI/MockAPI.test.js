// MockAPI.test.js
import { startMockAPIServer } from "../../content/mockAPI/MockAPI"
import axios from "axios"

// initiate test server
let server;

beforeEach(() => {
  server = startMockAPIServer({environment: "test"});
})

afterEach(() => {
  server.shutdown();
})
describe("MockAPI", () => {
  it("shows products from mocking data", async () => {
    server.create("product", {id:1, unitsOnHand: 10});
    server.create("product", {id:2, unitsOnHand: 12});

    var data;
    await axios
        .get("http://172.16.4.51:8080/robo-pantry/products")
        .then((res) => data = res.data.products)
        .catch((err) => console.log(err));
    expect(data.length).toEqual(2);
    expect(data.filter(e => e.id === 1).length).toEqual(1);
    expect(data.filter(e => e.id === 2).length).toEqual(1);
  })

  it("shows a products details from mocking data", async () => {
    const product = server.create("product", {id:1, unitsOnHand: 10});
    const variant = server.create("productVariant", {id: 2, product: product});
    const purchase = server.create("purchase", {id:3, productVariant: variant});
    
    var data;
    await axios
        .get("http://172.16.4.51:8080/robo-pantry/products/1")
        .then((res) => data = res.data.product)
        .catch((err) => console.log(err));
       
    expect(data.id).toEqual(1);
    expect(data.product_variants[0].id).toEqual(2);
    expect(data.product_variants[0].purchases[0].id).toEqual(3);
  })

  it("creates a product and its children on a request", async () => {
    var data;

    // reform mock data to request data
    var mockRequest = {
      product: {id:'1'},
      product_variant: {id:'2'},
      purchase: {id:'3'}
    }

    await axios
      .post("http://172.16.4.51:8080/robo-pantry/products", mockRequest)
      .then((res) => data = res.data.product)
      .catch((err) => console.log(err));

      expect(data.id).toEqual(1);
      expect(data.product_variants[0].id).toEqual(2);
      expect(data.product_variants[0].purchases[0].id).toEqual(3);
  })
})