const express = require("express");
const orderController = require("../controllers/orderController")


const orderRouter = express.Router();

orderRouter
.route("/submitOrder")
.post(orderController.submitOrder)

orderRouter
.route("/getOrders")
.get(orderController.getOrders)

orderRouter
.route("/deleteOrder/:id")
.delete(orderController.deleteOrder)

module.exports = orderRouter;