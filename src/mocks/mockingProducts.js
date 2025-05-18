// src/mocks/mockingProducts.js
import Product from '../models/Product.js';
import { fakerES as faker } from '@faker-js/faker';

export const generateProducts = async (count = 20) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(8),
      price: parseFloat(faker.commerce.price({ min: 100, max: 1000 })),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      status: true
    });
  }

  const insertedProducts = await Product.insertMany(products);
  return insertedProducts;
};
