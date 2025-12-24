const express = require('express');
const OrdersController = require('../controllers/order.controller');
const validateId = require('../middlewares/validateId');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const OrdersRouter = express.Router();

OrdersRouter.get('/', OrdersController.getAllOrder);
OrdersRouter.post('/', verifyRefreshToken, OrdersController.createOrder);
OrdersRouter.get('/:id', verifyAccessToken, validateId, OrdersController.getOneOrder);
OrdersRouter.delete('/:id', verifyAccessToken, validateId, OrdersController.deleteOrder);
OrdersRouter.put('/:id', OrdersController.updateOrder)

module.exports = OrdersRouter;