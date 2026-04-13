const express = require('express');
const router = express.Router();
const questaoController = require('../Controllers/questaoController');

// --- ROTAS DE TABELA (localhost:3000/q/...) ---
router.get('/', questaoController.listar);
router.get('/completo', questaoController.listarCompleto);
router.get('/com-topico', questaoController.listarComTopico);
router.get('/buscar', questaoController.buscarPorEnunciado);
router.get('/guerra', questaoController.buscarQuestoesGuerra);
router.get('/topico/:topicoid', questaoController.buscarPorTopico);

// --- ROTAS DE VIEW (localhost:3000/questao/view/...) ---
router.get('/view/all', questaoController.viewListar);
router.get('/view/detalhada', questaoController.viewDetalhada);
router.get('/view/busca/disciplina', questaoController.viewBuscarPorDisciplina);
router.get('/view/busca/topico', questaoController.viewBuscarPorTopico);
router.get('/view/busca/enunciado', questaoController.viewBuscarPorEnunciado);

// --- CRUD (Sempre por último se tiver parâmetro :id) ---
router.post('/', questaoController.criar);
router.get('/:id', questaoController.buscarPorId);
router.put('/:id', questaoController.atualizar);
router.delete('/:id', questaoController.deletar);

module.exports = router;