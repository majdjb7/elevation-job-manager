const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");

router.get("/allJobs", async (req, res) => {
    try {
        await Job.find({})
        .populate({
            path: 'interviews',
        }).sort({ mostRecentInterview: -1 })
        .exec(async function (err, jobs) {
            let result=[]
            for(let job of jobs){
            let student= await Student.findOne({ _id: job.studentId})
            let studentjob={
                companyName: job.companyName,
                role: job.role,
                location: job.location,
                description: job.description,
                status: job.status,
                whereFindJob: job.whereFindJob, 
                mostRecentInterview:job.mostRecentInterview, 
                interviews:job.interviews,
                studentName:student.firstName+" "+student.lastName,
                firstName: student.firstName,
                lastName:  student.lastName,
                email:     student.email,
                cohort:    student.cohort,
                mobileNo:  student.mobileNo               
            }
            result.push(studentjob)
            }
            console.log(result);
            res.send(result)
    })}catch (error) {
       res.send(error);
    }
   
});
router.get("/jobs", async (req, res) => {
 try {
        await Student.find({})
        .populate({
            path: 'jobs',
                populate: {
                    path: 'interviews'
                } ,
                options: { sort: { mostRecentInterview: -1 }}
        }).sort({ mostRecentInterview: -1 })
        .exec(function (err, studentJobs) {
            res.send(studentJobs)
    })}catch (error) {
       res.send(error);
    }
});
router.get("/cohorts/:cohortName", async (req, res) => {
  try {
    await Student.find({ cohort: req.params.cohortName })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
      })
      .exec(function (err, studentJobs) {
        res.send(studentJobs);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
