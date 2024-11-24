import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Product ID
  title: { type: String, required: true }, // Product name
  image: { type: String, required: true }, // Product image URL
  price: { type: Number, required: true }, // Product price
  quantity: { type: Number, required: true }, // Quantity in the cart
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User associated with the cart
  cartItems: { type: [cartItemSchema], required: true }, // Array of cart items
  appliedDiscount: { type: Number, default: 0 }, // Discount applied to the cart
});

const cartModel = mongoose.model('Cart', cartSchema, 'cart');
export default cartModel;
