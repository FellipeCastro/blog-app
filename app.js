const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const handlebars = exphbs.create({})

// Encoded
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Diretorio publico
app.use(express.static(path.join(__dirname, '/public')))

// Importar Models
const { categorias } = require('./models/Categoria.js')

// Rotas
const categoria = require('./routes/Categoria.js')

// Rotas para uso
app.use('/admin', categoria)

// Template Engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// ENV com dados do Mongo
require('dotenv').config()

const PORT = process.env.PORT || 5000

// Conexão com MongoDB
const Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_DB, /*{useNewUrlParser: true} */)
    .then(() => {
        console.log('MongoDB Rodando')
    }).catch((err) => {
        console.log(`Erro ao conectar com MongoDB: ${err}`)
    })

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
