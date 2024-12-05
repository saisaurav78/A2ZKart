export const postOrder = async (req, res) => {
  try {
    const userId = req.user?.userId; 
      const { paymentMethod, order, orderTotal, address , discount} = req.body; 
      

    if (!order || !paymentMethod) {
      return res.status(400).json({ message: 'Order and payment method are required' });
    }

    console.log('User ID:', userId); 
    console.log('Discount:', discount); 
    console.log('Payment Method:', paymentMethod);
    console.log('Order:', order);
    console.log('Order Total:', orderTotal);
    console.log('Address:', address);
    
    return res.status(200).json({ message: 'Order placed successfully' }); 
  }
  catch (error) {
    console.error('Error while placing order:', error.message);
    return res.status(500).json({ message: 'An error occurred during order processing' });
  }
};
