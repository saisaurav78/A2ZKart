import userModel from "../models/userModel.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import axios from 'axios'
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

      const token = jwt.sign({ user: existingUser.user, userId:existingUser._id}, process.env.JWT_SECRET, { expiresIn: "1h" })
      
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV ==='production' })
      return res.status(200).json({message:'Login Successful'})
    }
    catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'An error occurred' });
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


export const OAuth = (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile openid',
    access_type: 'offline',
    prompt: 'consent',
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(authUrl);
};


export const OAuthCB = async (req, res) => {
  try {
    const { code } = req.query; // Get the authorization code

    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing' });
    }

    // Use URLSearchParams for the token request
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
      code: code,
    });

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token } = tokenResponse.data;

    // Fetch user details using the access token
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = userInfoResponse.data;
    let existingUser = await userModel.findOne({ googleId: userData.id })
    if (!existingUser) {
      existingUser = new userModel({ email: userData.email, googleId: userData.id, user: userData.given_name, provider: "google" })
      await existingUser.save()
    }
      const token = jwt.sign(
        { user: existingUser.user, userId: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === 'production',
          });

    res.status(200).redirect(`${process.env.FRONTEND_URI}/products`)

  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(500).json({ error: 'OAuth callback failed' });
  }
};
