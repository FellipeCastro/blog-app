const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.render('formulario')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
