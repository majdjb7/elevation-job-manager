const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interviewSchema = new Schema({
    type: {
        type: String,
        enum: ['HR', 'Telephone', 'Technical', 'Home Assignment', 'Home Test']
    },
    time: Date,
    interviewerName: String,
    status: {
        type: String,
        enum: ['Open', 'Accepted', 'Rejected', 'Pending', 'NoReply'],
        default: 'open'
    }
})

const Interview = mongoose.model("Interview", interviewSchema)
module.exports = Interview

