
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Access Denied'
    })
  };
  return next();
}

export default isAdmin;
