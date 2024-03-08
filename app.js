const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})

const { categorias } = require('./models/Categoria.js')

// ENV com dados do Mongo
require('dotenv').config()

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 5000

// Conexão com MongoDB
const Schema = mongoose.Schema
mongoose.conect(process.env.MONGO_DB, 
    {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDb Rodando')
    }).catch((err) => {
        console.log(`Erro ao conectar com MongoDB: ${err}`)
    })

app.get('/', (req, res) => {
    res.render('formulario')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
