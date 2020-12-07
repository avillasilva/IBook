CREATE DATABASE biblioteca;

CREATE TABLE IF NOT EXISTS emprestimo (
    num_emprestimo INTEGER NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    codigo_cliente INTEGER NOT NULL,
    PRIMARY KEY (num_emprestimo),
    FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente)
);

CREATE TABLE IF NOT EXISTS emprestimo_livro (
  	num_emprestimo INTEGER NOT NULL,
    codigo_livro INTEGER NOT NULL,
    FOREIGN KEY (num_emprestimo) REFERENCES emprestimo (num_emprestimo),
    FOREIGN KEY (codigo_livro) REFERENCES livro (codigo_livro)
);

CREATE TABLE IF NOT EXISTS livro (
    codigo_livro INTEGER NOT NULL,
    codigo_editora INTEGER NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    autores VARCHAR(50) NOT NULL,
    ano_publicacao DATE NOT NULL,
    num_exemplares INTEGER NOT NULL,
    isbn INTEGER NOT NULL,
    num_paginas INTEGER NOT NULL,
    genero VARCHAR(50) NOT NULL,
    num_edicao SMALLINT NOT NULL,
    PRIMARY KEY (codigo_livro),
    FOREIGN KEY (codigo_editora) REFERENCES editora (codigo_editora)
);

CREATE TABLE IF NOT EXISTS editora (
    codigo_editora INTEGER NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo_editora)
);

CREATE TABLE IF NOT EXISTS cliente (
    codigo_cliente INTEGER NOT NULL,
    nome VARCHAR(50) NOT NULL,
    telefone_1 VARCHAR(11) NOT NULL,
    telefone_2 VARCHAR(11) NOT NULL,
    cpf VARCHAR(11),
    cnpj VARCHAR(14),
    PRIMARY KEY (codigo_cliente)
);

CREATE TABLE IF NOT EXISTS endereco (
    codigo_cliente INTEGER NOT NULL,
    rua VARCHAR(50) NOT NULL,
    numero SMALLINT NOT NULL,
    cep VARCHAR(8) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    FOREIGN KEY (codigo_cliente) REFERENCES cliente (codigo_cliente)
);
