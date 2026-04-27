const Questao = require('../Models/questao');

const questaoController = {
    // ============ MÉTODOS CRUD BÁSICOS ============

    async listar(req, res) {
        try {
            const questoes = await Questao.getAll();
            res.json(questoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async listarCompleto(req, res) {
        return this.listar(req, res);
    },

    async listarComTopico(req, res) {
        try {
            const questoes = await Questao.viewGetAll();
            res.json(questoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarQuestoesGuerra(req, res) {
        try {
            const questoes = await Questao.viewSearchEnunciado('guerra');
            res.json(questoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPorTopico(req, res) {
        try {
            const questoes = await Questao.getByTopico(req.params.topicoid);
            res.json(questoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const questao = await Questao.getById(req.params.id);
            if (!questao) return res.status(404).json({ error: "Questão não encontrada" });
            res.json(questao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async criar(req, res) {
        try {
            const novaQuestao = await Questao.create(req.body);
            res.status(201).json({ success: true, data: novaQuestao });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async atualizar(req, res) {
        try {
            const questaoAtualizada = await Questao.update(req.params.id, req.body);
            if (!questaoAtualizada) return res.status(404).json({ error: "Questão não encontrada" });
            res.json({ success: true, data: questaoAtualizada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deletar(req, res) {
        try {
            const deletado = await Questao.delete(req.params.id);
            if (!deletado) return res.status(404).json({ error: "Questão não encontrada" });
            res.json({ success: true, message: "Questão removida com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ============ MÉTODOS PARA A VIEW ============
    
    async viewListar(req, res) {
        try {
            const questoes = await Questao.viewGetAll();
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async viewBuscarPorDisciplina(req, res) {
        try {
            const { disciplina } = req.query;
            if (!disciplina) return res.status(400).json({ success: false, error: 'Parâmetro "disciplina" é obrigatório' });
            const questoes = await Questao.viewGetByDisciplina(disciplina);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async viewBuscarPorTopico(req, res) {
        try {
            const { topico } = req.query;
            if (!topico) return res.status(400).json({ success: false, error: 'Parâmetro "topico" é obrigatório' });
            const questoes = await Questao.viewGetByTopico(topico);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // MODO CORRETO: Chama o método do Model Questao.viewSearchEnunciado
    async viewBuscarPorEnunciado(req, res) {
        try {
            const { palavra } = req.query;
            if (!palavra) {
                return res.status(400).json({ success: false, error: 'Parâmetro "palavra" é obrigatório' });
            }
            const questoes = await Questao.viewSearchEnunciado(palavra);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async viewDetalhada(req, res) {
        try {
            const questoes = await Questao.viewDetalhada();
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Métodos auxiliares (caso use rotas específicas sem o prefixo /view)
    async buscarPorEnunciado(req, res) {
        return this.viewBuscarPorEnunciado(req, res);
    }
};

module.exports = questaoController;