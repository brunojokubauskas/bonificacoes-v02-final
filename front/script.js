const url = "http://localhost:3000";
const novoForm = document.querySelector("#novo");
const tabela = document.querySelector("#tabela");
const total = document.querySelector("#total");
let dados = [];

// Função para carregar os dados da API e preencher a tabela
function carregar() {
    fetch(url + '/listar', { method: 'GET' })
        .then(resp => resp.json())
        .then(resp => {
            dados = resp;
            preencherTabela();
        })
        .catch(err => alert(err));
}

// Função para preencher a tabela com os dados obtidos da API
function preencherTabela() {
    tabela.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Data de Admissão</th>
            <th>Salário</th>
            <th>Desempenho</th>
            <th>Bônus</th>
            <th>Ações</th>
        </tr>
    `;
    let totalDinheiro = 0;
    dados.forEach((e) => {
        const linha = document.createElement("tr");
        const tdNome = document.createElement("td");
        const tdAdmissao = document.createElement("td");
        const tdSalario = document.createElement("td");
        const tdDesempenho = document.createElement("td");
        const tdBonificacao = document.createElement("td");
        const tdAcoes = document.createElement("td");
        const btUpdate = document.createElement('button');
        const btDel = document.createElement('button');

        tdNome.innerHTML = e.nome;
        tdAdmissao.innerHTML = e.admissao.split("T")[0];
        tdSalario.innerHTML = e.salario;
        tdDesempenho.innerHTML = e.desempenho;
        tdBonificacao.innerHTML = e.bonificacao.toFixed(2);

        btUpdate.innerHTML = '*';
        btUpdate.addEventListener('click', () => alterar(e.matricula));

        btDel.innerHTML = '-';
        btDel.addEventListener('click', () => excluir(e.matricula));

        tdAcoes.appendChild(btUpdate);
        tdAcoes.appendChild(btDel);

        linha.appendChild(tdNome);
        linha.appendChild(tdAdmissao);
        linha.appendChild(tdSalario);
        linha.appendChild(tdDesempenho);
        linha.appendChild(tdBonificacao);
        linha.appendChild(tdAcoes);

        tabela.appendChild(linha);

        totalDinheiro += e.bonificacao;
    });

    total.innerHTML = `Total: ${dados.length} funcionários | Montante: R$ ${totalDinheiro.toFixed(2)}`;
}

// Evento de envio do formulário para criar um novo funcionário
novoForm.addEventListener('submit', e => {
    e.preventDefault();
    const nome = novoForm.nome.value;
    const admissao = novoForm.admissao.value;
    const salario = parseFloat(novoForm.salario.value);
    const desempenho = parseFloat(novoForm.desempenho.value);

    if (isNaN(salario) || isNaN(desempenho)) {
        alert("Salário e desempenho devem ser valores numéricos.");
        return;
    }

    const novoFuncionario = {
        nome: nome,
        admissao: admissao,
        salario: salario,
        desempenho: desempenho
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoFuncionario)
    };

    fetch(url + '/criar', options)
        .then(resp => {
            if (resp.status === 201) {
                return resp.json();
            } else {
                throw new Error('Erro ao enviar dados');
            }
        })
        .then(resp => {
            dados.push(resp);
            preencherTabela();
            novoForm.reset();
        })
        .catch(err => alert(err));
});

// Função para excluir um funcionário
function excluir(matricula) {
    fetch(url + '/excluir/' + matricula, { method: 'DELETE' })
        .then(resp => {
            if (resp.status === 204) {
                return resp.json();
            } else {
                throw new Error('Funcionário não encontrado');
            }
        })
        .then(resp => {
            dados = dados.filter(e => e.matricula !== matricula);
            preencherTabela();
        })
        .catch(err => alert(err));
}

// Função para alterar os dados de um funcionário
function alterar(matricula) {
    const linha = tabela.querySelector(`#linha${matricula}`);
    const nome = linha.querySelector(".nome").innerText;
    const admissao = linha.querySelector(".admissao").innerText;
    const salario = parseFloat(linha.querySelector(".salario").innerText);
    const desempenho = parseFloat(linha.querySelector(".desempenho").innerText);

    if (isNaN(salario) || isNaN(desempenho)) {
        alert("Salário e desempenho devem ser valores numéricos.");
        return;
    }

    const funcionarioAtualizado = {
        matricula: matricula,
        nome: nome,
        admissao: admissao,
        salario: salario,
        desempenho: desempenho
    };

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionarioAtualizado)
    };

    fetch(url + '/alterar', options)
        .then(resp => {
            if (resp.status === 202) {
                return resp.json();
            } else {
                throw new Error('Erro ao alterar dados');
            }
        })
        .then(resp => {
            const index = dados.findIndex(e => e.matricula === matricula);
            if (index !== -1) {
                dados[index] = resp;
                preencherTabela();
            }
        })
        .catch(err => alert(err));
}

// Chamar a função para carregar os dados ao carregar a página
carregar();
