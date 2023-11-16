function formatarCampo() {
    const salarioInput = document.getElementById('salario');
    let valorCampo = salarioInput.value;

    // Remove caracteres não numéricos
    valorCampo = valorCampo.replace(/\D/g, '');

    // Adiciona vírgulas entre os números
    valorCampo = Number(valorCampo).toLocaleString('pt-BR');

    // Define o valor formatado de volta no campo
    salarioInput.value = valorCampo;
}

const funcionarios = [];

function adicionarFuncionario() {
    const nome = document.getElementById('nome').value;
    const funcao = document.getElementById('funcao').value;
    const salario = document.getElementById('salario').value;

    if (nome && funcao && salario) {
        if (funcionarios.some(funcionario => funcionario.nome === nome)) {
            alert('Esse nome de funcionário já existe na lista.');
            return;
        }

        const novoFuncionario = { nome, funcao, salario };
        funcionarios.push(novoFuncionario);

        atualizarTabela();
        gerarCSV();

        // Utilizando forEach para limpar os campos do formulário
        document.querySelectorAll('#myform input').forEach(input => (input.value = ''));
    }
}

function excluirFuncionario(index) {
    funcionarios.splice(index, 1);
    atualizarTabela();
}

function atualizarTabela() {
    const tabelaFuncionarios = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];
    tabelaFuncionarios.innerHTML = '';

    funcionarios.forEach((funcionario, index) => {
        const newRow = tabelaFuncionarios.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = funcionario.nome;
        cell2.innerHTML = funcionario.funcao;
        cell3.innerHTML = funcionario.salario;
        cell4.innerHTML = `<button class="btn-delete" onclick="excluirFuncionario(${index})">Excluir</button>`;
    });
}

function gerarCSV() {
    let csvContent = 'Nome,Função,Salário\n';

    for (const funcionario of funcionarios) {
        const { nome, funcao, salario } = funcionario;
        csvContent += `${nome},${funcao},${salario}\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'funcionarios.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
