const mongoose = require('mongoose')

const user = mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    cpf: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    }
})

mongoose.model("users", user)