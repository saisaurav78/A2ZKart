export const status = (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.user) {
    return res.status(200).json({ user: req.user });
  }

  return res.status(400).json({ user: null });
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
