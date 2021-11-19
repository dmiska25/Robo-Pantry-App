// MockAPI.test.js
import { startMockAPIServer } from "../../mockAPI/MockAPI"
import axios from "axios"

let server

beforeEach(() => {
  server = startMockAPIServer({environment: "test"});
})

afterEach(() => {
  server.shutdown();
})

it("shows the products from our mock api server", async () => {
    let data;
    await axios
        .get("/robo-pantry/products")
        .then((res) => data = res.data)
        .catch((err) => console.log(err));
    expect(data).toEqual([{"id": 1, "name": "Root Beer", "unitOfMeasure": "oz", "unitsOnHand": 64}, {"id": 8, "name": "Milk", "unitOfMeasure": "oz", "unitsOnHand": 64}, {"id": 9, "name": "Bread", "unitOfMeasure": "unit", "unitsOnHand": 44}, {"id": 10, "name": "Banana", "unitOfMeasure": "unit", "unitsOnHand": 7}]);
})

it("shows a products details from our mock api server", async () => {
  let data;
  await axios
      .get("/robo-pantry/products/9")
      .then((res) => data = res.data)
      .catch((err) => console.log(err));
  expect(data).toEqual({"id": 9, "name": "White Bread", "productVariants": [{"barcode": 4756456, "brand": "Great Value", "id": 2, "productsOnHand": 2, "purchases": [{"id": 3, "productsPurchased": 1, "purchaseDate": "2021-09-19T05:00:00.000Z"}, {"id": 4, "productsPurchased": 1, "purchaseDate": "2021-09-22T05:00:00.000Z"}], "unitsPerProduct": 22}], "unitOfMeasure": "unit", "unitsOnHand": 44});
})