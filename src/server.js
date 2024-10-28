const express = require('express')
const cors = require('cors')
const app = require('./app')
const port = app.get('port')
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Documentação Supportlife",
            version: "1.0.0",
            description: "API CRUD para documentar o trabalho",
        },
        servers: [{ url: "http://localhost:3000"}],
    },
    apis: [`${__dirname}/routes/*.js`],
}

const cadastro1Router = require('./routes/cadastro1Router');
const cadastro2Router = require('./routes/cadastro2Router');
const loginRouter = require('./routes/loginRouter');
const postarRouter = require('./routes/postarRouter');
const instituicaoRouter = require('./routes/instituicaoRouter');
const doadorRouter = require('./routes/doadorRouter');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())
app.use(cors())
app.use('/api', postarRouter);
app.use('/api', cadastro1Router);
app.use('/api', cadastro2Router);
app.use('/api', loginRouter);
app.use('/api', instituicaoRouter);
app.use('/api', doadorRouter);


app.listen(port, () => console.log(`Run on port ${port}!`))