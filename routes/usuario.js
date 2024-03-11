const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Models
const { usuarios } = require('../models/Usuario.js')

// Rotas Usuarios
router.get('/usuarios', (req, res) => {
    usuarios
        .find()
        .lean()
        .then((usuarios) => {
            res.render('admin/usuarios', { usuarios: usuarios })
        })
})

router.get('/usuario/add', (req, res) => {
    res.render('admin/addusuario')
})

router.post('/usuario/novo', (req, res) => {
    const novoUsuario = new usuarios({
        nome: req.body.nome,
        email: req.body.email,
        senha : req.body.senha
    })
    novoUsuario.save()
    res.redirect('/admin/usuarios')
})

module.exports = router
