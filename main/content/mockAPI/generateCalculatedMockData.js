import { faker } from "@faker-js/faker";

const rand = (options) => {
  return faker.number.int(options);
};

const generateCalculatedMockData = () => {
  const calculatedData = [];
  const NUMBER_OF_PRODUCTS = 20;

  for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
    const productsOnHand = rand({ min: 10, max: 300 });
    const unitsPerProduct = rand({ min: 1, max: 10 });
    const maxPurchases = Math.max(1, Math.min(3, productsOnHand));
    const numberOfPurchases = rand({ min: 1, max: maxPurchases });
    const productsOnHandPartitions = partition(productsOnHand, numberOfPurchases, 1);

    calculatedData.push({
      productsOnHand: productsOnHand,
      unitsPerProduct: unitsPerProduct,
      productsOnHandPartitions: productsOnHandPartitions,
    });
  }
  return calculatedData;
};

const partition = (value, partitions, precision = 1) => {
  if (value < partitions * precision) {
    throw new RangeError("value must be at least partitions*precision");
  }
  if (value <= 0 || partitions <= 0 || precision <= 0) {
    throw new RangeError("values must be greater than 0!");
  } else if (partitions === 1) return [value];

  const nextPartition = [
    rand({ min: 1, max: value - partitions + 1, precision: precision }),
  ];
  return nextPartition.concat(
    partition(value - nextPartition[0], partitions - 1, precision)
  );
};

export default generateCalculatedMockData;

export const forTesting = {
  partition,
};
