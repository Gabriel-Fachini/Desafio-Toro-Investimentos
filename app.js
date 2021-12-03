const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static('style'))
app.use(express.static('images'))
//app.use('/register.css', express.static(__dirname + 'style/register'))

app.use(cors())
app.set('views', "./views")
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    return res.json([{ name: 'gabriel'}, {name :'diego'}
    ])
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.listen(3456)

