// Meninos, vou adicionar comentários pra nos ajudar a entender o que to fazendo kkkk

// Animações globais

ScrollReveal().reveal('#cta', {
    origin: 'left',
    duration: 2000,
    distance: '20%'
});

ScrollReveal().reveal('.dish', {
    origin: 'left',
    duration: 2000,
    distance: '20%'
});

ScrollReveal().reveal('#testimonals_image', {
    origin: 'left',
    duration: 1000,
    distance: '20%'
});

ScrollReveal().reveal('.feedback', {
    origin: 'right',
    duration: 2000,
    distance: '20%'
});

ScrollReveal().reveal('#primary', {
    origin: 'left',
    duration: 2000,
    distance: '20%'
});

// ------------------------------------------------------------------------------------

//Funcionalidades do carrinho (Botões e tals)

$(document).ready(function () {
    const cartSidebar = $('.cart-sidebar');
    const openCartButton = $('#open-cart-sidebar');
    const closeCartButton = $('#close-cart-sidebar');
    const cartItemsList = $('.cart-items');
    const cartTotalValue = $('#cart-total-value');
    const pizzaItemAddButtons = $('.boxs_price button#pizza_item_add'); // Seletor para os botões de adicionar

    let cart = []; // Array para armazenar os itens do carrinho

    // abrir o sidebar do carrinho
    openCartButton.on('click', function () {
        cartSidebar.addClass('open');
    });

    // fechar o sidebar do carrinho
    closeCartButton.on('click', function () {
        cartSidebar.removeClass('open');
    });

    // adicionar um item ao carrinho
    function addItemToCart(name, price, imageSrc) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: parseFloat(price),
                image: imageSrc,
                quantity: 1
            });
        }
        updateCartDisplay();
    }

    // Event listener para os botões de "Adicionar ao Carrinho"
    pizzaItemAddButtons.on('click', function () {
        const box = $(this).closest('.boxs');
        const itemName = box.find('.boxs_title').text();
        const itemPriceText = box.find('.boxs_price h4').text().replace('R$ ', '').replace(',', '.');
        const itemPrice = parseFloat(itemPriceText);
        const itemImageSrc = box.find('.boxs_image').attr('src');
        addItemToCart(itemName, itemPrice, itemImageSrc);
    });

    //remover um item do carrinho
    function removeItemFromCart(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        updateCartDisplay();
    }

    // atualizar a exibição do carrinho
    function updateCartDisplay() {
        cartItemsList.empty();
        let total = 0;

        cart.forEach(item => {
            const listItem = $('<li>');
            listItem.html(`
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <button class="remove-item" data-item-name="${item.name}">Remover</button>
            `);
            cartItemsList.append(listItem);
            total += item.price * item.quantity;
        });

        cartTotalValue.text(total.toFixed(2));

        // Adiciona event listener para os botões de remover APÓS serem adicionados ao DOM
        $('.remove-item').on('click', function () {
            const itemNameToRemove = $(this).data('item-name');
            removeItemFromCart(itemNameToRemove);
        });
    }

    
    updateCartDisplay();
});


// modal

$(document).ready(function () {
    const cartSidebar = $('.cart-sidebar');
    const openCartButton = $('#open-cart-sidebar');
    const closeCartButton = $('#close-cart-sidebar');
    const cartItemsList = $('.cart-items');
    const cartTotalValue = $('#cart-total-value');
    const pizzaItemAddButtons = $('.boxs_price button#pizza_item_add');
    const cartModal = $('#cartModal');
    const closeModalButton = $('.close-button');
    const modalItemName = $('#modal-item-name');
    const pizzaSizesContainer = $('#pizza-sizes');
    const sizeButtons = $('.size-button');
    const selectedPizzaSizeInput = $('#selected-pizza-size');
    const selectedSizeMultiplierInput = $('#selected-size-multiplier');
    const additionalOptions = $('#additional-options input[type="checkbox"]');
    const itemObservationsInput = $('#item-observations');
    const addToCartWithOptionsButton = $('#add-to-cart-with-options');
    const cancelAddToCartButton = $('#cancel-add-to-cart');
    const checkoutButton = $('#checkout-button'); // Declaração
    const paymentModal = $('#paymentModal');
    const paymentCloseButton = $('.payment-close-button');

    let cart = [];
    let currentItem = null;

    // abrir o sidebar do carrinho
    openCartButton.on('click', function () {
        cartSidebar.addClass('open');
    });

    // fechar o sidebar do carrinho
    closeCartButton.on('click', function () {
        cartSidebar.removeClass('open');
    });

    // detalhes do item
    pizzaItemAddButtons.on('click', function () {
        const box = $(this).closest('.boxs');
        const itemName = box.find('.boxs_title').text();
        const itemBasePriceText = box.find('.boxs_price h4').text().replace('R$ ', '').replace(',', '.');
        const itemBasePrice = parseFloat(itemBasePriceText);
        const itemImageSrc = box.find('.boxs_image').attr('src');

        currentItem = {
            name: itemName,
            basePrice: itemBasePrice,
            image: itemImageSrc
        };

        modalItemName.text(itemName);
        cartModal.css('display', 'block');

        // Resetar modal ao abrir
        sizeButtons.removeClass('active');
        pizzaSizesContainer.find('[data-size="grande"]').addClass('active'); // Define Grande como padrão
        selectedPizzaSizeInput.val('grande');
        selectedSizeMultiplierInput.val('1.05');
        additionalOptions.prop('checked', false);
        itemObservationsInput.val('');
    });

    // Event listener para os botões de tamanho
    sizeButtons.on('click', function () {
        sizeButtons.removeClass('active');
        $(this).addClass('active');
        selectedPizzaSizeInput.val($(this).data('size'));
        selectedSizeMultiplierInput.val($(this).data('multiplier'));
    });

    // fechar o modal
    closeModalButton.on('click', function () {
        cartModal.css('display', 'none');
        currentItem = null;
    });

    cancelAddToCartButton.on('click', function () {
        cartModal.css('display', 'none');
        currentItem = null;
    });

    //adicionar o item ao carrinho com as opções selecionadas
    addToCartWithOptionsButton.on('click', function () {
        if (currentItem) {
            const size = selectedPizzaSizeInput.val();
            const sizeMultiplier = parseFloat(selectedSizeMultiplierInput.val());
            const finalPrice = currentItem.basePrice * sizeMultiplier;
            const selectedAdditionals = [];
            let additionalPrice = 0;
            const observations = itemObservationsInput.val();

            additionalOptions.each(function () {
                if ($(this).is(':checked')) {
                    selectedAdditionals.push($(this).val());
                    const priceText = $(this).parent().text().match(/\(+R\$ (\d+\,\d+)\)/);
                    if (priceText && priceText[1]) {
                        additionalPrice += parseFloat(priceText[1].replace(',', '.'));
                    }
                }
            });

            const cartItem = {
                name: currentItem.name,
                basePrice: currentItem.basePrice,
                finalPrice: parseFloat((finalPrice + additionalPrice).toFixed(2)), // Preço final 
                image: currentItem.image,
                size: size,
                additionals: selectedAdditionals,
                observations: observations,
                quantity: 1
            };

            const existingItem = cart.find(item =>
                item.name === cartItem.name &&
                item.size === cartItem.size &&
                JSON.stringify(item.additionals.sort()) === JSON.stringify(cartItem.additionals.sort()) &&
                item.observations === cartItem.observations
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(cartItem);
            }

            updateCartDisplay();
            cartModal.css('display', 'none');
            currentItem = null;
        }
    });

    // remover um item do carrinho
    function removeItemFromCart(itemName, itemSize, itemAdditionals, itemObservations) {
        cart = cart.filter(item => !(
            item.name === itemName &&
            item.size === itemSize &&
            JSON.stringify(item.additionals.sort()) === JSON.stringify(itemAdditionals.sort()) &&
            item.observations === itemObservations
        ));
        updateCartDisplay();
    }

    // atualizar a exibição do carrinho
    function updateCartDisplay() {
        cartItemsList.empty();
        let total = 0;

        cart.forEach(item => {
            const listItem = $('<li>');
            let details = `<span>Tamanho: ${item.size}</span>`;
            if (item.additionals.length > 0) {
                details += `<br><span>Adicionais: ${item.additionals.join(', ')}</span>`;
            }
            if (item.observations) {
                details += `<br><span>Obs: ${item.observations}</span>`;
            }

            listItem.html(`
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    ${details}
                    <span>R$ ${item.finalPrice.toFixed(2)} x ${item.quantity}</span>
                </div>
                <button class="remove-item"
                        data-item-name="${item.name}"
                        data-item-size="${item.size}"
                        data-item-additionals='${JSON.stringify(item.additionals)}'
                        data-item-observations="${item.observations}">
                    Remover
                </button>
            `);
            cartItemsList.append(listItem);
            total += item.finalPrice * item.quantity;
        });

        cartTotalValue.text(total.toFixed(2));

        // Adiciona event listener para os botões de remover APÓS serem adicionados ao DOM
        $('.remove-item').on('click', function () {
            const itemNameToRemove = $(this).data('item-name');
            const itemSizeToRemove = $(this).data('item-size');
            const itemAdditionalsToRemove = JSON.parse($(this).data('item-additionals'));
            const itemObservationsToRemove = $(this).data('item-observations');
            removeItemFromCart(itemNameToRemove, itemSizeToRemove, itemAdditionalsToRemove, itemObservationsToRemove);
        });
    }

    //exibição 
    updateCartDisplay();


// metodo de pagamento
// Abrir o modal de pagamento ao clicar em "Finalizar Compra"
    checkoutButton.on('click', function () {
        if (cart.length > 0) {
            paymentModal.css('display', 'block');
        } else {
            alert("Seu carrinho está vazio. Adicione itens para finalizar a compra.");
        }
    });

    // Fechar o modal de pagamento ao clicar no botão de fechar
    paymentCloseButton.on('click', function () {
        paymentModal.css('display', 'none');
    });

    // Fechar o modal de pagamento ao clicar fora dele
    $(window).on('click', function (event) {
        if (event.target == paymentModal[0]) {
            paymentModal.css('display', 'none');
        }
    });

        //exibição
        updateCartDisplay();
});

// pagamento via pix
document.addEventListener('DOMContentLoaded', function () {
    const paymentModal = document.getElementById('paymentModal');
    const pixModal = document.getElementById('pixModal');
  
    const closePaymentBtn = document.querySelector('.payment-close-button');
    const closePixBtn = document.querySelector('.pix-close-button');
    const pixBtn = document.querySelector('.pix');
    const finalizarPedidoBtn = document.getElementById('checkout-button');

    // Abre o modal de formas de pagamento ao clicar no botão "Finalizar Pedido"
  finalizarPedidoBtn.onclick = function () {
    paymentModal.style.display = 'block';
  };

  // Abre o modal de PIX
  pixBtn.onclick = function () {
    paymentModal.style.display = 'none';
    pixModal.style.display = 'block';
  };
  
    // Fechar modais
    closePaymentBtn.onclick = function () {
      paymentModal.style.display = 'none';
    };
  
    closePixBtn.onclick = function () {
      pixModal.style.display = 'none';
    };
  
    // Fechar modal ao clicar fora
    window.onclick = function (event) {
      if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
      } else if (event.target === pixModal) {
        pixModal.style.display = 'none';
      }
    };
  });
  
  
