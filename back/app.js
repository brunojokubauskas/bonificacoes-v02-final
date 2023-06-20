const express = require('express');
const cors = require('cors');

const funcionarioRouter = require('./src/routes/funcionario.route');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', funcionarioRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
