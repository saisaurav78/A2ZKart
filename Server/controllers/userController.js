import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const login = async (req,res) => {
    const {email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            bcrypt.compare(password, user.password).then(() => {
                res.status(200).json({message:'user matched'})
            }).catch((bcrpyterr) => {
                console.error(bcrpyterr)
                res.status(401).send({message:'Invalid user details'})
            })

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'an error occured'})
    }
}


export const register = async (req, res) => {
    const { email, password } = req.body

        try {
          const user = await userModel.findOne({ email: email });
          if (user.email === email) {
            res.status(400).json({message:'email already exists'})
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ email: email, password: hashedPassword });
            await newUser.save();
            res.status(200).json({ message: 'Registration successful' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error in registering user' });
        }

}



