const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Admin = require("../models/Admin");
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
        if (!student) {
          res.status(500).send({ error: "Something failed!" });
        } else {
          res.send(student.jobs);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});

router.post("/jobs/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if (
      req.body.companyName &&
      req.body.role &&
      req.body.location &&
      req.body.description &&
      req.body.whereFindJob
    ) {
      let job = new Job({
        companyName: req.body.companyName,
        role: req.body.role,
        location: req.body.location,
        description: req.body.description,
        status: "Open",
        whereFindJob: req.body.whereFindJob,
        studentId: id,
      });

      Student.findByIdAndUpdate(
        id,
        { $push: { jobs: job } },
        function (err, user) {}
      );
      await job.save();
      res.send(job);
    } else {
      res.send("all the inputs are required");
    }
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
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
        {
          $push: { interviews: interview },
          mostRecentInterview: req.body.time,
        },
        function (err, interview) {}
      );
      await interview.save();
      res.send(interview);
    } else {
      res.send("all the inputs are required");
    }
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});
router.post("/jobs/status/:jobId/interviews", async (req, res) => {
  const id = req.params.jobId;
  if (req.body.status == "Accepted") {
    const job = await Job.findOne({ _id: id });
    const student = await Student.findOne({ _id: job.studentId });
    let mail =
      student.firstName +
      " " +
      student.lastName +
      " start working at " +
      job.companyName;
    let mails = "";
    const admins = await Admin.find({});
    for (let admin of admins) {
      mails = mails + " " + admin.email;
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "elevation744",
        pass: "Atedna4!@#",
      },
    });
    let mailOptions = {
      from: "elevation744@gmail.com",
      to: mails,
      subject: "hi",
      text: mail,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  try {
    Job.findByIdAndUpdate(
      id,
      { status: req.body.status },
      function (err, user) {}
    );
    res.send().status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});
router.delete("/jobs/:id", async (req, res) => {
  let id = req.params.id;
  Job.findOneAndDelete({ _id: id }, function (err, docs) {
    if (err) {
      res.status(500).send({ error: "Something failed!" });
    } else {
      res.send("ok");
    }
  });
});
router.post("/edit/jobs/:id", async (req, res) => {
  const id = req.params.id;
  let companyName = req.body.companyName;
  let location = req.body.location;
  let whereFindJob = req.body.whereFindJob;
  let role = req.body.role;
  let description = req.body.description;
  let type = req.body.type;
  let interviewId = req.body.interviewId;
  let time = req.body.time;
  let job;
  try {
    job = await Job.findOne({ _id: id });
  } catch (error) {
    res.send(error).status(500);
  }
  if (req.body.companyName == "") {
    companyName = job.companyName;
  }
  if (req.body.location == "") {
    location = job.location;
  }
  if (req.body.whereFindJob == "") {
    whereFindJob = job.whereFindJob;
  }
  if (req.body.role == "") {
    role = job.role;
  }
  if (req.body.description == "") {
    description = job.description;
  }
  try {
    Job.findByIdAndUpdate(
      id,
      { companyName, location, whereFindJob, role, description },
      function (err, user) {}
    );
    res.send().status(200);
  } catch (error) {
    res.send(error).status(500);
  }
  if (type != "" && interviewId != "") {
    try {
      Interview.findByIdAndUpdate(
        interviewId,
        { type },
        function (err, user) {}
      );
      res.send().status(200);
    } catch (error) {
      res.send(error).status(500);
    }
  }
  if (time != "" && interviewId != "") {
    try {
      Interview.findByIdAndUpdate(
        interviewId,
        { time },
        function (err, user) {}
      );
      res.send().status(200);
    } catch (error) {
      res.send(error).status(500);
    }
  }
});
router.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({ _id: id });
  res.send(student);
});

module.exports = router;
