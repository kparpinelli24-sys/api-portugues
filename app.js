const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./Src/Routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas principais (Sem o prefixo /api para ficar mais curto)
app.use('/', routes);

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor pronto!`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
});

module.exports = app;