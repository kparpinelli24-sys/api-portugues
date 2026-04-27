const pool = require('../Config/database');

class Questao {
    // Lista todas as questões da tabela base
    static async getAll() {
        const result = await pool.query('SELECT * FROM questoes ORDER BY idq ASC');
        return result.rows;
    }

    // Busca uma questão específica pelo ID (idq)
    static async getById(id) {
        const result = await pool.query('SELECT * FROM questoes WHERE idq = $1', [id]);
        return result.rows[0];
    }

    static async getByTopico(topicoid) {
        const result = await pool.query('SELECT * FROM questoes WHERE topicos = $1', [topicoid]);
        return result.rows;
    }

    // Cria uma nova questão (usando os nomes do seu INSERT SQL)
    static async create(dados) {
        const { topicos, enunciado, resposta, link_topico, dt_inclusao } = dados;
        const result = await pool.query(
            `INSERT INTO questoes (topicos, enunciado, resposta, link_topico, dt_inclusao) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [topicos, enunciado, resposta, link_topico, dt_inclusao || '2026-04-06']
        );
        return result.rows[0];
    }

    // Atualiza uma questão existente
    static async update(id, dados) {
        const { topicos, enunciado, resposta, link_topico, dt_inclusao } = dados;
        const result = await pool.query(
            `UPDATE questoes SET topicos = $1, enunciado = $2, resposta = $3, link_topico = $4, dt_inclusao = $5 
             WHERE idq = $6 RETURNING *`,
            [topicos, enunciado, resposta, link_topico, dt_inclusao, id]
        );
        return result.rows[0];
    }

    // Deleta uma questão
    static async delete(id) {
        const result = await pool.query('DELETE FROM questoes WHERE idq = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    }

    // ============ MÉTODOS DE VIEW (Baseados na VIEW 'portugues') ============

    static async viewGetAll() {
        // No seu SQL, a view se chama 'portugues'
        const result = await pool.query('SELECT * FROM portugues');
        return result.rows;
    }

    static async viewGetByDisciplina(disciplina) {
        const result = await pool.query(
            'SELECT * FROM portugues WHERE disciplina ILIKE $1', 
            [`%${disciplina}%`]
        );
        return result.rows;
    }

    static async viewGetByTopico(topico) {
        const result = await pool.query(
            'SELECT * FROM portugues WHERE descricao_topico ILIKE $1', 
            [`%${topico}%`]
        );
        return result.rows;
    }

    static async viewSearchEnunciado(palavra) {
        const result = await pool.query(
            'SELECT * FROM portugues WHERE enunciado ILIKE $1', 
            [`%${palavra}%`]
        );
        return result.rows;
    }

    static async viewDetalhada() {
        // Query de Join direto caso a view não baste
        const result = await pool.query(`
            SELECT 
                q.idq AS id_questao, 
                t.descricao_topico AS nome_topico, 
                q.enunciado, 
                q.resposta 
            FROM questoes q 
            INNER JOIN topicos t ON q.topicos = t.idt 
            ORDER BY q.idq`);
        return result.rows;
    }
}

module.exports = Questao;