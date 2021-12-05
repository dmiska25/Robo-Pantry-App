import generateCalculatedMockData, { forTesting } from "../../content/mockAPI/generateCalculatedMockData";


describe("partition", () => {
    describe("with value less than partitions*precision", () => {
        it("should throw RangeError", () => {
            expect(() => {
                forTesting.partition(2, 3, 1)
            }).toThrow(RangeError);
        })
    })

    describe("with any param less than or 0", () => {
        it("should throw RangeError", () => {
            expect(() => {
                forTesting.partition(-1, 1, 1)
            }).toThrow(RangeError);

            expect(() => {
                forTesting.partition(1, -1, 1)
            }).toThrow(RangeError);

            expect(() => {
                forTesting.partition(1, 1, -1)
            }).toThrow(RangeError);
        })
    })

    describe("with partitions == 1", () => {
        it("should return array of value", () => {
            const value = 5;
            const result = forTesting.partition(value, 1, 1);

            expect(result).toStrictEqual([value]);
        })
    })

    describe("with partitions > 1", () => {
        it("should return array with length of partitions and add to value", () => {
            const value = 20;
            const partitions = 4
            const result = forTesting.partition(value, partitions, 1);

            expect(result.length).toStrictEqual(partitions);
            expect(result.reduce((a, b) => a+b, 0)).toStrictEqual(value);
        })
    })
})

describe("generateCalculatedMockData", () => {
    describe("on standard generation", () => {
        it("should return valid calculated data", () => {
            const result = generateCalculatedMockData();

            result.forEach((product) => {
                const uoh = product.unitsOnHand;
                const totalUnits = 
                    product.variantData.reduce((a, b) => a+b.unitsPerProduct*b.productsOnHand, 0);
                expect(totalUnits).toBeAround(uoh);

                product.variantData.forEach((variant) => {
                    const poh = variant.productsOnHand;
                    const totalProductsPurchased =
                        variant.productsOnHandPartitions.reduce((a,b) => a+b, 0);
                    expect(totalProductsPurchased).toBeAround(poh);
                })
            })
        })
    })
})


expect.extend({
    toBeAround(actual, expected, precision = 2) {
      const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2;
      if (pass) {
        return {
          message: () => `expected ${actual} not to be around ${expected}`,
          pass: true
        };
      } else {
        return {
          message: () => `expected ${actual} to be around ${expected}`,
          pass: false
        }
      }
    }
});