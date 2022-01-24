const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentsSchema = new Schema({
    firstName: String,
    lastName:  String,
    email:     String,
    cohort:    String,
    mobileNo:  String,
    password:  String,
    jobs: [{ type: Schema.Types.ObjectId, ref: 'jobs' }]
})

const Students = mongoose.model("students", studentsSchema)
module.exports = Students

