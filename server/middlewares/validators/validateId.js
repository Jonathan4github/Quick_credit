const validId = (req, res, next) => {
  const id = Number(req.params.id);
  const isnum = /^\d+$/.test(id);
  if (isnum === false) {
    return res.status(422).send({
      status: 422,
      error: 'Invalid id'
    });
  }
  return next();
}
export default validId;
