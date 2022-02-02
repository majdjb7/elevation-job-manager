const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./User')

const adminSchema = new Schema({
}).add(userSchema)

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin

