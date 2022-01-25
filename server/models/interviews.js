const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interviewsSchema = new Schema({
    type: {
        type: String,
        enum: ['HR', 'telephone', 'technical']
    },
    time: Date,
    interviewerName: String,
    status: {
        type: String,
        enum: ['open', 'accepted', 'rejected', 'pending', 'no-reply'],
        default: 'open'
    }
})

const Interviews = mongoose.model("interviews", interviewsSchema)
module.exports = Interviews

