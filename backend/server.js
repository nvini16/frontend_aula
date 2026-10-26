const express = require('express');
const app = express();
const porta = 3000;


app.listen(porta, () => {
    console.log(`Servidor ligado na porta: http://localhost:${porta}`)
});