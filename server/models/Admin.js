const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    firstName: String,
    lastName:  String,
    email:     String,
    mobileNo:  String,
    password:  String
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin

