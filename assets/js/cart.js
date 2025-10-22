function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

const tabelaCarrinhoBody = document.querySelector("#tabela-carrinho tbody");
const totalEl = document.getElementById("total");
const btnLimpar = document.getElementById("btn-limpar");
const btnFinalizar = document.getElementById("btn-finalizar");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ----------------------------
// Função Toast
// ----------------------------
function mostrarToast(mensagem) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = mensagem;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ----------------------------
// Carrinho
// ----------------------------
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
  mostrarToast("Produto removido do carrinho!");
}

function limparCarrinho() {
  // Cria a caixa de confirmação
  const confirmBox = document.createElement("div");
  confirmBox.id = "confirm-box";
  confirmBox.innerHTML = `
    <p>Tem certeza que quer limpar todo o carrinho?</p>
    <div class="confirm-buttons">
      <button id="btn-sim">Sim</button>
      <button id="btn-nao">Não</button>
    </div>
  `;
  document.body.appendChild(confirmBox);

  // Evento botão "Sim"
  document.getElementById("btn-sim").addEventListener("click", () => {
    carrinho = [];
    salvarCarrinho();
    mostrarCarrinho();
    mostrarToast("Carrinho limpo com sucesso!");
    document.body.removeChild(confirmBox);
  });

  // Evento botão "Não"
  document.getElementById("btn-nao").addEventListener("click", () => {
    document.body.removeChild(confirmBox);
  });
}



function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio!");
    return;
  }

  // Gera um número de pedido único
  const agora = new Date();
  const pedidoID = `PED-${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;

  // Salva os dados da compra
  const dadosCompra = {
    pedidoID,
    data: agora.toISOString(),
    produtos: carrinho
  };

  localStorage.setItem("ultimaCompra", JSON.stringify(dadosCompra));

  // Limpa o carrinho
  carrinho = [];
  salvarCarrinho();

  // Mostra toast e redireciona após 1s
  mostrarToast("Compra finalizada com sucesso!");
  setTimeout(() => {
    window.location.href = "receipt.html";
  }, 1000);
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


// Função para criar toast com confirmação
function mostrarConfirmacao(mensagem, callbackSim) {
  // Remove confirm se já existir
  let confirmBox = document.getElementById("confirm-box");
  if (confirmBox) confirmBox.remove();

  confirmBox = document.createElement("div");
  confirmBox.id = "confirm-box";
  confirmBox.className = "toast confirm";

  confirmBox.innerHTML = `
    <p>${mensagem}</p>
    <div class="confirm-buttons">
      <button id="btn-sim">Sim</button>
      <button id="btn-nao">Não</button>
    </div>
  `;

  document.body.appendChild(confirmBox);

  // Centraliza na tela
  confirmBox.style.position = "fixed";
  confirmBox.style.top = "50%";
  confirmBox.style.left = "50%";
  confirmBox.style.transform = "translate(-50%, -50%)";
  confirmBox.style.zIndex = "9999";

  // Eventos dos botões
  document.getElementById("btn-sim").addEventListener("click", () => {
    callbackSim();
    confirmBox.remove();
  });

  document.getElementById("btn-nao").addEventListener("click", () => {
    confirmBox.remove();
  });
}
