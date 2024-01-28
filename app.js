const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/items', itemRoutes);

mongoose.connect('mongodb://localhost:27017/mock-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => {
  console.log(res)
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error.message));
