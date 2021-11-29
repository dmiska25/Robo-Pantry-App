// MockAPI.test.js
import { startMockAPIServer } from "../../content/mockAPI/MockAPI"
import axios from "axios"
import * as mockData from "../../content/constants/mockProductData";

// initiate test server
let server

beforeEach(() => {
  server = startMockAPIServer({environment: "test"});
})

afterEach(() => {
  server.shutdown();
})

// mocking the mock data :)
const productsMock = [
  {
    id: 1,
    name: "Root Beer",
    unitsOnHand: 64.0,
    unitOfMeasure: "oz"
  },
  {
    id: 8,
    name: "Milk",
    unitsOnHand: 64.0,
    unitOfMeasure: "oz"
  }
];

const productMock = {
  id: 10,
  name: 'Banana',
  unitsOnHand: 7,
  unitOfMeasure: 'unit',
  productVariants: [
    {
      id: 2,
      brand: 'Dole',
      productsOnHand: 7,
      unitsPerProduct: 1,
      purchases: [
        {
          id: 3,
          purchaseDate: new Date(2021, 8, 19),
          productsPurchased: 7
        }
      ],
      barcode: 45634256
    }
  ]
}

const productsExpected = JSON.parse(JSON.stringify(productsMock));;
const productExpected = JSON.parse(JSON.stringify(productMock));


describe("MockAPI", () => {
  it("shows products from mocking data", async () => {
    const spy = jest.spyOn(mockData, 'getProducts');
    spy.mockReturnValue(productsMock);

    let data;
    await axios
        .get("/robo-pantry/products")
        .then((res) => data = res.data)
        .catch((err) => console.log(err));
    expect(data).toEqual(productsExpected);
  })

  it("shows a products details from mocking data", async () => {
    const spy = jest.spyOn(mockData, 'getProduct');
    spy.mockReturnValue(productMock);
    
    let data;
    await axios
        .get("/robo-pantry/products/9")
        .then((res) => data = res.data)
        .catch((err) => console.log(err));
    expect(data).toEqual(productExpected);
  })
})