const mongoose = require('mongoose');
const connectionURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/revel-technical-test';

mongoose.connect(connectionURI);

mongoose.connection.on('connected', () => {
  console.info('🔌 Connected');
});

mongoose.connection.on('disconnected', () => {
  console.info('💔 Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`🔥 Error connecting ${err}`);
});
