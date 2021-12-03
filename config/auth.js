//Importanto módulos necessários
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Model de usuário
require('../models/user')
const user = mongoose.model('users')

//Exportanto esse arquivo
module.exports = function (passport){

    //Realizando autenticação
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {

        user.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false)
            }
            
            bcrypt.compare(password, usuario.password, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        user.findById(id, (erro, usuario) => {
            done(erro, usuario)
        })
    })

}