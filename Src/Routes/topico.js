const express = require('express');
const router = express.Router();
const topicoController = require('../Controllers/topicoController');  // Caminho corrigido

router.get('/', topicoController.listar);
router.get('/view', topicoController.listarPorView);
router.get('/:id', topicoController.buscarPorId);
router.post('/', topicoController.criar);
router.put('/:id', topicoController.atualizar);
router.delete('/:id', topicoController.deletar);

module.exports = router;