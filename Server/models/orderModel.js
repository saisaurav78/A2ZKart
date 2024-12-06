import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        images: { type: [String] },
        image:{type:String},
        quantity: { type: Number, required: true },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 5,
    },
    shippingAddress: {
      fullname: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: Number, required: true },
      country: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'failed', 'success'],
      required: true,
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'cancelled', 'delivered'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
