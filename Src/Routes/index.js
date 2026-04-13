const express = require('express');
const router = express.Router();
const questaoRoutes = require('./questao');
const topicoRoutes = require('./topico');

// Rota de Boas-vindas (localhost:3000/)
router.get('/', (req, res) => {
    res.json({
        sistema: "API de Questões v1.0",
        atalhos: {
            questoes: "/questao",
            topicos: "/topico",
            views: "/questao/view/all"
        }
    });
});

// Registrar rotas com nomes reduzidos
router.use('/questao', questaoRoutes);
router.use('/topico', topicoRoutes);

module.exports = router;