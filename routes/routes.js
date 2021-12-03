const { application } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    return res.render('index')
})

router.get('/register', (req, res) =>{
    res.render('register')
})

router.get('/signup', (req, res) =>{
    res.render('signin')
})

router.post('/register/auth/sucess', (req, res) => {
    res.render('register_sucess')
})

router.post('/register/auth', (req, res) => {

    //Variável para armazenar os dados do novo usuário
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        password: req.body.password
    }
    console.log(newUser)
    res.redirect('/register/auth/sucess')
})

module.exports = router