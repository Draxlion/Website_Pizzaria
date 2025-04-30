
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS pizzaria_paradiso;
USE pizzaria_paradiso;

-- Tabela de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

-- Tabela de pizzas
CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255)
);

-- Tabela de bebidas
CREATE TABLE bebidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255)
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    forma_pagamento ENUM('cartao', 'dinheiro') NOT NULL,
    status_entrega ENUM('pendente', 'em_preparo', 'em_transporte', 'entregue') DEFAULT 'pendente',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabela de itens do pedido
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    tipo ENUM('pizza', 'bebida') NOT NULL,
    item_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    tamanho VARCHAR(20),
    adicionais TEXT,
    observacoes TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Inserção das pizzas salgadas
INSERT INTO pizzas (nome, descricao, preco, imagem) VALUES 
('Calabresa', 'Molho tradicional, Calabresa fatiada seara, cebola em rodelas, azeitonas, finalizada com orégano', 45.00, 'modelo1.jpg'),
('Marguerita', 'Queijo coberto com tomates fatiados com um toque de manjericão e molho de tomate', 63.00, 'modelo2.jpg'),
('Calzone de Portuguesa', 'Muçarela, presunto, ovos de codorna, palmito, milho, bacon e orégano.', 59.00, 'modelo3.jpg'),
('Quatro Queijos', 'Molho de tomate, muçarela, cremely, provolone, parmesão e azeite.', 68.00, 'modelo4.png'),
('Palmito', 'Fatias de palmito, muçarela, molho de tomate fresco e orégano', 40.00, 'modelo5.jpg'),
('Vegetariana', 'Escarola, molho especial, tomate em rodelas, milho, palmito e muçarela', 70.00, 'modelo6.jpg'),
('Bacon', 'Molho de tomate, catupiry, bacon frito, cebola roxa em fatia, azeitona e orégano', 49.00, 'modelo7.png'),
('Sardinha', 'Azeite, sardinha, muçarela, pimentão verde, cebola, azeitona e orégano', 38.00, 'modelo8.jpg');

-- Inserção das pizzas doces
INSERT INTO pizzas (nome, descricao, preco, imagem) VALUES 
('Chocolate com Morango', 'Cobertura de chocolate e morangos frescos.', 42.00, 'doce1.jpg'),
('Banana com Canela', 'Fatias de banana caramelizadas com açúcar e canela.', 39.00, 'doce2.jpg'),
('Romeu e Julieta', 'Queijo muçarela com goiabada cremosa.', 41.00, 'doce3.jpg'),
('Prestígio', 'Coco ralado e chocolate ao leite.', 45.00, 'doce4.jpg'),
('Brigadeiro', 'Cobertura de brigadeiro caseiro com granulado.', 43.00, 'doce5.jpg'),
('Nutella com Morango', 'Nutella cremosa e morangos.', 50.00, 'doce6.jpg'),
('Beijinho', 'Coco com leite condensado.', 40.00, 'doce7.jpg'),
('Sensação', 'Chocolate ao leite com morangos.', 46.00, 'doce8.jpg');

-- Inserção das bebidas
INSERT INTO bebidas (nome, descricao, preco, imagem) VALUES
('Coca-Cola 2L', 'Refrigerante Coca-Cola de 2 Litros.', 10.00, 'coca-2l.jpg'),
('Guaraná Antártica 2L', 'Refrigerante Guaraná Antártica 2L gelado.', 9.00, 'guarana-2l.jpg'),
('Sprite 2L', 'Refrigerante de limão 2L.', 9.00, 'sprite-2l.jpg'),
('Pepsi 2L', 'Pepsi tradicional de 2 Litros.', 8.50, 'pepsi-2l.jpg'),
('Fanta Laranja 2L', 'Fanta sabor laranja, 2 Litros.', 9.50, 'fanta-2l.jpg'),
('Água com Gás', 'Garrafa de água gaseificada.', 5.00, 'agua-gas.jpg'),
('Água sem Gás', 'Garrafa de água mineral sem gás.', 4.50, 'agua-sem-gas.jpg'),
('Schweppes Citrus', 'Bebida levemente gaseificada sabor citrus.', 7.50, 'schweppes.jpg');
