function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

const tabelaCarrinhoBody = document.querySelector("#tabela-carrinho tbody");
const totalEl = document.getElementById("total");
const btnLimpar = document.getElementById("btn-limpar");
const btnFinalizar = document.getElementById("btn-finalizar");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function mostrarCarrinho() {
  tabelaCarrinhoBody.innerHTML = "";

  if (carrinho.length === 0) {
    tabelaCarrinhoBody.innerHTML = `<tr><td colspan="6">Carrinho vazio.</td></tr>`;
    totalEl.textContent = "Total: R$ 0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((produto, index) => {
    const subtotal = produto.preco * produto.quantidade;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td><img src="${produto.imagem}" alt="${produto.nome}"></td>
      <td>R$ ${formatarPreco(produto.preco)}</td>
      <td>
        <input type="number" min="1" value="${produto.quantidade}" data-index="${index}" class="input-quantidade" />
      </td>
      <td>R$ ${formatarPreco(subtotal)}</td>
      <td><button class="btn-remove" data-index="${index}">X</button></td>
    `;
    tabelaCarrinhoBody.appendChild(tr);
  });

  totalEl.textContent = `Total: R$ ${formatarPreco(total)}`;

  ativarEventos();
}

function atualizarQuantidade(index, novaQtd) {
  if (novaQtd < 1) return;
  carrinho[index].quantidade = novaQtd;
  salvarCarrinho();
  mostrarCarrinho();
}

function removerProduto(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  mostrarCarrinho();
}

function limparCarrinho() {
  if (confirm("Tem certeza que quer limpar todo o carrinho?")) {
    carrinho = [];
    salvarCarrinho();
    mostrarCarrinho();
  }
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  carrinho = [];
  salvarCarrinho();
  mostrarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function ativarEventos() {
  document.querySelectorAll(".input-quantidade").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      const novaQtd = parseInt(e.target.value);
      if (isNaN(novaQtd) || novaQtd < 1) {
        e.target.value = carrinho[index].quantidade;
        return;
      }
      atualizarQuantidade(index, novaQtd);
    });
  });

  document.querySelectorAll(".btn-remove").forEach(botao => {
    botao.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      removerProduto(index);
    });
  });
}

// Inicializa
mostrarCarrinho();
btnLimpar.addEventListener("click", limparCarrinho);
btnFinalizar.addEventListener("click", finalizarCompra);
