const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
