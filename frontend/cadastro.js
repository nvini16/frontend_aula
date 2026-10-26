const formulario = document.querySelector('#formProduto');
const mensagem = document.querySelector('#mensagem');
let produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
const parametros = new URLSearchParams(window.location.search);
const idParaEditar = parametros.get('id');
const estaEditando = idParaEditar !== null;

if (estaEditando) {
    document.querySelector('#tituloFormulario').textContent = 'Editar produto';
    document.querySelector('#botaoSalvar').textContent = 'Atualizar produto';
    for (let i = 0; i < produtosSalvos.length; i++) {
        if (String(produtosSalvos[i].id) === String(idParaEditar)) {
            document.querySelector('#nome').value = produtosSalvos[i].nome;
            document.querySelector('#categoria').value = produtosSalvos[i].categoria;
            document.querySelector('#preco').value = produtosSalvos[i].preco;
            document.querySelector('#estoque').value = produtosSalvos[i].estoque;
            document.querySelector('#status').value = produtosSalvos[i].status;
            document.querySelector('#descricao').value = produtosSalvos[i].descricao;
            break;
        }
    }
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.querySelector('#nome').value.trim();
    const categoria = document.querySelector('#categoria').value;
    const preco = document.querySelector('#preco').value;
    const estoque = document.querySelector('#estoque').value;
    const status = document.querySelector('#status').value;
    const descricao = document.querySelector('#descricao').value.trim();
    mensagem.classList.remove('erro', 'sucesso');

    if (nome === '' || categoria === '' || preco === '' || estoque === '' || status === '' || descricao === '') {
        mensagem.textContent = 'Erro: preencha todos os campos.';
        mensagem.classList.add('erro');
        return;
    }

    if (estaEditando) {
        for (let i = 0; i < produtosSalvos.length; i++) {
            if (String(produtosSalvos[i].id) === String(idParaEditar)) {
                produtosSalvos[i].nome = nome; produtosSalvos[i].categoria = categoria; produtosSalvos[i].preco = Number(preco); produtosSalvos[i].estoque = Number(estoque); produtosSalvos[i].status = status; produtosSalvos[i].descricao = descricao;
                break;
            }
        }
        localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
        mensagem.textContent = 'Produto atualizado com sucesso!';
    } else {
        const proximoId = Number(localStorage.getItem('proximoId')) || 1;
        const novoProduto = { id: proximoId, nome, categoria, preco: Number(preco), estoque: Number(estoque), status, descricao };
        produtosSalvos.push(novoProduto);
        localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
        localStorage.setItem('proximoId', proximoId + 1);
        mensagem.textContent = 'Produto cadastrado com sucesso!';
    }
    mensagem.classList.add('sucesso');
    formulario.reset();
    if (estaEditando) setTimeout(function () { window.location.href = 'index.html'; }, 700);
});