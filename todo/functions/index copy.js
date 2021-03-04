const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const authenticate = (req, res, next) => {
  const headers = req.headers;
  const { usuario, senha } = headers;
  if (usuario === "fabricio" && senha === "123456") {
    next();
  } else {
    return res.status(401).send();
  }
};

//http://127.0.0.1:5001/treinamento-cicopal/us-central1/cicopal/teste-query?nome=fabricio&idade=22&empresa=ffs
app.post("/teste-query", (req, res) => {
  const { nome, idade, empresa } = req.query;
  return res.send(
    `Olá ${nome} voce tem ${idade} anos de idade e trabalha na empresa ${empresa}`,
  );
});

app.use(authenticate);

//http://127.0.0.1:5001/treinamento-cicopal/us-central1/cicopal/teste-params/fabricio/22/ffs
app.post("/teste-params/:nome/:idade/:empresa", (req, res) => {
  const params = req.params;
  return res.send(`teste-params ${JSON.stringify(params)}`);
});

//http://127.0.0.1:5001/treinamento-cicopal/us-central1/cicopal/teste-params-opicionais/fabricio/22/ffs
app.post("/teste-params-opicionais/:nome?/:idade/:empresa?", (req, res) => {
  const params = req.params;
  return res.send(`teste-params-opicionais ${JSON.stringify(params)}`);
});

app.post("/teste-body", (req, res) => {
  const body = req.body;
  return res.status(404).json(body);
});

exports.cicopal = functions.https.onRequest(app);
