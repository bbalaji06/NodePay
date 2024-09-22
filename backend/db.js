const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://admin:x1CT6Kn9BCOU4JEg@cluster0.3qlyyug.mongodb.net/paytm')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        lowecase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },


})

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})



const Users = mongoose.model("user", usersSchema)
const Accounts = mongoose.model("accountinfo", accountsSchema)


module.exports = { Users, Accounts }