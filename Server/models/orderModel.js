import mongoose from 'mongoose'
const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true
    },
    products: [{
        productId: { type: mongoose.Schema.ObjectId, requiredLtrue },
        productname: { type: String, required: true },
        quantity: { type: Number, required: true },
        price:{type:Number, required:true}
    }],
    paymentMethod: {
        type: String,
        required:true
    },
    paymentStatus: {
        type: String,
        enum:['pending','failed', 'success'],
        required:true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered'],
        default:'pending',
        required:true
    },
},
    {
        timestamps:true
    }
)

const orderModel = mongoose.model('Order', orderSchema, 'orders')
export default orderModel;