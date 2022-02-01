const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");
router.get("/jobs/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const jobs = Student.findOne({ _id: id })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
        options: { sort: { mostRecentInterview: -1 } }
      })
      .exec(function (err, student) {
        res.send(student.jobs);
      });
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' })
  }
});

router.post("/jobs/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if (req.body.companyName && req.body.role && req.body.location && req.body.description && req.body.whereFindJob) {
      let job = new Job({
        companyName: req.body.companyName,
        role: req.body.role,
        location: req.body.location,
        description: req.body.description,
        status: "Open",
        whereFindJob: req.body.whereFindJob,
        studentId: id
      });

      Student.findByIdAndUpdate(
        id,
        { $push: { jobs: job } },
        function (err, user) { }
      );
      await job.save();
      res.send(job);
    } else {
      res.send("all the inputs are required")
    }
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' })
  }
});
router.post("/jobs/:id/interviews", async (req, res) => {
  let id = req.params.id;
  try {
    if (req.body.type && req.body.type && req.body.interviewerName) {
      let interview = new Interview({
        type: req.body.type,
        time: req.body.time,
        interviewerName: req.body.interviewerName,
      });
      Job.findByIdAndUpdate(
        id,
        { $push: { interviews: interview }, mostRecentInterview: req.body.time },
        function (err, interview) { }
      );
      await interview.save();
      res.send(interview);
    }else{
      res.send("all the inputs are required")
    }
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' })
  }
});
router.get("/:id",async(req,res)=>{
  const id = req.params.id;
  const student=await Student.findOne({_id:id})
  res.send(student)
})
module.exports = router;
