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

router.get('/categorias/edit/:id', (req, res) => {
    categorias
        .findOne({
            _id: req.params.id
        })
        .lean()
        .then((categorias) => {
            res.render('admin/editcategoria', {categorias: categorias})
        })
})

router.post('/categorias/edit', (req, res) => {
    let filter = { _id: req.body.id }
    let update = { nome: req.body.nome, slug: req.body.slug }

    categorias
        .findByIdAndUpdate(filter, update)
        .then(() => {
            res.redirect('/admin/categorias')
        })
        .catch(err => {
            console.log(`Erro ao atualizar categorias: ${err}`)
        })
})

router.post('/categoria/apagar', (req, res) => {
    categorias
        .deleteOne({
            _id: req.body.id
        })
        .then(() => {
            res.redirect('/admin/categorias')
        })
})

module.exports = router
