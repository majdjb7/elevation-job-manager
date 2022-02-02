const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./User')

const studentSchema = new Schema({
    cohort:    String,
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
}).add(userSchema)

const Student = mongoose.model("Student", studentSchema)
module.exports = Student

