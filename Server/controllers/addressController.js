import addressModel from "../models/addressesModel.js";

export const postAddress = async (req, res) => {
  const userId = req.user.userId;
  const { fullname, address, city, state, zipcode, country, phone } = req.body.details;
  
  try {
    const existingAddress = await addressModel.findOne({ userId: userId });

    if (existingAddress) {
      const updatedAddress = await addressModel.updateOne(
        { userId: userId }, 
        {
          $set: {
            fullname:fullname,
            address: address,
            city:city,
            state:state,
            zipcode:zipcode,
            country:country,
            phone:phone,
          },
        },
      );
      return res.status(200).json({ message: 'Address updated successfully' });
    } else {
      const newAddress = new addressModel({
        userId: userId,
        fullname:fullname,
        address: address,
        city:city,
        state:state,
        zipcode:zipcode,
        country:country,
        phone:phone,
      });
      await newAddress.save();
      return res.status(201).json({ message: 'Address saved successfully' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'An error occurred while saving or updating the address' });
  }
};

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
