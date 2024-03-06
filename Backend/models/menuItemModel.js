const mongoose = require("mongoose");

// Menu schema
const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    foodName: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    foodGroup: {
        type: String,
        required: true,
        default: "Misc."
    },
    spicyLevel: {
        type: Number,
        require: true,
        default: 0
    }
});


const Menu = mongoose.model("menuCollection", menuSchema);

module.exports = Menu;