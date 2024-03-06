const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const handlebars = exphbs.create({})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 5000

// MongoDB

const Schema = mongoose.Schema
mongoose.conect(process.envMONGO_DB, 
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
