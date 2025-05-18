import { Router } from 'express'
import UserModel from '../models/User.js' 
import Cart from '../models/Cart.js';
import { generateMockUsers } from '../mocks/mockingUsers.js'
import { generateCarts } from '../mocks/mockingCarts.js';
import { generateProducts } from '../mocks/mockingProducts.js';


const router = Router()

// Swagger para documentar el endpoint mockingusers

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Obtener lista de usuarios mockeados
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios mockeados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: number
 */

// GET para solo generar y ver usuarios falsos (no persiste)
// Este endpoint genera usuarios falsos y los devuelve en la respuesta
router.get('/mockingusers', (req, res) => {
  const users = generateMockUsers(50)
  res.json({ status: 'success', users })
})

//Swagger para documentar el endpoint generateUsers
/**
 * @swagger
 * /api/mocks/generateUsers:
 *   post:
 *     summary: Generar usuarios de prueba
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Usuarios generados exitosamente
 *       400:
 *         description: Petición mal formada o datos insuficientes
 */

// POST para generar e insertar en MongoDB
// Este endpoint genera usuarios falsos y los inserta en la base de datos
router.post('/generateUsers', async (req, res) => {
  try {
    const { users = 10 } = req.body
    const mockUsers = generateMockUsers(users)
    const inserted = await UserModel.insertMany(mockUsers)

    res.json({
      status: 'success',
      message: 'Usuarios insertados correctamente',
      inserted: inserted.length,
      users: inserted
    })
  } catch (err) {
    res.status(500).json({ error: 'Error al insertar usuarios', details: err.message })
  }
  
})

// POST para generar e insertar carritos en MongoDB
// Este endpoint genera carritos para todos los usuarios existentes en la base de datos
router.post('/generateMockCarts', async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users.length) {
      return res.status(400).json({ message: 'No hay usuarios en la base de datos' });
    }

    const insertedCarts = await generateCarts(users);
    res.status(200).json({
      status: 'success',
      message: 'Carritos insertados correctamente',
      inserted: insertedCarts.length,
      carts: insertedCarts 
    });
    
  } catch (error) {
    console.error('Error al generar los carritos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET para obtener todos los carritos
// Este endpoint obtiene todos los carritos de la base de datos y los devuelve en la respuesta
router.get('/mockingcarts', async (req, res) => {
  try {
    const carts = await Cart.find().populate('user', 'first_name last_name email');
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error al obtener carritos:', error);
    res.status(500).json({ message: 'Error interno al obtener carritos' });
  }
});

// Nuevo endpoint para insertar todo
// Este endpoint genera usuarios, productos y carritos, y los inserta en la base de datos
router.post('/generateAllData', async (req, res) => {
  try {
    const { users = 10, products = 20 } = req.body;

    const mockUsers = generateMockUsers(users);
    const insertedUsers = await UserModel.insertMany(mockUsers);

    const insertedProducts = await generateProducts(products);

    const insertedCarts = await generateCarts(insertedUsers);

    res.status(200).json({
      status: 'success',
      message: 'Todos los datos mockeados generados con éxito.',
      insertedUsers: insertedUsers.length,
      insertedProducts: insertedProducts.length,
      insertedCarts: insertedCarts.length
    });
  } catch (error) {
    console.error('Error al generar datos completos:', error);
    res.status(500).json({ message: 'Error al generar los datos', error: error.message });
  }
});


// POST para generar e insertar productos falsos
// Este endpoint genera productos falsos y los inserta en la base de datos
router.post('/generateMockProducts', async (req, res) => {
  try {
    const { count = 20 } = req.body;
    const insertedProducts = await generateProducts(count);

    res.status(200).json({
      status: 'success',
      message: `${insertedProducts.length} productos insertados correctamente`,
      inserted: insertedProducts,
      products: insertedProducts
    });
  } catch (err) {
    console.error('Error al generar productos:', err);
    res.status(500).json({ error: 'Error al generar productos', details: err.message });
  }
});


export default router
