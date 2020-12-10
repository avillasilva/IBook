import 'regenerator-runtime';
import { pool } from '../config/db';

export async function registerPublisher(req, res) {
  try {
    const { nome } = req.body;
    const editora = await pool.query(
      'INSERT INTO editora (nome) VALUES($1) RETURNING *;',
      [nome]
    );
    return res.render('views/publisherRegistered.html');
  } catch (err) {
    console.log(err.message);
  }
}

export async function getPublisher(req, res) {
  try {
    const { codigo_editora } = req.params;
    const editora = await pool.query(
      'SELECT nome FROM editora WHERE editora.codigo_editora = $1;',
      [codigo_editora]
    );
    res.json(editora.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getPublishers(req, res) {
  try {
    const editoras = await pool.query(
      'SELECT codigo_editora, nome FROM editora;'
    );
    res.json(editoras.rows);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updatePublisher(req, res) {
  try {
    const { codigo_editora } = req.params;
    const { nome } = req.body;
    const editora = await pool.query(
      'UPDATE editora SET nome = $1 WHERE editora.codigo_editora = $2',
      [nome, codigo_editora]
    );

    res.json(editora.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function deletePublisher(req, res) {
  try {
    const { codigo_editora } = req.params;
    const editora = await pool.query(
      'DELETE FROM editora WHERE editora.codigo_editora = $1;',
      [codigo_editora]
    );
    res.json(editora.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}
