require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const morgan = require("morgan");
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes)

app.listen(3001, () => {
  console.log(`Server Started at port ${3001}`)
})