require('dotenv').config();
require('./database');

const express = require('express');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const createError = require('http-errors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);
app.use('/api/v1', productRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Not Found');
  }

  data.message = error.message;

  res.status(error.status);
  res.json(data);
});

app.listen(port, () => {
  console.info(`🏃 App running in port: ${port}`);
});
