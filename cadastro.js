const formulario = document.querySelector("#formProduto");
const mensagem = document.querySelector("#mensagem");

let produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || []
const parametros = new URLSearchParams(window.location.search)
const idParaEditar = parametros.get("id")
let modoEdicao = false;

if(idParaEditar !== null) {
    modoEdicao = true;

    const botao = document.querySelector('button')
    botao.textContent = "Atualizar"
    
    for (let i = 0; i < produtosSalvos.length; i++) {
        if(String(produtosSalvos[i].id) === String(idParaEditar)) {
          document.querySelector("#nome").value = produtosSalvos[i].nome
          document.querySelector("#preco").value = produtosSalvos[i].preco
          document.querySelector("#categoria").value = produtosSalvos[i].categoria
          break;
        }
    }
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const preco = document.querySelector("#preco").value.trim();
    const categoria = document.querySelector("#categoria").value.trim();

    // console.log(nome + " " + preco + " " + categoria)

    mensagem.classList.remove("erro", "sucesso");

    if(nome === "" || preco === "" || categoria === ""){
        mensagem.textContent = "Erro: preencha todos os campos."
        mensagem.classList.add("erro");
        return;
    }

    if (modoEdicao === true) {
        for (let i = 0; i < produtosSalvos.length; i ++) {
            if (String(produtosSalvos[i].id ) === idParaEditar) {
                produtosSalvos[i].nome = nome;
                produtosSalvos[i].preco = preco;
                produtosSalvos[i].categoria = categoria;
                break;

            }
        }

        mensagem.textContent = "Sucessp produto atualizado!"
    } else {

        
        // const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || []
        const proximoId = Number(localStorage.getItem("proximoId")) || 1
        
        const novoProduto = {
            id: proximoId,
            nome: nome,
            preco: Number(preco),
            categoria: categoria
        }
        
        produtosSalvos.push(novoProduto);
        localStorage.setItem("produtos", JSON.stringify(produtosSalvos));
        
        localStorage.setItem("proximoId", proximoId + 1)
        
        mensagem.textContent = "Sucesso! O produto " + nome + " foi cadastrado com o ID: " + proximoId
    }
    mensagem.classList.add("sucesso");

    formulario.reset();
})