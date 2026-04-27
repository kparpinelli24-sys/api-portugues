const pool = require('../Config/database');

class Topico {
    static async findAll() {
        const result = await pool.query('SELECT * FROM topico ORDER BY idt ASC');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM topico WHERE idt = $1', [id]);
        return result.rows[0];
    }

    static async create(dados) {
        const { disciplina, professor, destop } = dados;
        const result = await pool.query(
            'INSERT INTO topico (disciplina, professor, destop) VALUES ($1, $2, $3) RETURNING *',
            [disciplina, professor, destop]
        );
        return result.rows[0];
    }

    static async update(id, dados) {
        const { disciplina, professor, destop } = dados;
        const result = await pool.query(
            'UPDATE topico SET disciplina = $1, professor = $2, destop = $3 WHERE idt = $4 RETURNING *',
            [disciplina, professor, destop, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        // Deleta as questões vinculadas primeiro para evitar erro de chave estrangeira
        await pool.query('DELETE FROM questoes WHERE topicoid = $1', [id]);
        const result = await pool.query('DELETE FROM topico WHERE idt = $1', [id]);
        return result.rowCount > 0;
    }
}

module.exports = Topico;