// mocking
const product = {
    id: 1,
    name: 'Root Beer',
    unitsOnHand: 64.0,
    unitOfMeasure: 'oz',
    productVariants: [
        {
            id: 2,
            brand: 'A&W',
            productsOnHand: 4,
            unitsPerProduct: 8.0,
            purchases: [
                {
                    id: 3,
                    purchaseDate: new Date(2021, 8, 19),
                    productsPurchased: 2
                },
                {
                    id: 4,
                    purchaseDate: new Date(2021, 8, 22),
                    productsPurchased: 2
                }
            ],
            barcode: 45634256
        },
        {
            id: 5,
            brand: 'Barqs',
            productsOnHand: 4,
            unitsPerProduct: 8.0,
            purchases: [
                {
                    id: 6,
                    purchaseDate: new Date(2021, 8, 19),
                    productsPurchased: 2
                },
                {
                    id: 7,
                    purchaseDate: new Date(2021, 8, 22),
                    productsPurchased: 2
                }
            ],
            barcode: 45634256
        }
    ]
};

export const getProduct = () => product;

const products = [
    {
      name: "Root Beer",
      unitsOnHand: 40.0,
      unitOfMeasure: "oz"
    },
    {
      name: "Milk",
      unitsOnHand: 64.0,
      unitOfMeasure: "oz"
    },
    {
      name: "Bread",
      unitsOnHand: 12,
      unitOfMeasure: "unit"
    },
    {
      name: "Banana",
      unitsOnHand: 6,
      unitOfMeasure: "unit"
    }
];

export const getProducts = () => products;