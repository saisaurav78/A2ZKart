import addressModel from "../models/addressesModel.js";

export const getAddress = async (req, res) => {
  const userId = req.user?.userId; 
  if (!userId) {
    return res.status(400).json({ error: 'User ID is missing or invalid.' });
  }

  try {
    const existingAddress = await addressModel.find({ userId });
    if (existingAddress && existingAddress.length > 0) {
      return res.status(200).json({ message: existingAddress }); 
    }
    return res.status(404).json({ error: 'No existing address found. Add a new address.' });
  } catch (error) {
    console.error('Error fetching address:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the address.' });
  }
};
