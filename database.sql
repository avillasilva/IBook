-- A QUERIE PARA CRIAÇÃO DO BANCO DE DADOS DEVE SER EXECUTADA SOZINHA
-- AS OUTRAS PODEM SER EXECUTADAS EM CONJUNTO
CREATE DATABASE biblioteca;

-- POSSÍVEIS ESTADOS DE UM EMPRÉSTIMO --
CREATE TYPE emprestimo_estado AS ENUM ('Não devolvido', 'Devolvido');

-- QUERIES PARA EXCLUIR AS TABELAS QUANDO NECESSÁRIO --
DROP TABLE IF EXISTS emprestimo_livro;
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS endereco;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS editora;

-- QUERIES PARA CRIAÇÃO DAS TABELAS --
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
    num_exemplares INTEGER NOT NULL CHECK (num_exemplares >= 1),
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
    estado emprestimo_estado DEFAULT 'Não devolvido',
    num_renovacoes int4 CHECK (num_renovacoes <= 3),
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

-- QUERIES PARA INSERÇÃO DE DADOS PARA TESTES --

-- CLIENTE
INSERT INTO cliente (nome, telefone_1, cpf) VALUES ('Emmanuella', '83995468526', '09785245666');
INSERT INTO cliente (nome, telefone_1, cpf) VALUES ('Luyza', '83997458236', '09785245666');
INSERT INTO cliente (nome, telefone_1, cpf) VALUES ('luan', '83996123312', '09785245666');
INSERT INTO cliente (nome, telefone_1, cpf) VALUES ('avilla', '83975684325', '09785245666');
INSERT INTO cliente (nome, telefone_1, cpf) VALUES ('Renan', '83998857626', '09785245666');

-- ENDERECO
INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (1, 'Rua Antonio Targino', 651, 'Cidade Universitária', 'João Pessoa', 'Paraíba', '58052250');

INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (2, 'Rua Norberto de Castro', 852, 'Cidade Universitária', 'João Pessoa', 'Paraíba', '58062321');

INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (3, 'Avendida Antônio Lira', 753, 'Valentina', 'João Pessoa', 'Paraíba', '58052250');

INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (4, 'Rua Margarida Fonseca Arruda', 789, 'Cabo Branco', 'João Pessoa', 'Paraíba', '58057520');

INSERT INTO endereco (codigo_cliente, rua, numero, bairro, cidade, estado, cep)
    VALUES (5, 'Rua Norberto de Castro Nogueira', 642, 'cidade universitaria', 'João Pessoa', 'Paraíba', '58052250');


-- EDITORA
INSERT INTO editora (nome) VALUES ('Alamo');
INSERT INTO editora (nome) VALUES ('Ali Babá');
INSERT INTO editora (nome) VALUES ('5 estrelas');
INSERT INTO editora (nome) VALUES ('É Realizações');
INSERT INTO editora (nome) VALUES ('JC Editora');

-- LIVRO
INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (1, 'A Arte das Guerra', 'Sun Tzu', '2020-12-07', 100,  0747963789, 600, 'tratado, obra de referência', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (2, 'Harry Potter e a Pedra Filosofal', 'J. K. Rowling', '1997-06-26', 100,  0747532699, 600, 'fantasia', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (3, 'As Guerra dos Tronos', 'G. R. R. Martin', '1996-08-06', 150, 896370107, 416, 'fantasia', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (4, 'Duna', 'Frank Herbert', '1965-08-07', 100,  897590741, 600, 'fantasia, ficção científica', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (5, 'Código Limpo', 'Robert C. Martin', '2009-09-08', 200,  432350884, 440, 'programação, computação', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (5, 'Use A Cabeça, Java', ' Kathy Sierra', '2003-01-01', 400,  76081733, 440, 'programação, computação', 1);

INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao)
    VALUES (5, 'Java Concorrente na Prática', 'Brian Goetz', '2006-05-09', 400,  132702256, 440, 'programação, computação', 1);