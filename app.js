//Importando as bibliotecas necessárias na aplicação
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes/routes')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/toroinvestimentos').then(() => {
    console.log("Conectado ao banco de dados com sucesso!")
}).catch((error) => {
    console.log(error)
})

app.use(express.static('style'))
app.use(express.static('images'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors())

app.set('views', "./views")
app.set('view engine', 'ejs')

app.use(routes) // Importando as rotas

//Rotas
/*
app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/signup', (req, res) =>{
    res.render('signin')
})

app.post('/register/auth', (req, res) => {
    res.send("dados coletados" + req.body.name + req.body.email)
})*/

app.listen(3456)

