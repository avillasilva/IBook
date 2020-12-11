import 'regenerator-runtime';
import { pool } from '../config/db';

async function getNumRenewals(num_emprestimo) {
    try {
        const queryResponse = await pool.query(
            'SELECT num_renovacoes FROM emprestimo WHERE emprestimo.num_emprestimo = $1;', [
            num_emprestimo
        ]
        )

        return queryResponse.rows[0].num_renovacoes
    } catch (err) {
        return err.message
    }
}

async function countBooksBorrowed(codigo_cliente) {
    try {
        const selectNumEmprestimo = await pool.query(
            'SELECT num_emprestimo FROM emprestimo \
            WHERE emprestimo.codigo_cliente = $1 \
            AND emprestimo.estado = $2;', [
            codigo_cliente, 'Não devolvido'
        ]
        )

        var numLivrosEmprestados = 0

        for (const row of selectNumEmprestimo.rows) {
            const countLivros = await pool.query(
                'SELECT COUNT(num_emprestimo) FROM emprestimo_livro \
                WHERE emprestimo_livro.num_emprestimo = $1', [
                row.num_emprestimo
            ])

            numLivrosEmprestados += parseInt(countLivros.rows[0].count)
        }

        return numLivrosEmprestados
    } catch (err) {
        return err.message
    }
}

export async function borrow(req, res) {
    try {
        const codigo_cliente = req.params.codigo_cliente;
        const { data_emprestimo, data_devolucao, codigos_livros } = req.body;

        const numLivrosEmprestados = await countBooksBorrowed(codigo_cliente)

        if (numLivrosEmprestados === 5) return res.send('Cliente possui 5 livros não devolvidos')

        for (const codigo_livro of codigos_livros) {
            const queryResponse = await pool.query(
                'SELECT titulo, num_exemplares FROM livro WHERE livro.codigo_livro = $1;',
                [codigo_livro]
            );

            if (queryResponse.rows[0].num_exemplares == 1) {
                return res.send(
                    'Há apenas um exemplar do livro ' + queryResponse.rows[0].titulo
                );
            }
        }

        const emprestimo = await pool.query(
            'INSERT INTO emprestimo (codigo_cliente, data_emprestimo, data_devolucao, estado, num_renovacoes) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [codigo_cliente, data_emprestimo, data_devolucao, 'Não devolvido', 0]
        );

        for (const codigo_livro of codigos_livros) {
            const queryNumExemplares = await pool.query(
                'UPDATE livro SET num_exemplares = num_exemplares - 1 WHERE livro.codigo_livro = $1;',
                [codigo_livro]
            );

            const queryResponse = await pool.query(
                'INSERT INTO emprestimo_livro (num_emprestimo, codigo_livro) VALUES ($1, $2);',
                [emprestimo.rows[0].num_emprestimo, codigo_livro]
            );
        }

        res.status(200).json(emprestimo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

export async function clientBorrows(req, res) {
    try {
        const codigo_cliente = req.params.codigo_cliente;
        const emprestimos_livros = [];

        const queryEmprestimos = await pool.query(
            'SELECT num_emprestimo, data_emprestimo, data_devolucao, estado \
            FROM emprestimo WHERE emprestimo.codigo_cliente = $1 \
            AND emprestimo.estado = $2;',
            [codigo_cliente, 'Não devolvido']
        );

        queryEmprestimos.rows.forEach((element) => {
            emprestimos_livros.push({
                num_emprestimo: element.num_emprestimo,
                data_emprestimo: element.data_emprestimo,
                data_devolucao: element.data_devolucao,
                estado: element.estado,
                livros: [],
            });
        });

        for (var i = 0; i < queryEmprestimos.rows.length; i++) {
            const codigos_livros = await pool.query(
                'SELECT codigo_livro FROM emprestimo_livro WHERE emprestimo_livro.num_emprestimo = $1;',
                [queryEmprestimos.rows[i].num_emprestimo]
            );

            for (const element of codigos_livros.rows) {
                const livro = await pool.query(
                    'SELECT codigo_editora, titulo, autores, ano_publicacao, genero, num_edicao \
                    FROM livro WHERE livro.codigo_livro = $1;',
                    [element.codigo_livro]
                );

                emprestimos_livros[i].livros.push(livro.rows[0]);
            }
        }

        res.json(emprestimos_livros);
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateBorrowStatus(req, res) {
    try {
        const num_emprestimo = req.params.num_emprestimo;

        const updateEmprestimo = await pool.query(
            'UPDATE emprestimo SET estado = $1 WHERE emprestimo.num_emprestimo = $2',
            ['Devolvido', num_emprestimo]
        );

        const livrosEmprestados = await pool.query(
            'SELECT codigo_livro FROM emprestimo_livro \
            WHERE emprestimo_livro.num_emprestimo = $1;',
            [num_emprestimo]
        );

        for (const livro of livrosEmprestados.rows) {
            const updateNumExemplares = await pool.query(
                'UPDATE livro SET num_exemplares = num_exemplares + 1\
                WHERE livro.codigo_livro = $1;',
                [livro.codigo_livro]
            );
        }

        res.status(200).send('Livros devolvidos');
    } catch (err) {
        console.log(err.message);
    }
}

export async function renewBorrow(req, res) {
    try {
        const num_emprestimo = req.params.num_emprestimo

        const num_renovacoes = await getNumRenewals(num_emprestimo)

        if (num_renovacoes == 3) return res.send('Empréstimo atingiu o limite de renovações')

        const queryResponse = await pool.query(
            'UPDATE emprestimo SET num_renovacoes = num_renovacoes + 1, data_devolucao = data_devolucao + 30 \
            WHERE emprestimo.num_emprestimo = $1;', [
            num_emprestimo
        ])

        return res.send('Emprestimo renovado')
    } catch (err) {
        return res.send(err.message)
    }
}
