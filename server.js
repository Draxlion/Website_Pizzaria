 // server.js
const express = require('express');
const cartaoRoutes = require("./routes/cartaoRoutes");

const cors = require('cors');
const app = express();
const port = 3000;

const clientesRoutes = require('./routes/clientes');
const pizzasRoutes = require('./routes/pizzas');
const pedidosRoutes = require('./routes/pedidos');

app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/clientes', clientesRoutes);
app.use('/pizzas', pizzasRoutes);
app.use('/pedidos', pedidosRoutes);

app.use("/cartao", cartaoRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'pizzaria_paradiso'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
}); 

module.exports = connection;






