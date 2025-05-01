import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import addressModel from "../models/addressesModel.js";
import dotenv from 'dotenv'
dotenv.config()
import  { Stripe }  from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    if (paymentMethod === 'cod') {
      const placedOrder = new orderModel({
        userId: userId,
        products: order,
        paymentMethod: paymentMethod,
        orderTotal: orderTotal,
        discount: discount,
        shippingAddress: address,
      });
      const saved = await placedOrder.save();
      if (saved) {
        await cartModel.findOneAndUpdate(
          { userId },
          { cartItems: [], appliedDiscount: null }, // Clear cart content
          { new: true },
        );
        return res.status(201).json({ message: 'Order placed successfully' });
      }
    }
   else if (paymentMethod === 'card') {
      try {
         const pendingOrder = new orderModel({
           userId: userId,
           products: order,
           paymentMethod: paymentMethod,
           orderTotal: orderTotal,
           discount: discount,
           shippingAddress: address,
         });

         const saved = await pendingOrder.save();
       
        if (saved) {

          const line_items = [];

          for (const item of order) {
            const unitAmountCents = Math.round(item.price * 100);
            const discountAmount = discount ? Math.round(unitAmountCents * (discount / 100)) : 0;
            const discountedAmount = unitAmountCents - discountAmount;
            const totalAmount = Math.round(discountedAmount); // Total amount after discount

            line_items.push({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.title,
                  images: [item.image || item.images[0]],
                },
                unit_amount: totalAmount, // Total amount after discount
              },
              quantity: item.quantity,
            });
          }

          // Add flat $5 shipping fee as separate line item
          line_items.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Shipping Fee',
              },
              unit_amount: 500, // $5.00 in cents
            },
            quantity: 1,
          });

          // Create Stripe session
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: `${process.env.FRONTEND_URI}/thankyou?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URI}/checkout`,
            client_reference_id: userId,
            metadata: {
              orderId: saved._id.toString(), 
              userId,
              orderTotal,
              discount,
              paymentMethod,
              productIds: order.map((item) => item.id).join(','),
              shippingCity: address.city,
              shippingCountry: address.country,
            },
          });

          return res.status(200).json({
            sessionId: session.id,
            url: session.url,
          });
        }
     } catch (stripeError) {
       console.error('Stripe Error:', stripeError.message);
       return res.status(500).json({ message: 'Payment setup failed', error: stripeError.message });
     }
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

export const verifyPayment = async (req, res) => {
  const { sessionId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
     const orderId = session.metadata.orderId;
     await orderModel.findByIdAndUpdate(orderId, { paymentStatus: 'success' });
      return res.status(200).json({ success: true });
    } 
    else {
      await orderModel.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Verify payment failed:', error.message);
    return res.status(500).json({ success: false });
  }
};