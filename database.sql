-- A QUERIE PARA CRIAÇÃO DO BANCO DE DADOS DEVE SER EXECUTADA SOZINHA
-- AS OUTRAS PODEM SER EXECUTADAS EM CONJUNTO
CREATE DATABASE biblioteca;

-- QUERIES PARA EXCLUIR AS TABELAS QUANDO NECESSÁRIO
DROP TABLE IF EXISTS emprestimo_livro;
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS endereco;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS editora;

-- QUERIES PARA CRIAÇÃO DAS TABELAS
CREATE TABLE IF NOT EXISTS cliente (
    codigo_cliente SERIAL,
    nome VARCHAR(50) NOT NULL,
    telefone_1 VARCHAR(11) NOT NULL,
    telefone_2 VARCHAR(11),
    cpf VARCHAR(11),
    cnpj VARCHAR(11),
    PRIMARY KEY (codigo_cliente)
);

CREATE TABLE IF NOT EXISTS editora (
    codigo_editora SERIAL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo_editora)
);

CREATE TABLE IF NOT EXISTS livro (
    codigo_livro SERIAL,
    codigo_editora SERIAL,
    titulo VARCHAR(50) NOT NULL,
    autores VARCHAR(50) NOT NULL,
    ano_publicacao DATE NOT NULL,
    num_exemplares INTEGER NOT NULL,
    isbn INTEGER NOT NULL,
    num_paginas INTEGER NOT NULL,
    genero VARCHAR(50) NOT NULL,
    num_edicao SMALLINT NOT NULL,
    PRIMARY KEY (codigo_livro),
    FOREIGN KEY (codigo_editora) REFERENCES editora (codigo_editora) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS emprestimo (
    num_emprestimo SERIAL,
    codigo_cliente SERIAL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    PRIMARY KEY (num_emprestimo),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente)
);

CREATE TABLE IF NOT EXISTS emprestimo_livro (
    num_emprestimo SERIAL,
    codigo_livro SERIAL,
    FOREIGN KEY (num_emprestimo) REFERENCES emprestimo (num_emprestimo),
    FOREIGN KEY (codigo_livro) REFERENCES livro (codigo_livro)
);

CREATE TABLE IF NOT EXISTS endereco (
    codigo_cliente SERIAL,
    rua VARCHAR(50) NOT NULL,
    numero SMALLINT NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    PRIMARY KEY (codigo_cliente),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente) ON DELETE CASCADE,
    UNIQUE (codigo_cliente)
);

-- QUERIES PARA INSERÇÃO DE DADOS PARA TESTES

-- CLIENTES E ENDEREÇOS
INSERT INTO cliente (nome, telefone_1) VALUES ('luan', '83996123312');

INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (1, 'antonio targino', 651, 'cidade universitaria', 'joão pessoa', 'paraiba', '58052250');

-- EDITORAS E LIVROS
INSERT INTO editora (nome) VALUES ('Fu** de vez');

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (1, 'Se ferrando em banco de dados I', 'Ávilla, Renan, Naiara, Luan, Emmanuella, Luyza', '2020-12-07', 10,  1234, 100, 'terror/educativo', 1);
