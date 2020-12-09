import 'regenerator-runtime';
import { pool } from '../config/db';

export async function registerClient(req, res) {
  try {
    const { nome, telefone_1, cpf, cnpj } = req.body;
    const cliente = await pool.query(
      'INSERT INTO cliente (nome, telefone_1, cpf, cnpj) VALUES($1, $2, $3, $4) RETURNING *;',
      [nome, telefone_1, cpf, cnpj]
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
      'SELECT (nome, telefone_1, telefone_2, cpf, cnpj) FROM cliente WHERE cliente.codigo_cliente = $1;',
      [codigo_cliente]
    );
    res.json(cliente.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getClients(req, res) {
  try {
    const clientes = await pool.query(
      'SELECT nome, telefone_1, telefone_2, cpf, cnpj FROM cliente;'
    );

    const clientes_result = clientes.rows;
    return res.render('views/listClients.html', { clientes_result });
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateClient(req, res) {
  try {
    const { codigo_cliente } = req.params;
    const { nome, telefone_1, telefone_2, cpf, cnpj } = req.body;
    const cliente = await pool.query(
      'UPDATE cliente SET nome = $1, telefone_1 = $2, telefone_2 = $3, cpf = $4, cnpj = $5 WHERE cliente.codigo_cliente = $6',
      [nome, telefone_1, telefone_2, cpf, cnpj, codigo_cliente]
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
