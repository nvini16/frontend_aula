const listaProdutos = document.querySelector('tbody')

const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || []

produtosSalvos.forEach((produto) => {
    const linha = document.createElement("tr");

    const colunaId = document.createElement("td");
    colunaId.textContent = produto.id;

    const colunaNome = document.createElement("td");
    colunaNome.textContent = produto.nome;

    const colunaPreco = document.createElement("td");
    colunaPreco.textContent = "R$ " + produto.preco.toFixed(2);

    const colunaCategoria = document.createElement("td");
    colunaCategoria.textContent = produto.categoria;

    const colunaAcoes = document.createElement("td");
    colunaAcoes.classList.add("acoes")
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botaoEditar");

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.addEventListener("click", function() {
        excluirProduto(produto.id);
    })

    colunaAcoes.append(botaoEditar, botaoExcluir);
    linha.append(
        colunaId, 
        colunaNome, 
        colunaPreco, 
        colunaCategoria,
        colunaAcoes
    );
    listaProdutos.append(linha);
})

function excluirProduto(id) {
    const confirmou = confirm("Deseja realmente excluir o produto?");

    if(confirmou === false) {
        return;
    }

    for (let i = 0; i < produtosSalvos.length; i++) {
        if(produtosSalvos[i].id === id){
            produtosSalvos.splice(i, 1);
        }
    }

    localStorage.setItem("produtos", JSON.stringify(produtosSalvos))

}