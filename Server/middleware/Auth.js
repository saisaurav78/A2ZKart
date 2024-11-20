import jwt from 'jsonwebtoken'


const Auth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
   return res.status(401).json({ message: 'not authorised' });
  }
  try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user=decoded
      next()
  } catch (error) {
      console.log(error)
      return res.status(500).json({message:"an error occured"})
  }
};

export default Auth