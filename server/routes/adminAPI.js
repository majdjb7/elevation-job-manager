const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");

router.get("/allJobs", async (req, res) => {
    try {
         Job.find({})
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
                studentId:job.studentId,
                studentName:student.firstName+" "+student.lastName,
                firstName: student.firstName,
                lastName:  student.lastName,
                email:     student.email,
                cohort:    student.cohort,
                mobileNo:  student.mobileNo               
            }
            result.push(studentjob)
            }
            res.send(result)
    })}catch (error) {
      res.status(500).send({ error: 'Something failed!' })
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
      res.status(500).send({ error: 'Something failed!' })
    }
});

router.get("/students/:name/", async (req, res) => {
  firstName = req.params.name.split(" ")[0];
  lastName = req.params.name.split(" ")[1];

  try {
    await Student.find({ firstName: firstName, lastName: lastName })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
      })
      .exec(function (err, studentJobs) {
        res.send(studentJobs).status(200);
      });
  } catch (error) {
    res.send(error).status.status(500);
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
    res.status(500).send({ error: 'Something failed!' })
  }
});
router.post("/message/send", async (req, res) => {
  const accountSid = 'AC57dc8be65772dbc89448964560190aab';
  const authToken = '3cd076257cad63698d98cc307350d9c4';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: `Hi ${req.body.firstName},
      You have been invited to a ${req.body.type} Simulation Interview with {admin.name},
      on: ${req.body.time}.
      Here is the link for the meeting: ${req.body.zoom}
      If the time or date isn't convenient, please reply stating what times you ARE available for the simulation.
      Reply to: WhatsApp: {admin.num}
                    Email: {admin.email}`,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972532282478'
    })
    .then(message => console.log(message.sid))
    .done();

})

module.exports = router;
