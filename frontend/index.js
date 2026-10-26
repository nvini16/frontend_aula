const listaProdutos = document.querySelector('#listaProdutos');
const totalProdutos = document.querySelector('#totalProdutos');

let produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];

function renderizarProdutos() {
    listaProdutos.innerHTML = '';
    totalProdutos.textContent = produtosSalvos.length;

    if (produtosSalvos.length === 0) {
        const linha = document.createElement('tr');
        const coluna = document.createElement('td');
        coluna.textContent = 'Nenhum produto cadastrado.';
        coluna.colSpan = 7;
        linha.append(coluna);
        listaProdutos.append(linha);
        return;
    }

    for (let i = 0; i < produtosSalvos.length; i++) {
        const produto = produtosSalvos[i];
        const linha = document.createElement('tr');
        linha.innerHTML = `<td class="id">#${produto.id}</td>
        <td>
            <strong>${produto.nome}</strong>
            <br>
            <small>${produto.descricao}</small>
        </td>
        <td>${produto.categoria}</td>
        <td class="preco">R$ ${Number(produto.preco).toFixed(2)}</td>
        <td>${produto.estoque}</td>`;

        const colunaStatus = document.createElement('td');
        const etiquetaStatus = document.createElement('span');
        etiquetaStatus.textContent = produto.status;
        etiquetaStatus.classList.add('status');
        if (produto.status === 'Indisponível') etiquetaStatus.classList.add('indisponivel');
        colunaStatus.append(etiquetaStatus);

        const colunaAcoes = document.createElement('td');
        colunaAcoes.classList.add('acoes');
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar'; 
        botaoEditar.classList.add('botao', 'botao-tabela', 'botao-editar');
        botaoEditar.addEventListener('click', function () { window.location.href = 'cadastro.html?id=' + produto.id; });
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir'; 
        botaoExcluir.classList.add('botao', 'botao-tabela', 'botao-excluir');
        botaoExcluir.addEventListener('click', function () { excluirProduto(produto.id); });
        colunaAcoes.append(botaoEditar, botaoExcluir);
        linha.append(colunaStatus, colunaAcoes);
        listaProdutos.append(linha);
    }
}

function excluirProduto(id) {
    if (confirm('Deseja realmente excluir este produto?') === false) return;
    for (let i = 0; i < produtosSalvos.length; i++) {
        if (produtosSalvos[i].id === id) { produtosSalvos.splice(i, 1); break; }
    }
    localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
    renderizarProdutos();
}

renderizarProdutos();