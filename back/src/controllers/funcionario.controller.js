const connection = require('../dao/connect');
const Funcionario = require('../models/funcionario.model');

// Método que recebe uma lista e aplica o modelo em todos os elementos
const modelarLista = (lista) => {
  return lista.map((item) => new Funcionario(item));
};

// Métodos CRUD
const criar = (req, res) => {
  const funcionario = new Funcionario(req.body);
  connection.query(funcionario.create(), (err, result) => {
    if (err === null) {
      res.status(201).end();
    } else {
      res.status(500).json(err).end();
    }
  });
};

const listar = (req, res) => {
  const funcionario = new Funcionario(req.params);
  connection.query(funcionario.read(), (err, result) => {
    if (err === null) {
      const listaModelada = modelarLista(result);
      res.json(listaModelada).end();
    }
  });
};

const alterar = (req, res) => {
  const funcionario = new Funcionario(req.body);
  connection.query(funcionario.update(), (err, result) => {
    if (result.affectedRows > 0) {
      res.status(202).end();
    } else {
      res.status(404).end();
    }
  });
};

const excluir = (req, res) => {
  const funcionario = new Funcionario(req.params);
  connection.query(funcionario.delete(), (err, result) => {
    if (result.affectedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};

const teste = (req, res) => {
  res.json("Sistema de Bonificações Respondendo").end();
};

module.exports = {
  teste,
  criar,
  listar,
  alterar,
  excluir,
};
