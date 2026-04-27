const Topico = require('../Models/topico');

const topicoController = {
    // GET /t
    async listar(req, res) {
        try {
            const topicos = await Topico.findAll();
            res.json(topicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async listarPorView (req,res){
    try{
        const topicos = await topicosModel.listarPorView();
        res.status(200).json(topicos);
    }catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao listar por view',
            erro: erro.message
        });
    }
},

    // GET /t/:id
    async buscarPorId(req, res) {
        try {
            const topico = await Topico.findById(req.params.id);
            if (!topico) {
                return res.status(404).json({ error: 'Tópico não encontrado' });
            }
            res.json(topico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /t
    async criar(req, res) {
        try {
            const novoTopico = await Topico.create(req.body);
            res.status(201).json({ success: true, data: novoTopico });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT /t/:id
    async atualizar(req, res) {
        try {
            const topicoAtualizado = await Topico.update(req.params.id, req.body);
            if (!topicoAtualizado) {
                return res.status(404).json({ error: 'Tópico não encontrado' });
            }
            res.json({ success: true, data: topicoAtualizado });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // DELETE /t/:id
    async deletar(req, res) {
        try {
            const deletado = await Topico.delete(req.params.id);
            if (!deletado) {
                return res.status(404).json({ error: 'Tópico não encontrado' });
            }
            res.json({ success: true, message: 'Tópico deletado com sucesso' });
        } catch (error) {
            // Se houver erro de chave estrangeira (questões ligadas ao tópico), cairá aqui
            res.status(500).json({ error: "Não é possível deletar um tópico que possui questões associadas." });
        }
    }
};

module.exports = topicoController;