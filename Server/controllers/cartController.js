import cartModel from '../models/cartModel.js'

export const getCart = async (req, res) => {
     const userId = req.user?.userId; 
    if (!userId) {
        return res.status(404).json({error:"Unable to fetch user"})
    }
    try {
      const cartItems = await cartModel.findOne({ userId: userId })
      if (cartItems) {
        return res.status(200).json({message:cartItems})
      }
      else {
        return res.status(201).json({message:'no items found'})
      }
    } catch (error) {
        console.log(error)
    }
};

export const postCart = async (req, res) => {
  const userId = req.user?.userId; 
  if (!userId) {
    return res.status(400).json({ error: 'User not authenticated' });
  }

  try {
    const { cartItems, appliedDiscount } = req.body;
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId }, 
      { cartItems, appliedDiscount }, 
      {
        new: true, 
        upsert: true, 
        runValidators: true
      }
    );

    return res.status(200).json({
      message: 'Cart updated or created successfully'
    });
  } catch (error) {
    console.error('Error while processing the cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


