import jwt from 'jsonwebtoken'

const Auth = async (req, res, next) => {
  const token = req.cookies?.token
  if (!token) {
   return res.status(401).json({ message: 'not authorised' });
  }
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded
      next()
  } catch (error) {
      return res.status(401).json({message:"Invalid or Expired Token"})
  }
};

export default Auth