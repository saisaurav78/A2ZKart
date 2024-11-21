export const status = (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(400).json({ user: null });
};

export const logout = (req, res) => {
  res.clearCookie('token'); 
  return res.status(200).json({ message: 'Logged out successfully' })
};
