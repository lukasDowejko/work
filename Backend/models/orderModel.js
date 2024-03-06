const mongoose = require("mongoose");

// Order schema
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    userName: {
        type: String
    },
    filteredCartItems: {
        type: Object,
        required: [true, "Must have an menu item"],
    },
    totalAmount: {
        type: String,
    },
    delivery: {
        type: Boolean
    },
    address : {
        type: String
    },
});

const Order = mongoose.model("orderCollection", orderSchema);

module.exports = Order;