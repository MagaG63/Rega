const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth.router');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
})

module.exports = app;