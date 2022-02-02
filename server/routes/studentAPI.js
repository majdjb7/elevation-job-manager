const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Admin = require("../models/Admin")
router.get("/jobs/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const jobs = Student.findOne({ _id: id })
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
        options: { sort: { mostRecentInterview: -1 } },
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
    } else {
      res.send("all the inputs are required")
    }
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' })
  }
});
router.post("/jobs/status/:jobId/interviews", async (req, res) => {
  const id = req.params.jobId;
  if (req.body.status == "Accepted") {
    const job = await Job.findOne({ _id: id })
    const student = await Student.findOne({ _id: job.studentId })
    let mail = student.firstName + " " + student.lastName + " passd interview in " + job.companyName
    let mails = ""
    const admins = await Admin.find({})
    for (let admin of admins) {
      mails = mails + " " + admin.email
    }
    console.log(mails);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'elevation744',
        pass: 'Atedna4!@#'
      }
    });
    let mailOptions = {
      from: 'elevation744@gmail.com',
      to: mails,
      subject: 'hi',
      text: mail
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  }
  try {
    Job.findByIdAndUpdate(
      id,
      { status: req.body.status },
      function (err, user) { }
    );
    res.send().status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});
router.post("/message/send", async (req, res) => {
  const accountSid = 'AC57dc8be65772dbc89448964560190aab';
  const authToken = '3cd076257cad63698d98cc307350d9c4';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'from elevation',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972502702170'
    })
    .then(message => console.log(message.sid))
    .done();

})
router.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({ _id: id })
  res.send(student)
})

module.exports = router;
