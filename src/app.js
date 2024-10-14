const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const postarRouter = require('./routes/postarRouter');
const cadastro1Router = require('./routes/cadastro1Router');
const cadastro2Router = require('./routes/cadastro2Router');
const loginRouter = require('./routes/loginRouter');
const cors = require('cors');


const app = express();

app.set('port', process.env.PORT || 3000); // Use uma porta diferente, como 3001

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/api', postarRouter);
app.use('/api', cadastro1Router);
app.use('/api', cadastro2Router);
app.use('/api', loginRouter);

module.exports = app; // Certifique-se de exportar o app aqui