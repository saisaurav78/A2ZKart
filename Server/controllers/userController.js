import userModel from "../models/userModel.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

export const login = async (req, res) => {
  const { email, password } = req.body
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: 'Account does not exist' });
      }
      const matched = await bcrypt.compare(password, existingUser.password);
      if (!matched) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ user: existingUser.user }, process.env.JWT_SECRET, { expiresIn: "1h" })
      
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, sameSite: 'Strict' })
        .status(200).json({ message: 'Login Successful' });

    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'An error occurred' });
    }



}


export const register = async (req, res) => {
  const {username, email, password } = req.body
        try {
          const existingUser = await userModel.findOne({$or:[{user:username}, {email:email}]})
            if (existingUser) {
              return res.status(409).json({ message: 'username or email already exists' });
            }
              const hashedPassword = await bcrypt.hash(password, 10)
              const newUser = new userModel({user:username, email: email, password: hashedPassword });
              await newUser.save();
              res.status(201).json({ message: 'Registration successful' })
        }
        catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error in registering user' });
        }

}



