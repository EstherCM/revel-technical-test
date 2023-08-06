const validCreateProductEvent = (req, res, next) => {
  const { body: { name, description, category, price } } = req;

  if (!name || !description || !category || !price) {
    return next(createError(400, 'Bad Request: Some properties are missing'));
  }

  next();
};

module.exports = {
  validCreateProductEvent
}