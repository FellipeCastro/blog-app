const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passaport = require('passport')
const path = require('path')
const handlebars = exphbs.create({})

// Encoded
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Diretorio publico
app.use(express.static(path.join(__dirname, '/public')))

// Importar Models
const { categorias } = require('./models/Categoria.js')
const { postagens } = require('./models/Postagem.js')

// Rotas
const categoria = require('./routes/Categoria.js')
const usuario = require('./routes/usuario.js')
const postagem = require('./routes/postagem.js')

// Rotas para uso
app.use('/admin', categoria)
app.use('/admin', usuario)
app.use('/admin', postagem)

// Sessão
app.use(session({
    secret: 'blog',
    resave: true,
    saveUninitialized: true
}))

app.use(passaport.initialize())
app.use(passaport.session())

// Template Engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// ENV com dados do Mongo
require('dotenv').config()

// Home page
app.get('/', (req, res) => {
    postagens
        .find()
        .populate('categoria')
        .sort({date: 'desc'})
        .lean()
        .then((postagens) =>{
            res.render('home', { postagens: postagens })
        }).catch((err) => {
            res.redirect("/404")
        })
})

app.get('/:id', (req, res) => {
    postagens
        .findOne({ slug: req.params.id })
        .lean()
        .then((postagens) => {
            res.render('ler', { postagens: postagens })
        }).catch((err) => {
            res.redirect("/404")
        })
})

// Conexão com MongoDB
const Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_DB, /*{useNewUrlParser: true} */)
    .then(() => {
        console.log('MongoDB Rodando')
    }).catch((err) => {
        console.log(`Erro ao conectar com MongoDB: ${err}`)
    })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
