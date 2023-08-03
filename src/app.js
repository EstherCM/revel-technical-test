require('dotenv').config();
require('./database');

const express = require('express');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);
app.use('/api/v1', productRouter);

app.listen(port, () => {
  console.info(`🏃 App running in port: ${port}`);
});
