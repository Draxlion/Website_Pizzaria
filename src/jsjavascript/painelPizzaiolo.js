document.addEventListener('DOMContentLoaded', function () {
    const pedidos = [
        {
            id: 1,
            produto: "Pizza Calabresa",
            bebida: "Coca-Cola",
            tamanho: "Grande",
            adicionais: "Borda Recheada",
            observacoes: "Sem cebola",
            status: "Recebido"
        },
        {
            id: 2,
            produto: "Pizza Quatro Queijos",
            tamanho: "Média",
            status: "Recebido"
        },
        {
            id: 3,
            produto: "Pizza Portuguesa",
            bebida: "Guaraná",
            tamanho: "Grande",
            adicionais: "Extra queijo",
            observacoes: "Bem assada",
            status: "Recebido"
        },
        {
            id: 4,
            produto: "Pizza Portuguesa",
            bebida: "Guaraná",
            tamanho: "Grande",
            adicionais: "Extra queijo",
            observacoes: "Bem assada",
            status: "Recebido"
        },
        {
            id: 5,
            produto: "Pizza Portuguesa",
            bebida: "Guaraná",
            tamanho: "Grande",
            adicionais: "Extra queijo",
            observacoes: "Bem assada",
            status: "Recebido"
        }
    ];

    const statusColumns = {
        "Recebido": document.getElementById('recebido'),
        "Em Preparo": document.getElementById('preparo'),
        "Em pronto": document.getElementById('pronto'),
        "Concluído": document.getElementById('entrega')
    };

    function renderPedidos() {
        for (let status in statusColumns) {
            statusColumns[status].innerHTML = '';
        }

        pedidos.forEach(pedido => {
            const card = document.createElement('div');
            card.className = 'card-pedido';
            setTimeout(() => {
                card.classList.add('mostrar');
            }, 50);
            card.innerHTML = `
                <p><strong>Pedido Nº:</strong> ${pedido.id}</p>
                <p><strong>Produto:</strong> ${pedido.produto}</p>
                ${pedido.bebida ? `<p><strong>Bebida:</strong> ${pedido.bebida}</p>` : ''}
                <p><strong>Tamanho:</strong> ${pedido.tamanho}</p>
                ${pedido.adicionais ? `<p><strong>Adicionais:</strong> ${pedido.adicionais}</p>` : ''}
                ${pedido.observacoes ? `<p><strong>Obs:</strong> ${pedido.observacoes}</p>` : ''}
                <div class="botoes">
                    ${pedido.status !== 'Recebido' ? `<button class="botao botao-voltar" data-id="${pedido.id}">Voltar</button>` : ''}
                    ${pedido.status !== 'Concluído' ? `<button class="botao botao-avancar" data-id="${pedido.id}">Avançar</button>` : ''}
                </div>
            `;
            statusColumns[pedido.status].appendChild(card);
        });

        adicionarEventosBotoes();
    }

    function adicionarEventosBotoes() {
        document.querySelectorAll('.botao-avancar').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const pedido = pedidos.find(p => p.id === id);
                if (pedido) {
                    if (pedido.status === "Recebido") pedido.status = "Em Preparo";
                    else if (pedido.status === "Em Preparo") pedido.status = "Em pronto";
                    else if (pedido.status === "Em pronto") pedido.status = "Concluído";
                    renderPedidos();
                }
            });
        });

        document.querySelectorAll('.botao-voltar').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const pedido = pedidos.find(p => p.id === id);
                if (pedido) {
                    if (pedido.status === "Concluído") pedido.status = "Em pronto";
                    else if (pedido.status === "Em pronto") pedido.status = "Em Preparo";
                    else if (pedido.status === "Em Preparo") pedido.status = "Recebido";
                    renderPedidos();
                }
            });
        });
    }

    renderPedidos();
});
