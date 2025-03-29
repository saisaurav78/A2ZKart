import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import addressModel from "../models/addressesModel.js";

export const postOrder = async (req, res) => {
  try {
    const userId = req.user?.userId; 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
      }
    const { paymentMethod, order, orderTotal, address, discount } = req.body; 
       if (!order || !paymentMethod) {
         return res.status(400).json({ message: 'Order and payment method are required' });
       }
    if (address?.saveAddress) {
      const { fullname, address:addr, city, state, zipcode, country, phone } = address
      try {
        const existingAddress = await addressModel.findOne({ userId: userId });
           if (existingAddress) {
              await addressModel.updateOne(
                { userId: userId }, 
                {
                  $set: {
                    fullname:fullname,
                    address: addr,
                    city:city,
                    state:state,
                    zipcode:zipcode,
                    country:country,
                    phone:phone,
                  },
                },
              );
            } else {
              const newAddress = new addressModel({
                userId: userId,
                fullname:fullname,
                address: addr,
                city:city,
                state:state,
                zipcode:zipcode,
                country:country,
                phone:phone,
              });
              await newAddress.save();
            }
        }
       catch (error) {
        console.error('Error Updating/Saving Address', error)
        return res.status(500).json({ message: 'An error occurred while saving or updating the address' });
      }
  }
    const placedOrder = new orderModel({ userId: userId, products: order, paymentMethod: paymentMethod, orderTotal: orderTotal, discount:discount, shippingAddress: address })
    const saved= await placedOrder.save()
    if (saved) {
      await cartModel.findOneAndUpdate(
        { userId },
        { cartItems: [], appliedDiscount: null }, // Clear cart content
        { new: true },
      );
      return res.status(201).json({ message: 'Order placed successfully' });
    }
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
    res.status(200).json({message:orders})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:'An error occured in fetching orders'})
  }
}