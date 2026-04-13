const Questao = require('../Models/questao');


    // ============ MÉTODOS CRUD BÁSICOS ============

    async function listar(req, res) {
        try {
            const questoes = await Questao.getAll();
            res.json(questoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function buscarPorId(req, res) {
        try {
            const questao = await Questao.getById(req.params.id);
            if (!questao) return res.status(404).json({ error: "Questão não encontrada" });
            res.json(questao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Novos métodos adicionados para evitar erro de 'handler must be a function'
    async function listarCompleto(req, res) {
        try {
            // Implemente a lógica no seu Model Questao.getComplete() se existir
            res.json({ message: "Método listarCompleto ainda não implementado no Model" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function listarComTopico(req, res) {
        try {
            res.json({ message: "Método listarComTopico ainda não implementado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function buscarPorEnunciado(req, res) {
        try {
            res.json({ message: "Método buscarPorEnunciado ainda não implementado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async  function buscarQuestoesGuerra(req, res) {
        try {
            res.json({ message: "Método buscarQuestoesGuerra ainda não implementado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function buscarPorTopico(req, res) {
        try {
            res.json({ message: `Buscando tópico ID: ${req.params.topicoid}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async  function criar(req, res) {
        try {
            const novaQuestao = await Questao.create(req.body);
            res.status(201).json({ success: true, data: novaQuestao });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function atualizar(req, res) {
        try {
            const questaoAtualizada = await Questao.update(req.params.id, req.body);
            if (!questaoAtualizada) return res.status(404).json({ error: "Questão não encontrada" });
            res.json({ success: true, data: questaoAtualizada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async  function deletar(req, res) {
        try {
            const deletado = await Questao.delete(req.params.id);
            if (!deletado) return res.status(404).json({ error: "Questão não encontrada" });
            res.json({ success: true, message: "Questão removida com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ============ MÉTODOS PARA A VIEW ============
    
    async function viewListar(req, res) {
        try {
            const questoes = await Questao.viewGetAll();
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async function viewBuscarPorDisciplina(req, res) {
        try {
            const { disciplina } = req.query;
            if (!disciplina) return res.status(400).json({ success: false, error: 'Parâmetro "disciplina" é obrigatório' });
            const questoes = await Questao.viewGetByDisciplina(disciplina);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async function viewBuscarPorTopico(req, res) {
        try {
            const { topico } = req.query;
            if (!topico) return res.status(400).json({ success: false, error: 'Parâmetro "topico" é obrigatório' });
            const questoes = await Questao.viewGetByTopico(topico);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async  function viewBuscarPorEnunciado(req, res) {
        try {
            const { palavra } = req.query;
            if (!palavra) return res.status(400).json({ success: false, error: 'Parâmetro "palavra" é obrigatório' });
            const questoes = await Questao.viewSearchEnunciado(palavra);
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async function viewDetalhada(req, res) {
        try {
            const questoes = await Questao.viewDetalhada();
            res.json({ success: true, count: questoes.length, data: questoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

module.exports = {
    listar,
    buscarPorId,
    listarCompleto,
    listarComTopico,
    buscarPorEnunciado,
    buscarQuestoesGuerra,
    buscarPorTopico,
    criar,
    atualizar,
    deletar,
    viewListar,
    viewBuscarPorDisciplina,
    viewBuscarPorTopico,
    viewBuscarPorEnunciado,
    viewDetalhada,
}