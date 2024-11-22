import addressModel from "../models/addressesModel.js";

export const postAddress = async (req, res) => {
    const { fullname, Address, city, state, zipcode, country, phone } = req.body.details 
    try {
        console.log(fullname, Address, city, state, zipcode, country, phone)
        const address = new addressModel({
        userId:req.user.userId,
       fullname: fullname,
       address: Address,
       city: city,
       state: state,
       zipcode: zipcode,
       country: country,
       phone: phone,
     });
        await address.save()
        return res.status(201).json({ message: 'Address saved successfully' })

    } catch (error) {
        console.log(error)
    return res.status(500).json({message:'An error occured in saving address'})
 }
}


export const getAddress = async (req,res) => {
    const userId = req.user.userId
    try {
        const existingAddress = await addressModel.find({ userId: userId })
        if (existingAddress) {
           return res.status(200).json({message:existingAddress})
        }
        return res.status(204).json({message:'no existing address found, Add a new address'})
        
    } catch (error) {
        return res.status(500).json({message:'An error occured'})
    }
}