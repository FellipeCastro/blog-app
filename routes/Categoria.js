const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Models
const { categorias } = require('../models/Categoria.js')

// Rotas Categorias
router.get('/categorias', (req, res) => {
    categorias.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    })
})

module.exports = router
