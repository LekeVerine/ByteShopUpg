document.addEventListener("DOMContentLoaded", () => {
  console.log("Arquivo index.js carregado!");

  const token = localStorage.getItem("token");
  const userLogadoRaw = localStorage.getItem("userLogado");

  const logado = document.getElementById("logado");
  const produtosContainer = document.getElementById("produtos"); // Destaques
  const produtosCategoriasContainer = document.getElementById("produtosCategorias"); // Categoria

  // Funções básicas
  function abrirCarrinho() {
    window.location.href = "assets/html/cart.html";
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "assets/html/signin.html";
  }

  function atualizarContadorCarrinho() {
    const cartCount = document.getElementById("cart-count");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    if (cartCount) {
      cartCount.textContent = totalItens;
      cartCount.style.display = totalItens > 0 ? "inline-block" : "none";

      // Pequena animação quando adiciona item
      if (totalItens > 0) {
        cartCount.classList.add("pulse");
        setTimeout(() => cartCount.classList.remove("pulse"), 300);
      }
    }
  }

  // ----------------------------
  // Produtos em destaque (promoção)
  // ----------------------------
  const produtosDestaque = [
    { nome: "Teclado Mecânico RGB", precoAntigo: 399.90, preco: 299.90, imagem: "assets/images/teclado.jpg", categoria: "Teclados" },
    { nome: "Mouse Gamer 16000 DPI", precoAntigo: 249.90, preco: 189.90, imagem: "assets/images/mouse.jpg", categoria: "Mouses" },
    { nome: "Fone de Ouvido", precoAntigo: 199.90, preco: 159.90, imagem: "assets/images/fone.jpg", categoria: "Fones" },
    { nome: "Monitor 24\" Full HD", precoAntigo: 999.90, preco: 799.90, imagem: "assets/images/monitor.jpg", categoria: "Monitores" }
  ];

  const produtosCategoria = [
    ...produtosDestaque.filter(p => p.categoria === "Teclados"),
    { nome: "Teclado Gamer Compact", precoAntigo: 299.90, preco: 249.90, imagem: "assets/images/teclado2.jpg", categoria: "Teclados" },
    { nome: "Teclado Mecânico TKL", precoAntigo: 349.90, preco: 279.90, imagem: "assets/images/teclado3.jpg", categoria: "Teclados" },
    { nome: "Teclado RGB Wireless", precoAntigo: 449.90, preco: 379.90, imagem: "assets/images/teclado4.jpg", categoria: "Teclados" },

    ...produtosDestaque.filter(p => p.categoria === "Mouses"),
    { nome: "Mouse Sem Fio", precoAntigo: 199.90, preco: 159.90, imagem: "assets/images/mouse2.jpg", categoria: "Mouses" },
    { nome: "Mouse Gamer RGB", precoAntigo: 219.90, preco: 179.90, imagem: "assets/images/mouse3.jpg", categoria: "Mouses" },
    { nome: "Mouse Ergonomico", precoAntigo: 179.90, preco: 149.90, imagem: "assets/images/mouse4.jpg", categoria: "Mouses" },

    ...produtosDestaque.filter(p => p.categoria === "Fones"),
    { nome: "Fone Gamer RGB", precoAntigo: 249.90, preco: 199.90, imagem: "assets/images/fone2.jpg", categoria: "Fones" },
    { nome: "Fone Bluetooth", precoAntigo: 229.90, preco: 179.90, imagem: "assets/images/fone3.jpg", categoria: "Fones" },
    { nome: "Headset Profissional", precoAntigo: 299.90, preco: 249.90, imagem: "assets/images/fone4.jpg", categoria: "Fones" },

    ...produtosDestaque.filter(p => p.categoria === "Monitores"),
    { nome: "Monitor 27\" 144Hz", precoAntigo: 1299.90, preco: 1099.90, imagem: "assets/images/monitor2.jpg", categoria: "Monitores" },
    { nome: "Monitor Ultrawide 34\"", precoAntigo: 1799.90, preco: 1599.90, imagem: "assets/images/monitor3.jpg", categoria: "Monitores" },
    { nome: "Monitor LED 22\"", precoAntigo: 799.90, preco: 699.90, imagem: "assets/images/monitor4.jpg", categoria: "Monitores" }
  ];

  // ----------------------------
  // Função para renderizar produtos com animação
  // ----------------------------
  function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("show");

  // Esconde depois de 2,5 segundos
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

  function mostrarProdutos(listaProdutos, container) {
    container.innerHTML = "";

    listaProdutos.forEach((produto, index) => {
      const card = document.createElement("div");
      card.classList.add("produto-card", "fade-in"); // adiciona efeito fade-in

      card.style.animationDelay = `${index * 0.1}s`; // animação sequencial

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img" />
        <div class="produto-nome">${produto.nome}</div>
        <p class="preco-antigo">De: R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</p>
        <p class="preco-promocional">Por: R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
        <button class="btn-add" data-index="${index}">Adicionar ao carrinho</button>
      `;

      container.appendChild(card);
    });

    container.querySelectorAll(".btn-add").forEach(botao => {
      botao.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        let produtoSelecionado = listaProdutos[index];

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        const produtoExistente = carrinho.find(item => item.nome === produtoSelecionado.nome);

        if (produtoExistente) {
          produtoExistente.quantidade += 1;
        } else {
          carrinho.push({ ...produtoSelecionado, quantidade: 1 });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarContadorCarrinho();

        // Animação de destaque no botão
        e.target.classList.add("added");
        setTimeout(() => e.target.classList.remove("added"), 300);

        mostrarToast(`${produtoSelecionado.nome} adicionado ao carrinho!`);

      });
    });
  }

  // ----------------------------
  // Inicializações
  // ----------------------------
  if (token && userLogadoRaw) {
    try {
      const userLogado = JSON.parse(userLogadoRaw);
      logado.textContent = `Olá, ${userLogado.nome || ''}`;
      logado.style.display = "block";

      document.getElementById("btn-sair").addEventListener("click", sair);
      window.abrirCarrinho = abrirCarrinho;

      // Produtos em destaque
      mostrarProdutos(produtosDestaque, produtosContainer);

      // Produtos por categoria
      mostrarProdutos(produtosCategoria, produtosCategoriasContainer);

      atualizarContadorCarrinho();

    } catch (err) {
      console.error(err);
      alert("Erro ao carregar informações. Faça login novamente.");
      window.location.href = "assets/html/signin.html";
    }
  } else {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "assets/html/signin.html";
  }

  // ----------------------------
  // Filtragem por categoria
  // ----------------------------
  const botoesCategoria = document.querySelectorAll(".categoria-btn");
  if (botoesCategoria.length && produtosCategoriasContainer) {
    botoesCategoria.forEach(botao => {
      botao.addEventListener("click", () => {
        const categoriaSelecionada = botao.getAttribute("data-categoria");

        if (categoriaSelecionada === "Todos") {
          mostrarProdutos(produtosCategoria, produtosCategoriasContainer);
        } else {
          const filtrados = produtosCategoria.filter(p => p.categoria === categoriaSelecionada);
          mostrarProdutos(filtrados, produtosCategoriasContainer);
        }

        // Ativa botão selecionado
        botoesCategoria.forEach(b => b.classList.remove("active"));
        botao.classList.add("active");
      });
    });
  }

  // ----------------------------
  // Filtragem por pesquisa na seção de categorias
  // ----------------------------
  const searchCategoriaInput = document.getElementById("searchCategoriaInput");
  if (searchCategoriaInput) {
    searchCategoriaInput.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();
      const filtrados = produtosCategoria.filter(p => p.nome.toLowerCase().includes(termo));
      mostrarProdutos(filtrados, produtosCategoriasContainer);
    });
  }

});
 
function scrollPara(id) {
  const elemento = document.getElementById(id);
  if(elemento) {
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
}


