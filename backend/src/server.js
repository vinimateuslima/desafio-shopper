// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


require("./db/conn");

// Defina uma rota simples
app.get('/', (req, res) => {
  res.send('Backend está funcionando');
});

const driverRoutes = require("./routes");

app.use("/ride", driverRoutes);

// Iniciar o servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
