const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');


const postarRouter = require('./routes/postarRouter');
const cadastro1Router = require('./routes/cadastro1Router');
const cadastro2Router = require('./routes/cadastro2Router');
const loginRouter = require('./routes/loginRouter');
const instituicaoRouter = require('./routes/instituicaoRouter');
const doadorRouter = require('./routes/doadorRouter');
const cors = require('cors');
const app = express();



app.set('port', process.env.PORT || 3000); 


app.use('/uploadsPOSTAGEM', express.static(path.join(__dirname, "uploadsPOSTAGEM"))); // tudo na pasta uploads pode ser acessado publicamente pelo caminho /uploads
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());
app.use(fileUpload());


app.use('/api', postarRouter);
app.use('/api', cadastro1Router);
app.use('/api', cadastro2Router);
app.use('/api', loginRouter);
app.use('/api', instituicaoRouter);
app.use('/api', doadorRouter);

module.exports = app; 