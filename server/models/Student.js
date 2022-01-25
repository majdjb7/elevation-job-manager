const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName: String,
    lastName:  String,
    email:     String,
    cohort:    String,
    mobileNo:  String,
    password:  String,
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
})

const Student = mongoose.model("Student", studentSchema)
module.exports = Student

