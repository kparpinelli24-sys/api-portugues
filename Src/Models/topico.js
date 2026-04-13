const pool = require('../Config/database');

class Topico {
    // Busca todos os tópicos (idt, disciplina, professor, descricao_topico)
    static async findAll() {
        const result = await pool.query('SELECT * FROM topicos ORDER BY idt ASC');
        return result.rows;
    }

    static async listarPorView() {
    const result = await pool.query(
        'SELECT * FROM portugues'
    );
    return result.rows;
}


    // Busca um tópico específico pelo ID
    static async findById(id) {
        const result = await pool.query('SELECT * FROM topicos WHERE idt = $1', [id]);
        return result.rows[0];
    }

    // Cria um novo tópico
    static async create(dados) {
        const { disciplina, professor, descricao_topico } = dados;
        const result = await pool.query(
            `INSERT INTO topicos (disciplina, professor, descricao_topico) 
             VALUES ($1, $2, $3) RETURNING *`,
            [disciplina, professor, descricao_topico]
        );
        return result.rows[0];
    }

    // Atualiza um tópico existente
    static async update(id, dados) {
        const { disciplina, professor, descricao_topico } = dados;
        const result = await pool.query(
            `UPDATE topicos SET disciplina = $1, professor = $2, descricao_topico = $3 
             WHERE idt = $4 RETURNING *`,
            [disciplina, professor, descricao_topico, id]
        );
        return result.rows[0];
    }

    // Deleta um tópico
    static async delete(id) {
        const result = await pool.query('DELETE FROM topicos WHERE idt = $1 RETURNING *', [id]);
        return result.rowCount > 0;
    }
}

module.exports = Topico;