//Importando módulos
const { application } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/user')
const user = mongoose.model('users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//Funções de validação
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validarCPF(cpf) {
	cpf = cpf.replace(/[^\d]+/g,'')

	if(cpf == null) {
        return false
    }
	// Elimina CPFs invalidos conhecidos
    //Transofrmando o cpf em um number
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999") {
            return false;	
        }
				
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))	{
            return false;
        }	
					
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }
				
	return true;   
}

//Rotas
    //Pagina inicial
    router.get('/', (req, res) => {
        return res.render('index')
    })

    //Pagina de cadastro
    router.get('/register', (req, res) =>{
        let errors = []
        res.render('register', {errors})
    })

    //Pagina de login
    router.get('/login', (req, res) =>{
        res.render('login')
    })

    //Pagina de cadastro com sucesso
    router.get('/register/auth/sucess', (req, res) => {
        console.log('Sucesso na criação do novo usuário')
        return res.render('register_sucess')
    })

    //Pagina de cadastro com erro
    router.get('/register/auth/error', (req, res) => {
        console.log('erro na criação do novo usuário')
        return res.render('register_error')
    })

    //Página de login de sucesso
    router.get('/login/auth/sucess', (req, res) => {
        res.render('login_sucess')
    })

    //Página de login de erro
    router.get('/login/auth/error', (req, res) => {
        res.render('login_error')
    })

    //Cadastrar o usuário no banco de dados
    router.post('/register/auth', (req, res) => {

        //Criando sistema de validação do formulário
        let errors = []

        //Verificando o nome
        if(!req.body.name || typeof req.body.name == undefined || req.body.name.length < 3){
            errors.push({
                texto: "Nome inválido"
            })
        }

        if(!validateEmail(req.body.email)){
            errors.push({
                texto: "E-mail inválido"
            })
        }

        if(!validarCPF(req.body.cpf)){
            errors.push({
                texto: "CPF inválido"
            })
        }

        if(req.body.password.length < 6 || req.body.password.length > 16){
            errors.push({
                texto: "Senha inválida"
            })
        }

        if(errors.length > 0){
            res.render('register', {errors: errors})
        } else {
            //Primeiramente é feito uma busca para ver se o usuário já existe no banco de dados
            user.findOne({email: req.body.email}).then((usuario) => {
                if(usuario){ // Se achar então ele retorna um erro
                    //mensagem dizendo que já existe o usuário
                    res.redirect('')
                } else {
                    //Variável para armazenar os dados do novo usuário
                    const newUser = new user ({
                        name: req.body.name,
                        email: req.body.email,
                        cpf: req.body.cpf,
                        password: req.body.password
                    })

                    //Criando o hash para senha
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(newUser.password, salt, (erro, hash) => {
                        if(erro){
                            console.log('erro no hash da senha'+erro)
                        }
                            newUser.password = hash

                            //Salvando o novo usuário no banco de dados

                            new user(newUser).save().then(() => {
                                res.redirect('/register/auth/sucess')
                            }).catch((error) => {
                                console.log(error)
                                res.redirct('/register/auth/error')
                            })
                        })
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        
    })

    //Rota de post do login
    router.post('/login/auth', (req, res, next) => {

        passport.authenticate('local', {
            successRedirect: '/login/auth/sucess',
            failureRedirect: '/login/auth/error'
        })(req, res, next)

    })

//Exportanto o arquivo
module.exports = router