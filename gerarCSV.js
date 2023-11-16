// Função para gerar o CSV e exportar
function gerarCSV() {
  // Verifica se há funcionários para exportar
  if (funcionarios.length === 0) {
    alert('Não há funcionários para exportar.');
    return;
  }


  // Cria o conteúdo CSV
  let csvContent = 'Nome,Cargo,Salário\n';


  // Adiciona as informações de cada funcionário ao conteúdo CSV
  for (const funcionario of funcionarios) {
    const { nome, cargo, salario } = funcionario;
    csvContent += $; { nome; } $; { cargo; } $; { salario; } n;
  }


  // Cria um objeto Blob contendo o conteúdo CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });


  // Cria um link para download do arquivo CSV
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'funcionarios.csv';
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
