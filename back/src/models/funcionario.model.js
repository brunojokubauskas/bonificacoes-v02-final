class Funcionario {
  constructor(i) {
    this.matricula = i.matricula;
    this.nome = i.nome;
    this.admissao = i.admissao;
    this.salario = i.salario;
    this.pagamento = i.pagamento;
    this.desempenho = i.desempenho;
    this.bonificacao = this.calcBonificacao();
  }

  // Métodos CRUD
  create() {
    return `INSERT INTO funcionarios VALUE(default,'${this.nome}','${this.admissao}',${this.salario},CURDATE(),${this.desempenho},${this.bonificacao})`;
  }

  read() {
    if (this.matricula === undefined)
      return `SELECT * FROM funcionarios`;
    else
      return `SELECT * FROM funcionarios WHERE matricula = ${this.matricula}`;
  }

  update() {
    return `UPDATE funcionarios SET nome = '${this.nome}', admissao = '${this.admissao}', salario = ${this.salario}, pagamento = '${this.pagamento}', desempenho=${this.desempenho} WHERE matricula = ${this.matricula}`;
  }

  delete() {
    return `DELETE FROM funcionarios WHERE matricula = ${this.matricula}`;
  }

  // Métodos de cálculo
  calcAnos() {
    const admissao = new Date(this.admissao);
    const hoje = new Date();
    const difTempo = Math.abs(admissao - hoje);
    const anos = Math.floor(difTempo / (1000 * 60 * 60 * 24 * 365));
    return anos;
  }

  calcBonificacao() {
    return (this.salario * 2 / 100) * this.calcAnos() * this.desempenho;
  }
}

module.exports = Funcionario;
