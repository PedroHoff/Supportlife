const express = require('express');
const dotenv = require('dotenv').config();
const postarRouter = require('./routes/postarRouter');
const cadastro1Router = require('./routes/cadastro1Router');
const cadastro2Router = require('./routes/cadastro2Router');
const loginRouter = require('./routes/loginRouter');
const cors =  require('cors');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());
app.use('/api', postarRouter);
app.use('/api', cadastro1Router);
app.use('/api', cadastro2Router);
app.use('/api/', loginRouter);
module.exports = app;