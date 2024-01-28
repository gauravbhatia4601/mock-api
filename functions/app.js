const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('../routes/itemRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Middleware to set headers for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (replace '*' with specific origins if needed)
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/.netlify/functions/app', itemRoutes);

mongoose
  .connect('mongodb+srv://gauravbhatia172:QrZ1Yil7NfScJCqq@cluster0.4ataz95.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error.message));

module.exports.handler = serverless(app);