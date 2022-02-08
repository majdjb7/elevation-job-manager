const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Student = require("../models/Student");
const Interview = require("../models/Interview");

const generateProcesses = async (jobs) => {
  let result = [];
  for (let job of jobs) {
    let student = await Student.findOne({ _id: job.studentId });
    let studentjob = {
      companyName: job.companyName,
      role: job.role,
      location: job.location,
      description: job.description,
      status: job.status,
      whereFindJob: job.whereFindJob,
      mostRecentInterview: job.mostRecentInterview,
      interviews: job.interviews,
      studentId: job.studentId,
      studentName: student.firstName + " " + student.lastName,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      cohort: student.cohort,
      mobileNo: student.mobileNo,
    };
    result.push(studentjob);
  }
  return result;
};

router.get("/chart-latest-cohorts", async (req, res) => {
  try {
    Job.find({})
      .populate({
        path: "interviews",
      })
      .sort({ mostRecentInterview: -1 })
      .exec(async function (err, jobs) {
        let jobsProcesses = await generateProcesses(jobs);
        let cohorts = {};
        let StuentsdInCohort = {};
        let chartLatestCohorts = {};
        for (let job of jobsProcesses) {
          if (!cohorts[job.cohort]) {
            cohorts[job.cohort] = {};
          }
          if (job.status === "Accepted") {
            if (!cohorts[job.cohort][job.studentName]) {
              cohorts[job.cohort][job.studentName] = {};
            }
            cohorts[job.cohort][job.studentName] = "Accepted";
          }
          if (!StuentsdInCohort[job.cohort]) {
            StuentsdInCohort[job.cohort] = {};
          }
          if (!StuentsdInCohort[job.cohort][job.studentName]) {
            StuentsdInCohort[job.cohort][job.studentName] = {};
          }
          StuentsdInCohort[job.cohort][job.studentName] = job.cohort;
        }
        for (const key in StuentsdInCohort) {
          if (!chartLatestCohorts[key]) {
            chartLatestCohorts[key] = { working: 0, notWorking: 0 };
          }
          chartLatestCohorts[key]["working"] = Object.keys(cohorts[key]).length;
          chartLatestCohorts[key]["notWorking"] =
            Object.keys(StuentsdInCohort[key]).length -
            Object.keys(cohorts[key]).length;
        }

        res.status(200).json({ chartLatestCohorts });
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});

router.get("/inactive-students", async (req, res) => {
  try {
    Job.find({})
      .populate({
        path: "interviews",
      })
      .sort({ mostRecentInterview: -1 })
      .exec(async function (err, jobs) {
        let jobsProcesses = await generateProcesses(jobs);

        let counterActiveStudents = 0;
        let activeStudents = {};
        jobsProcesses.forEach((j) => {
          if (
            j.status === "Pending" ||
            j.status === "Open" ||
            j.status === "Accepted"
          ) {
            if (!activeStudents[j.studentId]) {
              activeStudents[j.studentId] = "i'm in progress";
              counterActiveStudents++;
            }
          }
        });
        Student.countDocuments({}, function (err, count) {
          res.send({ inactiveStudents: count - counterActiveStudents });
        });
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});
router.get("/cohorts", async (req, res) => {
  const cohorts = {};
  try {
    let students = await Student.find({});
    students.forEach((student) => {
      if (cohorts[student.cohort]) {
        cohorts[student.cohort]++;
      } else {
        cohorts[student.cohort] = 1;
      }
    });
    res.send(cohorts);
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});

router.get("/where-students-found-job", async (req, res) => {
  const whereFindJob = {
    LinkedIn: 0,
    Facebook: 0,
    "Company website": 0,
    Friend: 0,
  };
  try {
    Job.find({})
      .populate({
        path: "interviews",
      })
      .sort({ mostRecentInterview: -1 })
      .exec(async function (err, jobs) {
        let jobsProcesses = await generateProcesses(jobs);

        jobsProcesses.forEach((j) => {
          whereFindJob[j.whereFindJob]++;
        });
        res.send(whereFindJob);
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});
router.get("/tasks-progress", async (req, res) => {
  try {
    Job.find({})
      .populate({
        path: "interviews",
      })
      .sort({ mostRecentInterview: -1 })
      .exec(async function (err, jobs) {
        let jobsProcesses = await generateProcesses(jobs);

        let counterTasksProgress = 0;
        let studentsInPrrogress = {};
        jobsProcesses.forEach((j) => {
          if (j.status === "Pending" || j.status === "Open") {
            if (!studentsInPrrogress[j.studentId]) {
              studentsInPrrogress[j.studentId] = "i'm in progress";
              counterTasksProgress++;
            }
          }
        });
        res.send({ counterTasksProgress });
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});

router.get("/totlal-students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).send({ totlalStudents: students.length });
  } catch (err) {
    res.status(500).send({ error: "Something failed!" });
  }
});

router.get("/allJobs", async (req, res) => {
  try {
    Job.find({})
      .populate({
        path: "interviews",
      })
      .sort({ mostRecentInterview: -1 })
      .exec(async function (err, jobs) {
        let result = await generateProcesses(jobs);
        res.send(result);
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
  }
});
router.get("/jobs", async (req, res) => {
  try {
    await Student.find({})
      .populate({
        path: "jobs",
        populate: {
          path: "interviews",
        },
        options: { sort: { mostRecentInterview: -1 } },
      })
      .sort({ mostRecentInterview: -1 })
      .exec(function (err, studentJobs) {
        res.send(studentJobs);
      });
  } catch (error) {
    res.status(500).send({ error: "Something failed!" });
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
        res.send(studentJobs).status(200);
      });
  } catch (error) {
    res.status(400).send({ error: "Something failed!" });
  }
});
router.post("/message/send", async (req, res) => {
  const accountSid = "AC57dc8be65772dbc89448964560190aab";
  const authToken = "3cd076257cad63698d98cc307350d9c4";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Hi ${req.body.firstName},
      You have been invited to a ${req.body.type} Simulation Interview with {admin.name},
      on: ${req.body.time}.
      Here is the link for the meeting: ${req.body.zoom}
      If the time or date isn't convenient, please reply stating what times you ARE available for the simulation.
      Reply to: WhatsApp: {admin.num}
                    Email: {admin.email}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+972532282478",
    })
    .then((message) => console.log(message.sid))
    .done();
});

module.exports = router;
