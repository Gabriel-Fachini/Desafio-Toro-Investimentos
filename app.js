//Importando os módulos necessários para aplicação
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const routes = require('./routes/routes')
const passport = require('passport')
require('./config/auth')(passport)

//Configurações iniciais da aplicação
const app = express()

//Conectando ao banco de dados
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/toroinvestimentos').then(() => {
    console.log("Conectado ao banco de dados com sucesso!")
}).catch((error) => {
    console.log(error)
})

//Configurações dos módulos
    //Configurações de sessão
    app.use(session({
        secret: "toroinvestimentos",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    //Configurações de arquivos estáticos
    app.use(express.static('style'))
    app.use(express.static('images'))

    //Configurações do body-parser
    app.use(bodyparser.urlencoded({extended: false}))
    app.use(bodyparser.json())

    //Configurando a view-engine
    app.set('views', "./views")
    app.set('view engine', 'ejs')

    //Importando o arquivo de rotas
    app.use(routes)

//Inicializando a aplicação na porta 3456
app.listen(3456)

