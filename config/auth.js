const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('../models/Usuario.js')
const Usuario = mongoose.model('usuarios')

module.exports = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        Usuario.findOne({ email: email }).lean().then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: 'Esta conta não existe' })
            } else {
                bcrypt.compare(senha, usuario.senha, (erro, senhaCorreta) => {
                    if (senhaCorreta) {
                        return done(null, usuario)
                    } else {
                        return done(null, false, { message: 'Senha incorreta' })
                    }
                })
            }
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario) // usuario.id
    })
    
    passport.deserializeUser((id, done) => {
        Usuario.findById(id).lean().then((usuario)=>{
            done(null, usuario)
        }).catch((err)=>{
             done (null, false, { message: 'Algo deu errado' })
        })
            
    })
}