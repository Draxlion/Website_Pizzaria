const cartoes = require("../services/cartoesFakeDB");

function aprovarCompra(cartao, valor) {
  if (cartao.saldo + valor <= cartao.limite) {
    cartao.saldo += valor;
    return true;
  } else {
    return false;
  }
}

exports.realizarCompra = (req, res) => {
  const { numeroCartao, valor } = req.body;
  const cartao = cartoes.find((c) => c.numero === numeroCartao);
  if (!cartao) {
    return res.status(404).json({ mensagem: "Cartão não encontrado" });
  }
  if (aprovarCompra(cartao, valor)) {
    return res.json({ mensagem: "Compra aprovada", valor, saldo: cartao.saldo });
  } else {
    return res.status(402).json({ mensagem: "Compra não aprovada. Limite excedido." });
  }
};

exports.consultarSaldo = (req, res) => {
  const { numeroCartao } = req.params;
  const cartao = cartoes.find((c) => c.numero === numeroCartao);
  if (!cartao) {
    return res.status(404).json({ mensagem: "Cartão não encontrado" });
  }
  return res.json({ saldo: cartao.saldo, limite: cartao.limite });
};
