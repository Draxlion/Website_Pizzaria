const bebidas = [
    { nome: "Coca-Cola 2L", descricao: "Refrigerante Coca-Cola de 2 Litros", preco: 10.00, status: "Ativo" },
    { nome: "Guaraná Antártica 2L", descricao: "Refrigerante Guaraná Antártica 2L gelado", preco: 9.00, status: "Ativo" },
    { nome: "Sprite 2L", descricao: "Refrigerante de limão 2L", preco: 9.00, status: "Ativo" },
    { nome: "Pepsi 2L", descricao: "Pepsi tradicional de 2 Litros", preco: 8.50, status: "Ativo" },
    { nome: "Fanta Laranja 2L", descricao: "Fanta sabor laranja, 2 Litros", preco: 9.50, status: "Ativo" },
    { nome: "Antarctica", descricao: "Cerveja Antarctica 1L", preco: 17.00, status: "Ativo" },
    { nome: "Brahma", descricao: "Cerveja Brahma 1L", preco: 12.00, status: "Ativo" },
    { nome: "Heineken", descricao: "Cerveja Heineken 600ml", preco: 17.00, status: "Ativo" }
  ];

  let bebidaEditando = null;

  function renderizarBebidas() {
    const tbody = document.getElementById("tabela-bebidas");
    tbody.innerHTML = "";
    bebidas.forEach((bebida, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${(index + 1).toString().padStart(2, '0')}</td>
        <td>${bebida.nome}</td>
        <td>${bebida.descricao}</td>
        <td>R$ ${bebida.preco.toFixed(2)}</td>
        <td class="status">${bebida.status}</td>
        <td>
          <button class="edit" onclick="openEditModal(${index})">Editar</button>
          <button class="delete ${bebida.status === 'Ativo' ? 'btn-danger' : 'btn-success'}" onclick="toggleStatus(this)">${bebida.status === 'Ativo' ? 'Desativar' : 'Ativar'}</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function toggleStatus(botao) {
    const linha = botao.closest("tr");
    const statusCell = linha.querySelector(".status");
  
    if (statusCell.innerText === "Ativo") {
      statusCell.innerText = "Inativo";
      botao.innerText = "Ativar";
      botao.classList.remove("btn-danger", "delete");
      botao.classList.add("btn-success");
    } else {
      statusCell.innerText = "Ativo";
      botao.innerText = "Desativar";
      botao.classList.remove("btn-success");
      botao.classList.add("btn-danger", "delete");
    }
  }
  

  function openEditModal(index) {
    bebidaEditando = index;
    const bebida = bebidas[index];
    document.getElementById("editNome").value = bebida.nome;
    document.getElementById("editDescricao").value = bebida.descricao;
    document.getElementById("editPreco").value = bebida.preco.toFixed(2);
    document.getElementById("editModal").style.display = "flex";
  }

  function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
  }

  document.getElementById("salvarEdicao").addEventListener("click", () => {
    if (bebidaEditando !== null) {
      bebidas[bebidaEditando].nome = document.getElementById("editNome").value;
      bebidas[bebidaEditando].descricao = document.getElementById("editDescricao").value;
      bebidas[bebidaEditando].preco = parseFloat(document.getElementById("editPreco").value);
      renderizarBebidas();
      closeEditModal();
    }
  });

  function buscarBebida() {
    const termo = document.getElementById("busca-bebida").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabela-bebidas tr");
    linhas.forEach(linha => {
      const nome = linha.children[1].textContent.toLowerCase();
      linha.style.display = nome.includes(termo) ? "" : "none";
    });
  }

  window.onclick = function(e) {
    if (e.target.classList.contains("modal")) closeEditModal();
  }

  renderizarBebidas();