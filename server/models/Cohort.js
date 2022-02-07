const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cohortSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
})

const Cohort = mongoose.model("Cohort", cohortSchema)
module.exports = Cohort

