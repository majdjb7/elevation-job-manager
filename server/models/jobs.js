const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobsSchema = new Schema({
    CompanyName: String,
    role: String,
    location: String,
    description: String,
    status: String,
    whereFindJob: {
        type: String,
        enum: ['LinkedIn', 'Facebook', 'Company website', 'Friend']
    },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'interviews' }]
})

const Jobs = mongoose.model("jobs", jobsSchema)
module.exports = Jobs

