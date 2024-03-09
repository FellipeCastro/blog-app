const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Models
const { categorias } = require('../models/Categoria.js')

// Rotas Categorias
router.get('/categorias', (req,res) =>{
    categorias.find().lean().then((categorias) =>{
        res.render('admin/categorias', {categorias: categorias})
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategoria')
})

router.post('/categoria/nova', (req, res) => {
    const novaCategoria = new categorias({
        nome: req.body.nome,
        slug: req.body.slug
    })
    novaCategoria.save()
    res.redirect('/admin/categorias')
})

module.exports = router
