const mongoose = require('mongoose');
const AuthScheema = mongoose.Schema({
    userName: {
        type: String,
        require: (true , "Username must be required")
    },
    password: {
        type: String,
        require: (true  , "Password must be required")
    },
    contactNo: {
        type: Number,
        require: (true , "Contact must be required")
    }

})

const AuthModel = mongoose.model('/users', AuthScheema)

module.exports = AuthModel