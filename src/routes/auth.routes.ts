import { Router } from 'express';
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser, deleteUser } from '../controllers/auth.controller';
import { createOrder, getAllOrders, markOrderAsPaid, deleteOrder } from '../controllers/order.controller';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

// Rutas de autenticación
router.post('/login', login);
router.get('/token-time', getTimeToken);
router.patch('/token-time/:userId', updateToken);
router.get('/users', getAllUsers);
router.post('/create-user', saveUser);
router.patch('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);

// Rutas de orden
router.post('/create-order', createOrder);
router.get('/orders', getAllOrders);
router.patch('/update-order/:id', markOrderAsPaid);
router.delete('/delete-order/:id', deleteOrder);

// Rutas de producto
router.post('/create-product', createProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.patch('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;
