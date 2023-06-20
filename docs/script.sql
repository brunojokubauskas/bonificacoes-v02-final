DROP DATABASE IF EXISTS bonificacoes;

CREATE DATABASE bonificacoes CHARSET=UTF8 COLLATE utf8_general_ci;

USE bonificacoes;

-- DDL Criação da estrutura da tabela
CREATE TABLE funcionarios (
  matricula INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  admissao DATE NOT NULL,
  salario DECIMAL(8, 2) NOT NULL,
  pagamento DATE NOT NULL,
  desempenho DECIMAL(3, 1) NOT NULL,
  bonificacao DECIMAL(8, 2)
);

-- DML Inserção de registros na tabela funcionarios
INSERT INTO funcionarios (nome, admissao, salario, pagamento, desempenho)
VALUES
  ('José Rodrigues', '2018-01-06', 1300.00, CURDATE(), 7),
  ('Maria Severo', '2018-03-04', 2200.00, CURDATE(), 10),
  ('Silvia Silva', '2019-05-20', 3200.00, CURDATE(), 10),
  ('Solange Oliveira', '2020-12-11', 5500.00, CURDATE(), 8.5),
  ('Mariana Pontes', '2021-12-13', 2350.00, CURDATE(), 6);

-- DQL Seleção de todos os registros da tabela funcionarios
SELECT * FROM funcionarios;
