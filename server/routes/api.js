const express = require("express");
const router = express.Router();
const Jobs = require('../models/jobs')
const Students = require('../models/students')
const Interviews = require('../models/interviews')
router.get("/students/:id/jobs", async (req, res) => {
  let id = req.params.id
  try {
    const jobs = Students.findOne({ _id: id })
      .populate('jobs')
      .exec(function (err, student) {
        res.send(student.jobs)
      })
  } catch (error) {
    res.send(error);
  }
});
router.post("/students/:id/jobs", async (req, res) => {
  let id = req.params.id
  try {
    let job = new Jobs({
      companyName: req.body.companyName,
      role: req.body.role,
      location: req.body.location,
      description: req.body.description,
      status: "open",
      whereFindJob: req.body.whereFindJob,
    })

    Students.findByIdAndUpdate((id), { $push: { jobs: job } }, function (err, user) {
    })
    await job.save()
    res.send(job)
  } catch (error) {
    res.send(error);
  }
});
router.get("/jobs/:id/interviews", async (req, res) => {
  let id = req.params.id
  try {
    const interviews = Jobs.findOne({ _id: id })
      .populate('interviews')
      .exec(function (err, job) {
        res.send(job.interviews)
      })
  } catch (error) {
    res.send(error);
  }
});



router.post("/jobs/:id/interviews", async (req, res) => {
  let id = req.params.id
  console.log(id);
  try {
    let interview = new Interviews({
      type: req.body.type,
      time: req.body.time,
      interviewerName: req.body.interviewerName,
      status: req.body.status
    })

    Jobs.findByIdAndUpdate((id), { $push: { interviews: interview } }, function (err, interview) {
    })
    await interview.save()
    res.send(interview)
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;
