const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    companyName: String,
    role: String,
    location: String,
    description: String,
    status: String,
    mostRecentInterview: {
        type:Date,
        default:null
    },
    whereFindJob: {
        type: String,
        enum: ['LinkedIn', 'Facebook', 'Company website', 'Friend']
    },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }]
})

const Job = mongoose.model("Job", jobSchema)
module.exports = Job

