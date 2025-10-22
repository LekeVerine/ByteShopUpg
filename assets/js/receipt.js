const dadosCompra = JSON.parse(localStorage.getItem("ultimaCompra"));

if (!dadosCompra) {
  document.body.innerHTML = "<h2 style='text-align:center;'>Nenhum comprovante disponível.</h2>";
} else {
  const tabelaBody = document.querySelector("#tabela-comprovante tbody");
  const totalCompra = document.getElementById("total-compra");
  const dataCompra = document.getElementById("data-compra");

  const produtos = dadosCompra.produtos;
  const data = new Date(dadosCompra.data);
  let total = 0;

  // Exibe data e número do pedido
  dataCompra.innerHTML = `
    <strong>Número do pedido:</strong> ${dadosCompra.pedidoID}<br>
    Data da compra: ${data.toLocaleDateString()} às ${data.toLocaleTimeString()}
  `;

  produtos.forEach(produto => {
    const subtotal = produto.preco * produto.quantidade;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
      <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
    `;
    tabelaBody.appendChild(tr);
  });

  totalCompra.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}
