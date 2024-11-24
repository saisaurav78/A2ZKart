import cartModel from '../models/cartModel.js'

export const getCart = async (req, res) => {
     const userId = req.user?.userId; 
    if (!userId) {
        return res.status(404).json({error:"Unable to fetch user"})
    }
    try {
        const cartItems = await cartModel.findbyId({})
    } catch (error) {
        
    }
};

export const postCart = async (req, res) => {
  const userId = req.user?.userId; // Get user ID from authenticated request
  if (!userId) {
    return res.status(400).json({ error: 'User not authenticated' });
  }

  try {
    const { cartItems, appliedDiscount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items cannot be empty' });
    }

    // Check if the user's cart already exists
    const existingCart = await cartModel.findOne({ userId });

    if (existingCart) {
      // Update the existing cart
      existingCart.cartItems = cartItems;
      existingCart.appliedDiscount = appliedDiscount;
      await existingCart.save();
      return res.status(200).json({ message: 'Cart updated successfully' });
    } else {
      const newCart = new cartModel({
        userId:userId,
        cartItems:cartItems,
        appliedDiscount:appliedDiscount,
      });
        const saved = await newCart.save();
        if(saved) console.log('saved cart')
      return res.status(201).json({ message: 'Cart created successfully' });
    }
  } catch (error) {
    console.error('Error while processing the cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

