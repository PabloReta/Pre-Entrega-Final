// src/mocks/mockingCarts.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { fakerES as faker } from '@faker-js/faker';

export const generateCarts = async (users) => {
  const allProducts = await Product.find(); 
  if (allProducts.length === 0) {
    throw new Error('No hay productos en la base de datos');
  }

  const cartsToInsert = users.map(user => {
    const numProducts = faker.number.int({ min: 1, max: 5 });
    const products = Array.from({ length: numProducts }, () => {
      const randomProduct = faker.helpers.arrayElement(allProducts);
      return {
        product: randomProduct._id,
        quantity: faker.number.int({ min: 1, max: 3 })
      };
    });

    return {
      user: user._id,
      products
    };
  });

  await Cart.insertMany(cartsToInsert);
  return cartsToInsert;
};
