import 'regenerator-runtime';
import { pool } from '../config/db';

export async function registerClient(req, res) {
  try {
    const {
      nome,
      telefone_1,
      cpf,
      cnpj,
      rua,
      numero,
      bairro,
      cidade,
      cep,
      estado,
    } = req.body;

    const cliente = await pool.query(
      'INSERT INTO cliente (nome, telefone_1, cpf, cnpj) VALUES($1, $2, $3, $4) RETURNING *;',
      [nome, telefone_1, cpf, cnpj]
    );

    const cadastro_endereco = await pool.query(
      'INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, cep, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [cliente.rows[0].codigo_cliente, rua, numero, bairro, cidade, cep, estado]
    );

    return res.render('views/clientRegistered.html');
  } catch (err) {
    console.log(err.message);
  }
}

export async function getClient(req, res) {
  try {
    const codigo_cliente = req.params.codigo_cliente;
    const cliente = await pool.query(
      'SELECT cliente.nome, cliente.telefone_1, cliente.telefone_2, cliente.cpf, cliente.cnpj, \
             endereco.codigo_cliente, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.cep, endereco.estado \
             FROM cliente, endereco WHERE cliente.codigo_cliente = $1 AND endereco.codigo_cliente = $1;',
      [codigo_cliente]
    );
    res.json(cliente.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getClients(req, res) {
  try {
    const queryResponse = await pool.query(
      'SELECT cliente.codigo_cliente, cliente.nome, cliente.telefone_1, cliente.telefone_2, cliente.cpf, cliente.cnpj, \
            endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.cep, endereco.estado FROM cliente, endereco \
            WHERE cliente.codigo_cliente = endereco.codigo_cliente;'
    );

    const clientes_enderecos = [];
    const clientes_result = queryResponse.rows;
    return res.json(clientes_result);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateClient(req, res) {
  try {
    const { codigo_cliente } = req.params;
    const { nome, telefone_1, telefone_2, cpf, cnpj, endereco } = req.body;
    const cliente = await pool.query(
      'UPDATE cliente SET nome = $1, telefone_1 = $2, telefone_2 = $3, cpf = $4, cnpj = $5 WHERE cliente.codigo_cliente = $6;',
      [nome, telefone_1, telefone_2, cpf, cnpj, codigo_cliente]
    );

    const update_endereco = await pool.query(
      'UPDATE endereco SET rua = $1, numero = $2, bairro = $3, cidade = $4, estado = $5, cep = $6 WHERE endereco.codigo_cliente = $7;',
      [
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        codigo_cliente,
      ]
    );

    res.json(cliente.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteClient(req, res) {
  try {
    const { codigo_cliente } = req.params;
    const cliente = await pool.query(
      'DELETE FROM cliente WHERE cliente.codigo_cliente = $1;',
      [codigo_cliente]
    );
    res.json(cliente.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}
