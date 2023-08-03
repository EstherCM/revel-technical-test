const validCreateProductEvent = (req, res, next) => {
  const { body: { name, description, category, price } } = req;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  next();
};

module.exports = {
  validCreateProductEvent
}