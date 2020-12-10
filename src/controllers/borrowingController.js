import 'regenerator-runtime'
import { pool } from '../config/db'

export async function borrow(req, res) {
    try {
        const codigo_cliente = req.params.codigo_cliente
        const { data_emprestimo, data_devolucao, codigos_livros } = req.body

        for (const codigo_livro of codigos_livros) {
            const queryResponse = await pool.query(
                'SELECT titulo, num_exemplares FROM livro WHERE livro.codigo_livro = $1;', [
                    codigo_livro
                ]
            )

            if (queryResponse.rows[0].num_emprestimo == 1) {
                return res.send('Há apenas um exemplar do livro ' + queryResponse.rows[0].titulo)
            }
        }
        
        const emprestimo = await pool.query(
            'INSERT INTO emprestimo (codigo_cliente, data_emprestimo, data_devolucao, estado) VALUES ($1, $2, $3, $4) RETURNING *;', [
                codigo_cliente, data_emprestimo, data_devolucao
        ])

        for (const codigo_livro of codigos_livros) {
            const queryNumExemplares = await pool.query(
                'UPDATE livro SET num_exemplares = num_exemplares - 1 WHERE livro.codigo_livro = $1;',[
                    codigo_livro
                ])

            const queryResponse = await pool.query(
                'INSERT INTO emprestimo_livro (num_emprestimo, codigo_livro) VALUES ($1, $2);', [
                emprestimo.rows[0].num_emprestimo, codigo_livro
            ])
        }

        res.status(200).json(emprestimo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
}

export async function clientBorrows(req, res) {
    try {
        const codigo_cliente = req.params.codigo_cliente
        const emprestimos_livros = []

        const queryEmprestimos = await pool.query(
            'SELECT num_emprestimo, data_emprestimo, data_devolucao \
            FROM emprestimo WHERE emprestimo.codigo_cliente = $1;', [
                codigo_cliente
        ])

        queryEmprestimos.rows.forEach((element) => {
            emprestimos_livros.push(
                {
                    num_emprestimo: element.num_emprestimo,
                    data_emprestimo: element.data_emprestimo,
                    data_devolucao: element.data_devolucao,
                    livros: []
                })
        })

        for (var i = 0; i < queryEmprestimos.rows.length; i++) {
            const codigos_livros = await pool.query(
                'SELECT codigo_livro FROM emprestimo_livro WHERE emprestimo_livro.num_emprestimo = $1;', [
                queryEmprestimos.rows[i].num_emprestimo
            ])

            for (const element of codigos_livros.rows) {
                const livro = await pool.query(
                    'SELECT codigo_editora, titulo, autores, ano_publicacao, genero, num_edicao \
                    FROM livro WHERE livro.codigo_livro = $1;', [
                        element.codigo_livro
                ])

                emprestimos_livros[i].livros.push(livro.rows[0])
            }
        }
        
        res.json(emprestimos_livros)
    } catch (err) {
        console.log(err.message)
    }
}

export async function updateBorrowStatus(req, res) {
    try {
        const num_emprestimo = req.params.num_emprestimo

        const livro = await pool.query(
            'UPDATE emprestimo SET estado = $1 WHERE emprestimo.num_emprestimo = $2', [
            'Não devolvido', num_emprestimo
        ])

        res.json(livro.rows[0])
    } catch (err) {
        console.log(err.message)
    }
}