
const isAdmin = (req, res, next) => {

  if (req.user.rows[0].isadmin === false) {
    return res.status(403).json({
      status: 'Failed',
      error: 'Access denied admin only'
    })
  };
  return next();
}

export default isAdmin;
