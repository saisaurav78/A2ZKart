import orderModel from "../models/orderModel.js";

export const postOrder = async (req, res) => {
  try {
    const userId = req.user?.userId; 
      const { paymentMethod, order, orderTotal, address , discount} = req.body; 
      

    if (!order || !paymentMethod) {
      return res.status(400).json({ message: 'Order and payment method are required' });
    }

    const placedOrder = new orderModel({ userId: userId, products: order, paymentMethod: paymentMethod, orderTotal: orderTotal, discount:discount, shippingAddress: address })
    const saved= await placedOrder.save()
    console.log(saved)
    if (saved) return res.status(200).json({ message: 'Order placed successfully' }); 
  }
  catch (error) {
    console.error('Error while placing order:', error.message);
    return res.status(500).json({ message: 'An error occurred during order processing' });
  }
};


export const getOrder = async (req,res) => {
  try {
    const userId = req.user?.userId; 
    const orders = await orderModel.find({ userId: userId });
    console.log(orders)
    res.status(200).json({message:orders})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:'An error occured in fetching orders'})
  }
}