// mocking
const productDetailsList = [
    {
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
    },
    {
        id: 8,
        name: 'Milk',
        unitsOnHand: 64.0,
        unitOfMeasure: 'oz',
        productVariants: [
            {
                id: 2,
                brand: 'Great Value',
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
                brand: 'Kemps',
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
    },
    {
        id: 9,
        name: 'White Bread',
        unitsOnHand: 44,
        unitOfMeasure: 'unit',
        productVariants: [
            {
                id: 2,
                brand: 'Great Value',
                productsOnHand: 2,
                unitsPerProduct: 22,
                purchases: [
                    {
                        id: 3,
                        purchaseDate: new Date(2021, 8, 19),
                        productsPurchased: 1
                    },
                    {
                        id: 4,
                        purchaseDate: new Date(2021, 8, 22),
                        productsPurchased: 1
                    }
                ],
                barcode: 4756456
            }
        ]
    },
    {
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
];

export const getProduct = (id) => productDetailsList.filter(product => product.id == id)[0];

const products = [
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
    },
    {
      id: 9,
      name: "Bread",
      unitsOnHand: 44.0,
      unitOfMeasure: "unit"
    },
    {
      id: 10,
      name: "Banana",
      unitsOnHand: 7.0,
      unitOfMeasure: "unit"
    }
];

export const getProducts = () => products;